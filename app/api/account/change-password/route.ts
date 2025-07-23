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

    const { newPassword } = await req.json();

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: "The password must be at least 6 characters long" }, { status: 400 });
    }

    await adminAuth.updateUser(uid, { password: newPassword });

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
