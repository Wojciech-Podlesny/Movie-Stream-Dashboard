import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return NextResponse.json({ id: user.uid, email: user.email });
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "Unexpected error occurred"},
        { status: 500 }
      );
    }
  }
}
