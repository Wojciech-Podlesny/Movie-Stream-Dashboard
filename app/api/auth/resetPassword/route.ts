import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== "string" || !validateEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return NextResponse.json({ message: "Password reset email sent if user exists" }); 
  } catch (error) {
    if (error instanceof FirebaseError) {
      return NextResponse.json({ message: "Password reset email sent if user exists" });
    } else {
      return NextResponse.json(
        { error: "Unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}


