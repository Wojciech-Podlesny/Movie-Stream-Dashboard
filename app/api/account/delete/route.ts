import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "@/lib/firebase/firebase.server";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");

  if(!authHeader || authHeader.startsWith("Bearer ")) {
    return NextResponse.json({error: "No authentication token."}, {status: 401});
  }

  const token = authHeader.split("Bearer")[1]
  const adminAuth = getAuth(getAdminApp())

  try {
    const decoded = await adminAuth.verifyIdToken(token)
    const uid = decoded.uid;

    await adminAuth.deleteUser(uid);

    return NextResponse.json({success: true})
    
  } catch(error) {
    return NextResponse.json({error}, {status: 400})
  }

}