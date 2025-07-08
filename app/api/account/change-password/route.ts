import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { app } from '@/lib/firebase/firebase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, currentPassword, newPassword } = await req.json();
  const auth = getAuth(app);

  try {
    const user = auth.currentUser;

    if (!user || !user.email) throw new Error('Nie jesteś zalogowany.');

    const credential = EmailAuthProvider.credential(email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 });
  }
}
