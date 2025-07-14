import { getAuth } from "firebase-admin/auth";
import { getAdminApp } from "@/lib/firebase/firebase.server";
import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";


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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("itemId");
  const type = searchParams.get("type");

  if (!itemId || !type) {
    return NextResponse.json({ error: "Missing itemId or type" }, { status: 400 });
  }

  try {
    const db = getFirestore(getAdminApp());
    const snapshot = await db
      .collection("comments")
      .where("itemId", "==", itemId)
      .where("type", "==", type)
      .orderBy("createdAt", "desc")
      .get();

    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
