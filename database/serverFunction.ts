import jwt from 'jsonwebtoken';
import mongoose, { Model } from 'mongoose';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextAuthOptions } from 'next-auth';
import { User } from './models/User';
import connectMongo from './mongodb';

export const removeEntiteis = async (
  model: Model<any>,
  docId: mongoose.Types.ObjectId
) => {
  const foundedColumn = await model.findById(docId);
  if (!foundedColumn) {
    return;
  }
  await foundedColumn.remove();
};

export const wrongMethodError = (
  req: NextApiRequest,
  res: NextApiResponse,
  allowed: string[]
) => {
  const { method } = req;
  return res
    .setHeader('Allow', allowed)
    .status(405)
    .end(`Method ${method} Not Allowed`);
};

export const server404Error = (
  res: NextApiResponse,
  errMessage: string,
  statusCode: number = 404
) => {
  return res.status(statusCode).json({ errMessage });
};

export const createJWT = (payload: any) => {
  console.log('CREATE JWT');
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME!,
  });
  return token;
};

export const isTokenValid = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!);

export const checkClientSessionAuthentication = async (
  { req, res }: GetServerSidePropsContext,

  authOptions: NextAuthOptions,
  getServerSession: any
) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return false;

    await connectMongo().catch((error) => {
      throw error;
    });
    const user = await User.findById(session.user._id).select('-password');
    if (!user) {
      return false;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log({ error });
    console.log('SERVER SIDE RENDERING ERROR');
    return false;
  }
};
