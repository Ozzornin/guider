import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
console.log(process.env.NEXTAUTH_GOOGLE_CLIENT_ID);
export const {
  auth,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
