import { getAuth, deleteUser } from 'firebase/auth';
import { app } from '@/lib/firebase/firebase';
import { NextResponse } from 'next/server';

export async function POST() {
  const auth = getAuth(app);
  const user = auth.currentUser;

  try {
    if (!user) throw new Error('Brak zalogowanego użytkownika.');
    await deleteUser(user);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
