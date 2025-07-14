import { getAdminApp } from "@/lib/firebase/firebase.server";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split("Bearer ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decodedToken = await getAdminAuth(getAdminApp()).verifyIdToken(token);
    const { uid, email, name } = decodedToken;

    const { text, rating, itemId, type } = await req.json();

    if (!text || !rating || !itemId || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const db = getFirestore(getAdminApp());
    const docRef = await db.collection("comments").add({
      text,
      rating,
      itemId,
      type,
      userId: uid,
      username: name || email,
      email,
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 403 });
  }
}

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const itemId = searchParams.get("itemId");
  const type = searchParams.get("type");

  if (!itemId || !type) {
    return NextResponse.json({ error: "Missing itemId or type" }, { status: 400 });
  }

  try {
  const db = getFirestore(getAdminApp());

  const snapshot = await db.collection("comments")
    .where("itemId", "==", itemId)
    .where("type", "==", type)
    .orderBy("createdAt", "desc")
    .get();

  const comments = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      text: data.text,
      rating: data.rating,
      itemId: data.itemId,
      type: data.type,
      userId: data.userId,
      username: data.username,
      email: data.email,
      createdAt: data.createdAt.toDate().toISOString(),
    };
  })
  return NextResponse.json(comments)  


  } catch(error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });

  }
}