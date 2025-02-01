import { NextAuthOptions, Session, Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

interface ExtendedToken extends JWT {
  accessToken?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/calendar.readonly email profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: ExtendedToken; account?: Account | null }) {
      if (account) {
        token.accessToken = account.access_token as string;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: ExtendedToken }) {
      session.accessToken = token.accessToken ?? "";
      return session;
    },
  },
};
