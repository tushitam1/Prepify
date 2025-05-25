import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

export const initFirebaseAdmin = () => {
  const apps = getApps();

  if (!apps.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // <-- critical fix
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
};

// Export initialized services for usage across your app
const { auth, db } = initFirebaseAdmin();
export { auth, db };
