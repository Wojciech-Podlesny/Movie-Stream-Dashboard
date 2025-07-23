import { getAdminApp } from "@/lib/firebase/firebase.server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

type RegisterFormData = {
  email?: string;
  password?: string;
  username?: string;
};

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(req: Request) {
  try {
    const body: RegisterFormData = await req.json();
    const { email, password, username } = body;

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "All fields (email, password, username) are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const auth = getAuth(getAdminApp());
    const db = getFirestore(getAdminApp());

    const userRecord = await auth.createUser({
      email,
      password,
      displayName: username,
      emailVerified: true,
    });

    await db.doc(`users/${userRecord.uid}`).set({
      uid: userRecord.uid,
      email: userRecord.email,
      username,
      createdAt: Timestamp.now(),
      emailVerified: true,
    });

    return NextResponse.json(
      {
        id: userRecord.uid,
        email: userRecord.email,
        username,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);

    if (error.code === "auth/email-already-exists") {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 409 } 
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred during registration.",
      },
      { status: 500 }
    );
  }
}



// import { getAdminApp } from "@/lib/firebase/firebase.server";
// import { getAuth } from "firebase-admin/auth";
// import { getFirestore,Timestamp } from "firebase-admin/firestore";
// import { NextResponse } from "next/server";


// export async function POST(req: Request) {
//   const { email, password, username } = await req.json();

//   if (!email || !password || !username) {
//     //logowanie bledow do konsoli po stronie serwera
//     return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
//   }


//   try {
//     const auth = getAuth(getAdminApp());
//     const db = getFirestore(getAdminApp());


//     const userRecord = await auth.createUser({
//       email,
//       password,
//       displayName: username,
//       emailVerified: true, 
//     })

//     await db.doc(`users/${userRecord.uid}`).set({
//       uid: userRecord.uid,
//       email: userRecord.email,
//       username,
//       createdAt: Timestamp.now(),
//       emailVerified: true, 
//     });

//     return NextResponse.json({ id: userRecord.uid, email: userRecord.email });
    
//   } catch (error) {
//     console.log("Registration error:", error);

//     return NextResponse.json({ error: error instanceof Error ? error.message : "An error occured during registration" }, { status: 400 });
//   }
// } 
