
import { getAdminApp } from "@/lib/firebase/firebase.server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore,Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { email, password, username } = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
  }


  try {
    const auth = getAuth(getAdminApp());
    const db = getFirestore(getAdminApp());


    const userRecord = await auth.createUser({
      email,
      password,
      displayName: username,
      emailVerified: false, 
    })

    await db.doc(`users/${userRecord.uid}`).set({
      uid: userRecord.uid,
      email: userRecord.email,
      username,
      createdAt: Timestamp.now(),
      emailVerified: true, // Ustawienie emailVerified na false
    });

    return NextResponse.json({ id: userRecord.uid, email: userRecord.email });
    
  } catch (error) {
    console.log("Registration error:", error);

    return NextResponse.json({ error: error instanceof Error ? error.message : "An error occured during registration" }, { status: 400 });
  }
}