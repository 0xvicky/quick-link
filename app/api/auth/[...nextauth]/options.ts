import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {connectDB} from "@/utils/config/dbConfig";
import UserModel from "@/models/userSchema";
import {NextResponse} from "next/server";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "text"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials: any): Promise<any> {
        console.log("this is meail");
        console.log(credentials.email);
        await connectDB();
        try {
          const user = await UserModel.findOne({email: credentials.email});
          console.log(user);
          if (!user) {
            console.log("No user with this email");
            throw "No user found with this email !";
            // return NextResponse.json({msg: "No user with this email"}, {status: 400});
          }
          const isPassword = await bcrypt.compare(credentials.password, user.password);

          if (!isPassword) {
            console.log("Password not correct");
            throw "Password is incorrect!";
          }
          console.log(user);
          return user;
        } catch (err: any) {
          throw new Error(err);
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      // console.log("1234");
      if (user) {
        token._id = user._id?.toString();
        token.username = user?.username?.toString();
      }
      console.log(token);
      return token;
    },
    async session({session, token}) {
      // console.log("3456");
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
      }
      console.log(session);
      return session;
    }
  },
  pages: {
    signIn: "/auth"
  },
  session: {
    strategy: "jwt"
  },

  secret: process.env.NEXTAUTH_SECRET
};
