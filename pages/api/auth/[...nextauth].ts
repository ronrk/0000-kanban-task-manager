import { connectMongo } from '@/database';
import { User } from '@/database/models/User';
import mongoose from 'mongoose';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        await connectMongo().catch((error) => {
          console.log('Cant connect to db');
          console.log({ error });
        });
        const { username, password } = credentials as {
          password: string;
          username: string;
        };

        const user = await User.findOne({
          username: username,
        });

        if (!user) {
          throw new Error(`No user with username: ${username}`);
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
          console.log({ isPasswordCorrect });
          throw new Error('Wrong Password, try again');
        }
        return { id: user._id, email: user.email, username: user.username };
      },
    }),
  ],
  pages: { signIn: '/auth/signin' },
  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        token._id = user?.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id as mongoose.Types.ObjectId;
      return session;
    },
  },
};

export default NextAuth(authOptions);
