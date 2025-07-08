import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { getAdminApp } from "@/lib/firebase/firebase.server";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_AUTH_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );

          const user = await res.json();

          if (!res.ok) throw new Error(user.error);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("NextAuth authorize error:", error);
          return null;
        }
      },
    }),
  ],

  adapter: FirestoreAdapter({
    credential: getAdminApp().options.credential!, 
  }),

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    error: "/auth/error",
    signIn:"/login"
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };





























// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { auth } from '@/lib/firebase/firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
      
//       authorize: async (credentials) => {
//         if (!credentials) return null;
//         try {
//           const userCredential = await signInWithEmailAndPassword(
//             auth,
//             credentials.email,
//             credentials.password
//           );
//           return { id: userCredential.user.uid, email: userCredential.user.email };
//         } catch {
//           console.error('Error')  
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/login',
//     signOut: '/',
//     error: '/auth/error',
//   },
//   session: {
//     strategy: 'jwt',
//   },
// });

// export { handler as GET, handler as POST };
