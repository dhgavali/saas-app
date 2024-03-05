import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default function authOptions() {
  return {
    session: {
      strategy: "jwt"
    },
    pages: {
      signIn: '/login'
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null;
          } 
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          });
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        }
      })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
  };
}