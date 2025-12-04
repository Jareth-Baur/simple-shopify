import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],

  // ✅ CUSTOM SIGN-IN PAGE (kept, but safe)
  pages: {
    signIn: "/auth/signin",
  },

  session: {
    strategy: "database",
  },

  callbacks: {
    // ✨ FIX: Prevent redirect loop from Google/Facebook
    redirect({ url, baseUrl }) {
      // Never redirect back to sign-in page or it loops
      if (url.includes("/auth/signin")) return baseUrl;

      // Internal redirect
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // Same origin redirect
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {
        return baseUrl;
      }

      // Default fallback
      return baseUrl;
    },

    async signIn({ user, account }) {
      // If user already exists, link provider accounts safely
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      if (existingUser) {
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          update: {},
          create: {
            userId: existingUser.id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            session_state: account.session_state,
          },
        });
      }

      return true;
    },

    async session({ session, user }) {
      // Add user.role to session
      session.user.role = user.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
