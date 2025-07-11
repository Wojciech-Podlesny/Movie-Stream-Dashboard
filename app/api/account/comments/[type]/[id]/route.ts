
import { db } from '@/lib/firebase/firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get('itemId');
  const type = searchParams.get('type');

  if (!itemId || !type) {
    return NextResponse.json({ error: 'Missing itemId or type' }, { status: 400 });
  }

  const commentsRef = collection(db, 'comments');
  const q = query(
    commentsRef,
    where('itemId', '==', itemId),
    where('type', '==', type),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(comments);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { text, author, itemId, type } = body;

  if (!text || !author || !itemId || !type) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const docRef = await addDoc(collection(db, 'comments'), {
    text,
    author,
    itemId,
    type,
    createdAt: new Date()
  });

  return NextResponse.json({ id: docRef.id });
}
