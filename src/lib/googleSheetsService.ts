import { auth } from './firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut
} from 'firebase/auth';
import { Apprentice } from '../types/induction';

export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file'
];

export interface ConnectedSheetConfig {
  spreadsheetId: string;
  spreadsheetUrl: string;
  title: string;
  ficha: string;
  lastSyncedAt: string;
  syncedCount: number;
}

const STORAGE_KEY = 'sena_connected_sheets_v1';

// In-memory token cache per workspace integration guidelines
let cachedAccessToken: string | null = null;
let isSigningIn = false;

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/spreadsheets');
provider.addScope('https://www.googleapis.com/auth/drive.file');
// Prompt user to select account and ensure consent for offline/refresh if needed
provider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Escucha cambios en el estado de autenticación y limpia el token en memoria al cerrar sesión
 */
export const initGoogleAuth = (
  onSuccess?: (user: User, token: string) => void,
  onFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onSuccess) onSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        if (onFailure) onFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onFailure) onFailure();
    }
  });
};

/**
 * Inicia sesión con Google solicitando los scopes de Spreadsheets y Drive
 */
export const signInWithGoogle = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google. Inténtalo de nuevo.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Obtiene el token de acceso actual en memoria
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Cierra la sesión activa de Google y elimina el token en memoria
 */
export const logoutGoogle = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Obtiene la configuración de la hoja conectada desde localStorage
 */
export function getSavedSheetConfig(): ConnectedSheetConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error al leer configuración de Google Sheets:', e);
  }
  return null;
}

/**
 * Guarda la configuración de la hoja conectada
 */
export function saveSheetConfig(config: ConnectedSheetConfig | null): void {
  if (config) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Convierte un objeto Apprentice en una fila formateada para Google Sheets
 */
export function apprenticeToRow(a: Apprentice): (string | number)[] {
  const now = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'short',
    timeStyle: 'medium'
  });

  return [
    a.id,
    a.documentType,
    a.documentNumber,
    a.fullName,
    a.ficha,
    a.email || 'No registrado',
    a.phone || 'No registrado',
    a.program || 'ADSO',
    a.regional || 'Distrito Capital',
    a.centroFormacion || 'Centro de Formación SENA',
    a.inductionProgress ?? (a.status === 'aprobado' ? 100 : a.status === 'en_progreso' ? 50 : 0),
    a.score !== undefined ? `${a.score}%` : 'Pendiente',
    a.attemptsCount || 0,
    a.status === 'aprobado' ? 'Aprobado' : a.status === 'en_progreso' ? 'En Progreso' : 'No Iniciado',
    a.createdAt ? new Date(a.createdAt).toLocaleString('es-CO') : 'N/A',
    a.completedAt ? a.completedAt : 'Pendiente',
    a.consentLaw1581 ? 'Aceptado (Ley 1581)' : 'Pendiente',
    now
  ];
}

export const SHEET_TAB_NAME = 'Registro_Induccion_SENA';

export const SHEET_HEADERS = [
  'ID Registro',
  'Tipo Doc',
  'No. Documento',
  'Nombre Completo Aprendiz',
  'Ficha Caracterización',
  'Correo Institucional / Personal',
  'Teléfono Contacto',
  'Programa de Formación',
  'Regional SENA',
  'Centro de Formación',
  'Progreso Inducción (%)',
  'Puntaje Evaluación (%)',
  'Intentos Presentados',
  'Estado Inducción',
  'Fecha de Registro',
  'Fecha Culminación',
  'Consentimiento Ley 1581 / 2012',
  'Última Sincronización'
];

/**
 * Crea una nueva hoja de cálculo en el Google Drive del instructor con diseño institucional SENA
 */
export async function createInductionSpreadsheet(
  ficha: string,
  initialCohort: Apprentice[]
): Promise<ConnectedSheetConfig> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Se requiere autenticación activa con Google para crear la hoja en Google Drive.');
  }

  const title = `SENA - Inducción de Aprendices - Ficha ${ficha || '2874912'}`;

  // 1. Crear el libro en Google Sheets con la pestaña configurada
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title
      },
      sheets: [
        {
          properties: {
            title: SHEET_TAB_NAME,
            gridProperties: {
              frozenRowCount: 1,
              columnCount: 20
            }
          }
        }
      ]
    })
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(`Error de Google Sheets API (${createRes.status}): ${errorData.error?.message || createRes.statusText}`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const spreadsheetUrl = createdData.spreadsheetUrl;
  const sheetId = createdData.sheets?.[0]?.properties?.sheetId || 0;

  // 2. Aplicar formato institucional SENA (Verde #39A900, texto blanco negrita, bordes y filtros)
  try {
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requests: [
          // Estilo de encabezado verde institucional SENA
          {
            repeatCell: {
              range: {
                sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: SHEET_HEADERS.length
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 57 / 255,
                    green: 169 / 255,
                    blue: 0 / 255
                  },
                  textFormat: {
                    foregroundColor: { red: 1, green: 1, blue: 1 },
                    bold: true,
                    fontSize: 11
                  },
                  horizontalAlignment: 'CENTER',
                  verticalAlignment: 'MIDDLE'
                }
              },
              fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)'
            }
          },
          // Filtro automático en las columnas
          {
            setBasicFilter: {
              filter: {
                range: {
                  sheetId,
                  startRowIndex: 0,
                  endRowIndex: initialCohort.length + 1,
                  startColumnIndex: 0,
                  endColumnIndex: SHEET_HEADERS.length
                }
              }
            }
          }
        ]
      })
    });
  } catch (formatErr) {
    console.warn('Aviso: Formato visual aplicado parcialmente:', formatErr);
  }

  // 3. Escribir encabezados y aprendices iniciales
  const allRows = [
    SHEET_HEADERS,
    ...initialCohort.map(a => apprenticeToRow(a))
  ];

  const updateRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_TAB_NAME}!A1:R${allRows.length}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: allRows
      })
    }
  );

  if (!updateRes.ok) {
    const errorData = await updateRes.json().catch(() => ({}));
    throw new Error(`Error al poblar datos iniciales (${updateRes.status}): ${errorData.error?.message || updateRes.statusText}`);
  }

  const nowIso = new Date().toISOString();
  const config: ConnectedSheetConfig = {
    spreadsheetId,
    spreadsheetUrl,
    title,
    ficha: ficha || '2874912',
    lastSyncedAt: nowIso,
    syncedCount: initialCohort.length
  };

  saveSheetConfig(config);
  return config;
}

