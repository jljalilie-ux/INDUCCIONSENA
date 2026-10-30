import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

const firestoreDatabaseId = (firebaseConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId || 'ai-studio-senainduccindigi-d174bfb9-77c4-4051-8915-ed62b6971639';
export const db = getFirestore(app, firestoreDatabaseId);
export const auth = getAuth(app);

// Connectivity health check per Firebase skill specifications
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline or connectivity issue, using offline persistence cache.');
      return false;
    }
    // Expected if document doesn't exist, but connection handshake succeeded
    return true;
  }
}
