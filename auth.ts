import prisma from '@/app/lib/prisma';
import { signInEmailPassword } from '@/auth/actions/auth-actions';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials  from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const authOptions:NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub, 
        Google,
        Credentials({
            name: 'credentials',
            credentials: {
                email:    { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" },
            },
            authorize: async ( credentials ) => {
                let user = await signInEmailPassword( (credentials!.email as string), (credentials!.password as string) )
                if (!user) {
                    return null;
                }
                return user
            },
          }),
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials,  }){
            return true;
        },
        async jwt({ token, user, account, profile  }){
            try {
                const dbUser = await prisma.user.findFirst({ where: { email: token.email } });
                if (dbUser?.isActive === false) {
                    return null;
                }
                token.roles = dbUser?.roles ?? ['No roles'];
                token.id = dbUser?.id ?? 'No uuid';
                return token;
            } catch (error) {
                console.error('Error while checking user permissions:', (error as any).message);
                return null;
            }
        },
        async session({ session, token, user }){
            session.user.roles = token.roles;
            session.user.id = token.id;
            return session;
        },
    },
}
 
export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
