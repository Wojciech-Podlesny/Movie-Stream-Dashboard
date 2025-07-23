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
          error: "Zbyt wiele prób logowania. Spróbuj ponownie za kilka minut.",
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
        { error: "Nieprawidłowy adres email." },
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

// import { NextResponse } from "next/server";
// import { auth } from "@/lib/firebase/firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { FirebaseError } from "firebase/app";
// import { cookies } from "next/headers";

// // Prosty limiter prób logowania (RAM – nieprodukcyjny)
// const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
// const RATE_LIMIT = {
//   windowMs: 5 * 60 * 1000, // 5 minut
//   maxAttempts: 5,
// };

// type LoginFormData = {
//   email: string;
//   password: string;
// };

// const isValidEmail = (email: string): boolean =>
//   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// export async function POST(req: Request) {
//   try {
//     const ip = req.headers.get("x-forwarded-for") || "unknown";
//     const attempt = loginAttempts.get(ip) || { count: 0, lastAttempt: Date.now() };

//     if (Date.now() - attempt.lastAttempt > RATE_LIMIT.windowMs) {
//       attempt.count = 0;
//     }

//     attempt.count += 1;
//     attempt.lastAttempt = Date.now();
//     loginAttempts.set(ip, attempt);

//     if (attempt.count > RATE_LIMIT.maxAttempts) {
//       return NextResponse.json(
//         { error: "Zbyt wiele prób logowania. Spróbuj ponownie za kilka minut." },
//         { status: 429 }
//       );
//     }

//     const body = await req.json();
//     const { email, password } = body as Partial<LoginFormData>;

//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email i hasło są wymagane!" },
//         { status: 400 }
//       );
//     }

//     if (!isValidEmail(email)) {
//       return NextResponse.json(
//         { error: "Nieprawidłowy adres email." },
//         { status: 400 }
//       );
//     }

//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     const idToken = await user.getIdToken();

//     // Ustawienie ciasteczka HttpOnly z tokenem
//     cookies().set("token", idToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 60 * 60, // 1 godzina
//       path: "/",
//     });

//     return NextResponse.json({
//       id: user.uid,
//       email: user.email,
//       name: user.displayName,
//       emailVerified: user.emailVerified,
//     });
//   } catch (error) {
//     if (error instanceof FirebaseError) {
//       let message = "Wystąpił nieoczekiwany błąd logowania.";
//       let status = 400;

//       switch (error.code) {
//         case "auth/user-not-found":
//           message = "Użytkownik nie istnieje. Zarejestruj się.";
//           break;
//         case "auth/wrong-password":
//           message = "Nieprawidłowe hasło. Spróbuj ponownie.";
//           break;
//         case "auth/invalid-email":
//           message = "Nieprawidłowy adres email.";
//           break;
//         case "auth/user-disabled":
//           message = "Konto użytkownika jest zablokowane.";
//           break;
//         case "auth/too-many-requests":
//           message = "Zbyt wiele prób. Spróbuj później.";
//           break;
//         default:
//           message = error.message;
//           status = 500;
//       }

//       console.error(`[BŁĄD LOGOWANIA] (${error.code}): ${error.message}`);
//       return NextResponse.json({ error: message }, { status });
//     }

//     console.error("[BŁĄD SERWERA]", error);
//     return NextResponse.json(
//       { error: "Wystąpił nieoczekiwany błąd." },
//       { status: 500 }
//     );
//   }
// }