/**
 * Sincroniza o actualiza un único aprendiz en la hoja de cálculo
 */
export async function syncApprenticeToSheet(
  spreadsheetId: string,
  apprentice: Apprentice
): Promise<boolean> {
  const token = await getAccessToken();
  if (!token) {
    console.warn('Google token no disponible para sincronización inmediata con Sheets.');
    return false;
  }

  try {
    // 1. Consultar columnas de identificación (A:C) para verificar si ya existe la fila
    const checkRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_TAB_NAME}!A:C`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (!checkRes.ok) {
      console.warn('No se pudo verificar fila en Google Sheets:', checkRes.statusText);
      return false;
    }

    const checkData = await checkRes.json();
    const rows = checkData.values || [];

    let targetRowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      const rowId = rows[i]?.[0];
      const docNum = rows[i]?.[2];
      if (
        (rowId && rowId === apprentice.id) ||
        (docNum && String(docNum).trim() === apprentice.documentNumber.trim())
      ) {
        targetRowIndex = i + 1; // Índices 1-based en Google Sheets
        break;
      }
    }

    const rowData = apprenticeToRow(apprentice);

    if (targetRowIndex > 0) {
      // 2a. Actualizar fila existente
      const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_TAB_NAME}!A${targetRowIndex}:R${targetRowIndex}?valueInputOption=USER_ENTERED`;
      const updateRes = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [rowData]
        })
      });

      if (!updateRes.ok) {
        console.error('Error al actualizar fila en Google Sheets:', await updateRes.text());
        return false;
      }
    } else {
      // 2b. Anexar nueva fila al final
      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_TAB_NAME}!A:R:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
      const appendRes = await fetch(appendUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [rowData]
        })
      });

      if (!appendRes.ok) {
        console.error('Error al anexar fila en Google Sheets:', await appendRes.text());
        return false;
      }
    }

    // Actualizar marca de sincronización local
    const currentConfig = getSavedSheetConfig();
    if (currentConfig && currentConfig.spreadsheetId === spreadsheetId) {
      saveSheetConfig({
        ...currentConfig,
        lastSyncedAt: new Date().toISOString()
      });
    }

    return true;
  } catch (err) {
    console.error('Error en syncApprenticeToSheet:', err);
    return false;
  }
}

/**
 * Sincroniza todos los aprendices del cohorte actual hacia la hoja de cálculo
 */
export async function syncAllCohortToSheet(
  spreadsheetId: string,
  cohort: Apprentice[]
): Promise<{ success: boolean; count: number; error?: string }> {
  const token = await getAccessToken();
  if (!token) {
    return {
      success: false,
      count: 0,
      error: 'Inicia sesión con Google para sincronizar con Google Sheets.'
    };
  }

  try {
    // 1. Asegurar encabezados
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_TAB_NAME}!A1:R1?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [SHEET_HEADERS]
        })
      }
    );

    // 2. Escribir filas de la cohorte
    const rows = cohort.map(a => apprenticeToRow(a));
    const updateRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_TAB_NAME}!A2:R${rows.length + 1}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: rows
        })
      }
    );

    if (!updateRes.ok) {
      const errJson = await updateRes.json().catch(() => ({}));
      return {
        success: false,
        count: 0,
        error: errJson.error?.message || updateRes.statusText
      };
    }

    // Actualizar configuración
    const currentConfig = getSavedSheetConfig();
    if (currentConfig && currentConfig.spreadsheetId === spreadsheetId) {
      saveSheetConfig({
        ...currentConfig,
        lastSyncedAt: new Date().toISOString(),
        syncedCount: cohort.length
      });
    }

    return {
      success: true,
      count: cohort.length
    };
  } catch (err) {
    return {
      success: false,
      count: 0,
      error: err instanceof Error ? err.message : 'Error inesperado al sincronizar con Google Sheets'
    };
  }
}
