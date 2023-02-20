import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../models/User';
import { server404Error } from '../serverFunction';

export const getUserAPI = async (
  { query }: NextApiRequest,
  res: NextApiResponse
) => {
  const user = await User.findById(query.uid).select('-password');
  if (!user) {
    return server404Error(res, `Cant find user with id :${query.uid}`);
  }
  return res.status(200).json({ message: 'Get user By UID', data: user });
};

export const createNewUserAPI = async (
  { body }: NextApiRequest,
  res: NextApiResponse
) => {
  if (!body) {
    return server404Error(res, 'createNewUser: no data on req.body');
  }
  const newUser = await User.create(body);
  return res.status(200).json({ message: 'Create new user', data: newUser });
};
