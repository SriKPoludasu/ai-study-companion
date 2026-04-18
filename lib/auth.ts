import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: hasDatabaseUrl() ? PrismaAdapter(prisma) : undefined,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
    error: "/signin"
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase();
        const password = credentials?.password;
        if (!email || !password) return null;

        if (email === "demo@aistudy.dev" && password === "demo1234") {
          return { id: "demo-user", email, name: "Kay Poludasu" };
        }

        if (!hasDatabaseUrl()) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "demo-user";
      }
      return session;
    }
  }
};
