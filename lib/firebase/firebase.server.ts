import { cert } from "firebase-admin/app";
import {
  getApps,
  initializeApp as initializeAdminApp,
  App,
} from "firebase-admin/app";

export function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  return initializeAdminApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
}
