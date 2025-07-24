import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

type LoginFormData = {
  email: string;
  password: string;
};

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const RATE_LIMIT = {
  windowMs: 5 * 60 * 1000,
  maxAttempts: 5,
};

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const attempt = loginAttempts.get(ip) || {
      count: 0,
      lastAttempt: Date.now(),
    };

    if (Date.now() - attempt.lastAttempt > RATE_LIMIT.windowMs) {
      attempt.count = 0;
    }

    attempt.count += 1;
    attempt.lastAttempt = Date.now();
    loginAttempts.set(ip, attempt);

    if (attempt.count > RATE_LIMIT.maxAttempts) {
      return NextResponse.json(
        {
          error: "Too many login attempts. Please try again in a few minutes.",
        },
        { status: 429 }
      );
    }

    const { email, password }: LoginFormData = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required!" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const idToken = await user.getIdToken();

    return NextResponse.json({
      id: user.uid,
      email: user.email,
      idToken,
      name: user.displayName,
      emailVerified: user.emailVerified,
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      let message = "Unexpected authentication error.";
      let status = 400;

      switch (error.code) {
        case "auth/user-not-found":
          message = "User not found. Please register.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          message = "Invalid email address.";
          break;
        case "auth/user-disabled":
          message = "User account is disabled.";
          break;
        case "auth/too-many-requests":
          message = "Too many requests. Please try again later.";
          status = 429;
          break;
        default:
          message = error.message;
          status = 500;
      }

      console.error(`[AUTH ERROR] (${error.code}): ${error.message}`);
      return NextResponse.json({ error: message }, { status });
    }

    console.error("[SERVER ERROR]", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
