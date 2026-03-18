import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authSecret =
  process.env.AUTH_SECRET ??
  (process.env.NODE_ENV !== 'production'
    ? 'dev-only-auth-secret-change-me'
    : undefined);

const authConfig: NextAuthConfig = {
  secret: authSecret,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const email =
          typeof credentials?.email === 'string' ? credentials.email : '';
        const password =
          typeof credentials?.password === 'string' ? credentials.password : '';
        return {
          id: 'demo-user',
          name: 'Demo User',
          password,
          email,
        };
      },
    }),
  ],
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Authorization is enforced in proxy.ts to keep redirects locale-aware.
    authorized: async () => true,
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
