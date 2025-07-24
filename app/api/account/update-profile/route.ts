import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "@/lib/firebase/firebase.server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No authentication token." }, { status: 401 });
  }

  const token = authHeader.split("Bearer ")[1];
  const adminAuth = getAuth(getAdminApp());

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const { displayName } = await req.json();

    if (!displayName) {
      return NextResponse.json({ error: "No new username" }, { status: 400 });
    }

    await adminAuth.updateUser(uid, { displayName });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = "Error during profile update.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}


