import { getAuth, updateProfile } from 'firebase/auth';
import { app } from '@/lib/firebase/firebase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { displayName } = await req.json();
  const auth = getAuth(app);

  try {
    const user = auth.currentUser;

    if (!user) {
      return NextResponse.json({ error: 'Nie jesteś zalogowany.' }, { status: 401 });
    }

    await updateProfile(user, { displayName });

    return NextResponse.json({ success: true });
  } catch (err) {
    let errorMessage = 'Wystąpił błąd podczas aktualizacji profilu.';

    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
