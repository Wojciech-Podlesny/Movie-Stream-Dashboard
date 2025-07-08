import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebase';
import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, 'comments'));

    const comments = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        movieId: data.movieId,
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
    console.error('Error fetching all comments:', error);
    return NextResponse.json({ message: 'Error fetching comments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { movieId, username, rating, text } = await request.json();

    if (!movieId || !username || !text || typeof rating !== 'number') {
      return NextResponse.json({ message: 'Invalid comment data' }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, 'comments'), {
      movieId,
      username,
      rating: Number(rating),
      text,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ message: 'Comment added', id: docRef.id });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ message: 'Error adding comment' }, { status: 500 });
  }
}
