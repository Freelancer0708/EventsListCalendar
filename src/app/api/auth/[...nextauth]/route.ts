import NextAuth from "next-auth";
import { authOptions } from "../options"; // ✅ options.ts からインポート

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
