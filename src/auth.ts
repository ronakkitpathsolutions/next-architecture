import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authConfig: NextAuthConfig = {
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

        const demoEmail = process.env.AUTH_DEMO_EMAIL;
        const demoPassword = process.env.AUTH_DEMO_PASSWORD;

        if (!demoEmail || !demoPassword) {
          return null;
        }

        if (email !== demoEmail || password !== demoPassword) {
          return null;
        }

        return {
          id: 'demo-user',
          name: 'Demo User',
          email: demoEmail,
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
