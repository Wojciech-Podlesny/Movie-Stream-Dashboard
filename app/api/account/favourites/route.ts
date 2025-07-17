import { getAdminApp } from "@/lib/firebase/firebase.server";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = req.headers.get("Authorization")?.split("Bearer ")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { itemId, type, data } = await req.json();
    if (!itemId || !type) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const auth = getAdminAuth(getAdminApp());
    const decoded = await auth.verifyIdToken(token);
    const db = getFirestore(getAdminApp());

    await db.collection(`users/${decoded.uid}/favourites`).doc(itemId).set({
      itemId,
      type,
      ...data,
      addedAt: Timestamp.now(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add to favorites" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const token = req.headers.get("Authorization")?.split("Bearer ")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { itemId } = await req.json();
    if (!itemId) return NextResponse.json({ error: "Missing itemId" }, { status: 400 });

    const auth = getAdminAuth(getAdminApp());
    const decoded = await auth.verifyIdToken(token);
    const db = getFirestore(getAdminApp());

    await db.collection(`users/${decoded.uid}/favourites`).doc(itemId).delete();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to remove from favorites" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split("Bearer ")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const auth = getAdminAuth(getAdminApp());
    const decoded = await auth.verifyIdToken(token);
    const db = getFirestore(getAdminApp());

    const snapshot = await db.collection(`users/${decoded.uid}/favourites`).get();
    const favorites = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json(favorites);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}
