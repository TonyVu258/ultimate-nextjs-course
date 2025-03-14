import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { ActionResponse } from "./types/global";
import { api } from "./lib/api";
import { IAccountDoc } from "./database/account.model";

// We'll check if the sign-in account type is credentials; if yes, then we skip. We'll handle it the other way aroung when doing email password-based authentication.

// But if the account type is not credentials, we'll call this new `SignInWithOAuth` app and create oAuth accounts.

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        const { data: existingAccount, success } =
          (await api.accounts.getByProvider(
            account.type === "credentials"
              ? token.email!
              : account.providerAccountId
          )) as ActionResponse<IAccountDoc>;

        if (!success || !existingAccount) return token;

        const userId = existingAccount.userId;

        if (userId) token.sub = userId.toString();
      }

      return token;
    },
    async signIn({user, account, profile}) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username:
          account.provider === "github"
            ? (profile?.login as string)
            : (user.name?.toLowerCase() as string),
      };

      const { success } = (await api.auth.oAuthSignIn({
        user: userInfo,
        provider: account.provider as "github" | "google",
        providerAccountId: account.providerAccountId,
      })) as ActionResponse;

      if (!success) return false;

      return true
    }
  },
})