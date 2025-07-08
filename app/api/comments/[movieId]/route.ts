import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';

export async function GET(
  _req: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    const q = query(
      collection(db, 'comments'),
      where('movieId', '==', params.movieId)
    );
    const snapshot = await getDocs(q);
    const comments = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        username: data.username,
        rating: data.rating,
        text: data.text,
        date: data.createdAt?.seconds
          ? new Date(data.createdAt.seconds * 1000).toLocaleDateString()
          : 'Unknown',
      };
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Failed to load comments' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    const { username, rating, text } = await request.json();
    if (!username || !rating || !text) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'comments'), {
      movieId: params.movieId,
      username,
      rating,
      text,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ message: 'Comment added', id: docRef.id });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ message: 'Error adding comment' }, { status: 500 });
  }
}
