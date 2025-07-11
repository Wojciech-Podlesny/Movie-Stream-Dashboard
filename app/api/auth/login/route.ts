import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required!" },
        { status: 400 }
      );
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const idToken = await user.getIdToken()   //dodanie id token//pobranie

    return NextResponse.json({ 
      id: user.uid, 
      email: user.email,
      idToken, //dodanie idToken
      name: user.displayName, //dodanie name
      emailVerified: user.emailVerified //dodanie emailVerified
    }); 
  } catch (error) {
    if (error instanceof FirebaseError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "Unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}


