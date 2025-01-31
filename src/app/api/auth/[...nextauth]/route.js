import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        } else {
          const db = await connectDB();
          const query = { email: email };
          const user = await db.collection("user").findOne(query);
          console.log(user);
          if (!user) {
            return null;
          } else {
            if (password === user?.password) {
              return user;
            } else {
              return null;
            }
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const db = await connectDB();
        const userCollection = await db.collection("user");
        const query = { email: user?.email };
        const registeredUser = await userCollection.findOne(query);
        if (!registeredUser) {
          const newUser = {
            ...user,
            role: 'volunteer'
          }
          const result = await userCollection.insertOne(newUser);
          if (result.acknowledged) {
            return true;
          }else{
            return false;
          }
        } else {
          return true;
        }
      } else {
        return user;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
