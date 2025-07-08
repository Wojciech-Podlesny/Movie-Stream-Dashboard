import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { auth } from '@/lib/firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      
      authorize: async (credentials) => {
        if (!credentials) return null;
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );
          return { id: userCredential.user.uid, email: userCredential.user.email };
        } catch {
          console.error('Error')  
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
