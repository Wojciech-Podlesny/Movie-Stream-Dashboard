import { cert, getApps, initializeApp, App, ServiceAccount } from "firebase-admin/app";

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

export function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeApp({
    credential: cert(serviceAccount),
  });
}
