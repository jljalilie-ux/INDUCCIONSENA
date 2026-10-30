import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { Apprentice } from '../types/induction';
import { INITIAL_COHORT } from '../data/senaInductionData';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface ApprenticeRegistrationPayload {
  fullName: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  ficha: string;
  email?: string;
  phone?: string;
  program?: string;
  regional?: string;
  centroFormacion?: string;
  consentLaw1581: boolean;
  consentTimestamp: string;
}

const APPRENTICES_COLLECTION = 'apprentices';

/**
 * Normaliza y genera el ID canónico para un aprendiz en la base de datos
 */
export function getApprenticeDocId(docType: string, docNumber: string): string {
  const cleanNum = docNumber.trim().replace(/[^a-zA-Z0-9]/g, '');
  return `app-${docType.toLowerCase()}-${cleanNum}`;
}

/**
 * Valida si ya existe un registro con el mismo documento para prevenir duplicados
 */
export async function checkApprenticeDuplicate(
  documentType: string,
  documentNumber: string
): Promise<{ exists: boolean; existingApprentice?: Apprentice }> {
  const cleanNumber = documentNumber.trim();
  const path = APPRENTICES_COLLECTION;

  try {
    const q = query(
      collection(db, path),
      where('documentNumber', '==', cleanNumber),
      where('documentType', '==', documentType)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data() as Apprentice;
      return { exists: true, existingApprentice: { ...docData, id: querySnapshot.docs[0].id } };
    }

    return { exists: false };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Registra un nuevo aprendiz en Firestore con consentimiento explícito Ley 1581
 */
export async function registerApprenticeInDatabase(
  payload: ApprenticeRegistrationPayload
): Promise<Apprentice> {
  const docId = getApprenticeDocId(payload.documentType, payload.documentNumber);
  const path = `${APPRENTICES_COLLECTION}/${docId}`;

  // Verificar duplicados antes de insertar
  const duplicateCheck = await checkApprenticeDuplicate(payload.documentType, payload.documentNumber);
  if (duplicateCheck.exists) {
    throw new Error(
      `El aprendiz con documento ${payload.documentType} ${payload.documentNumber} ya se encuentra registrado en el sistema. Puedes acceder seleccionándolo directamente en tu sesión.`
    );
  }

  const now = new Date();
  const nowIso = now.toISOString();

  const newRecord: Apprentice = {
    id: docId,
    fullName: payload.fullName.trim(),
    documentType: payload.documentType,
    documentNumber: payload.documentNumber.trim(),
    ficha: payload.ficha.trim(),
    email: payload.email?.trim() || `${payload.documentNumber}@soy.sena.edu.co`,
    phone: payload.phone?.trim() || 'No registrado',
    program: payload.program || 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    regional: payload.regional || 'Regional Distrito Capital',
    centroFormacion: payload.centroFormacion || 'Centro de Tecnologías para la Construcción y la Madera',
    status: 'no_iniciado',
    attemptsCount: 0,
    inductionProgress: 0,
    createdAt: nowIso,
    updatedAt: nowIso,
    consentLaw1581: true,
    consentTimestamp: payload.consentTimestamp || nowIso
  };

  try {
    await setDoc(doc(db, APPRENTICES_COLLECTION, docId), newRecord);
    return newRecord;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Actualiza el progreso o resultado de evaluación del aprendiz en Firestore
 */
export async function updateApprenticeProgressInDatabase(
  apprenticeId: string,
  updates: Partial<Apprentice>
): Promise<void> {
  const path = `${APPRENTICES_COLLECTION}/${apprenticeId}`;
  try {
    const docRef = doc(db, APPRENTICES_COLLECTION, apprenticeId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Elimina un registro de aprendiz (acceso protegido para instructores)
 */
export async function deleteApprenticeFromDatabase(apprenticeId: string): Promise<void> {
  const path = `${APPRENTICES_COLLECTION}/${apprenticeId}`;
  try {
    await deleteDoc(doc(db, APPRENTICES_COLLECTION, apprenticeId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Suscripción en tiempo real a la colección de aprendices en Firestore
 */
export function subscribeToApprentices(
  onUpdate: (apprentices: Apprentice[]) => void,
  onError?: (error: Error) => void
): () => void {
  const path = APPRENTICES_COLLECTION;
  const colRef = collection(db, path);

  const unsubscribe = onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        // Sembrar cohorte inicial si la base de datos está vacía
        seedInitialCohortIfEmpty().catch(console.error);
        onUpdate(INITIAL_COHORT);
        return;
      }

      const list: Apprentice[] = snapshot.docs.map((d) => {
        const data = d.data() as Apprentice;
        return {
          ...data,
          id: d.id
        };
      });

      // Ordenar por nombre
      list.sort((a, b) => a.fullName.localeCompare(b.fullName));
      onUpdate(list);
    },
    (error) => {
      console.warn('Subscription error to Firestore:', error);
      if (onError) {
        onError(error);
      }
    }
  );

  return unsubscribe;
}

/**
 * Si la colección está vacía en el primer arranque, siembra los aprendices demo con consentimiento legal
 */
async function seedInitialCohortIfEmpty(): Promise<void> {
  try {
    const existing = await getDocs(collection(db, APPRENTICES_COLLECTION));
    if (!existing.empty) return;

    const nowIso = new Date().toISOString();
    for (const app of INITIAL_COHORT) {
      const docId = getApprenticeDocId(app.documentType, app.documentNumber);
      await setDoc(doc(db, APPRENTICES_COLLECTION, docId), {
        ...app,
        id: docId,
        consentLaw1581: true,
        consentTimestamp: nowIso,
        createdAt: nowIso,
        updatedAt: nowIso,
        inductionProgress: app.status === 'aprobado' ? 100 : app.status === 'en_progreso' ? 50 : 0
      });
    }
  } catch (err) {
    console.error('Error al sembrar cohorte inicial en Firestore:', err);
  }
}
