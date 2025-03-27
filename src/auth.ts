import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { findUserByEmail } from "./app/api/services/authService";
import { loginUser, registerUser } from "./app/api/controllers/authController";
import prisma from "./app/api/services/prisma";
// import { CredentialType, Provider } from "@prisma/client";

const handler = NextAuth({
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const result = await loginUser(credentials.email, credentials.password);
        if (result && result.user) {
          return result.user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const userExists = await findUserByEmail(user.email!);
        if (
          !userExists ||
          !userExists.credentials.some((c) => c.provider === "GOOGLE")
        ) {
          // register the user
          const result = await prisma.user.upsert({
            create: {
              email: user.email!,
              name: user.name!,
              credentials: {
                create: {
                  type: "OAUTH",
                  provider: "GOOGLE",
                  value: account.providerAccountId.toString(),
                },
              },
            },
            update: {
              credentials: {
                create: {
                  type: "OAUTH",
                  provider: "GOOGLE",
                  value: account.providerAccountId.toString(),
                },
              },
            },
            where: { email: user.email! },
          });
          if (!result) {
            return false;
          }
        } else {
          // try to login the user
          const googleCredential = userExists.credentials.find(
            (c) => c.provider === "GOOGLE"
          );
          if (
            !googleCredential ||
            account.providerAccountId.toString() !== googleCredential.value
          ) {
            return false;
          }
        }
      } else if (account?.provider === "github") {
        const userExists = await findUserByEmail(user.email!);
        if (
          !userExists ||
          !userExists.credentials.some((c) => c.provider === "GITHUB")
        ) {
          // register the user
          const result = await prisma.user.upsert({
            create: {
              email: user.email!,
              name: user.name!,
              credentials: {
                create: {
                  type: "OAUTH",
                  provider: "GITHUB",
                  value: account.providerAccountId.toString(),
                },
              },
            },
            update: {
              credentials: {
                create: {
                  type: "OAUTH",
                  provider: "GITHUB",
                  value: account.providerAccountId.toString(),
                },
              },
            },
            where: { email: user.email! },
          });
          if (!result) {
            return false;
          }
        } else {
          // try to login the user
          const githubCredential = userExists.credentials.find(
            (c) => c.provider === "GITHUB"
          );
          if (
            !githubCredential ||
            account.providerAccountId.toString() !== githubCredential.value
          ) {
            return false;
          }
        }
      }
      return true;
    },
  },
});

export { handler as auth };
