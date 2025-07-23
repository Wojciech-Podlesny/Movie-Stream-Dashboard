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

        if (!credentials?.email || !credentials?.password) {
        throw new Error("Email and password are required.");
        }


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

          if(!user.emailVerified) {
            throw new Error("Email not verified");
          }
 
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            idToken: user.idToken 
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
              token.idToken = user.idToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
          session.user.idToken = token.idToken as string; 
      }
      return session;
    },
  },

  pages: {
    error: "/auth/error",
    signIn:"/login"
  },

  secret: process.env.NEXT_AUTH_SECRET,
});

export { handler as GET, handler as POST };
