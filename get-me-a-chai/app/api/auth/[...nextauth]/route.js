import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/User";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

  ],
callbacks: {
  async signIn({ user, account }) {

    if (account.provider === "github") {

      // Connect DB
      await connectDb();

      // Check existing user
      const currentUser = await User.findOne({
        email: user.email,
      });

      // Create new user if not exists
      if (!currentUser) {

        const newUser = await User.create({
          email: user.email,
          username: user.email.split("@")[0],
        });
        await newUser.save()
      }
    }

    return true;
  },  
  async session({session,user,token}){
    const dbUser=await User.findOne({email:session.user.email})
    session.user.name=dbUser.username
    return session;
  },
}
});

export { handler as GET, handler as POST };