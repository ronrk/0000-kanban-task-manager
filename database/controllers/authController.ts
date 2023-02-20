import { CustomError } from '@/database/errors';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../models/User';
import { createJWT } from '../serverFunction';

export const loginUserAPI = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(401)
        .json({ message: 'Wrong Credentials', username, password });
    }

    const user = await User.findOne({ username: username }).select('-passowrd');

    if (!user) {
      return res.status(404).json({ message: 'Wrong username', username });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      console.log({ isPasswordCorrect });
      return res.status(403).json({ message: 'Wrong Password', username });
    }
    const tokenUser = createJWT({
      username: user.username,
      email: user.email,
      _id: user.id,
    });
    return res
      .status(200)
      .json({ message: 'Login User', token: tokenUser, user });
  } catch (error) {
    res.status(404).json({ message: 'Error Login' });
  }
};

export const logoutUserAPI = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    return res.status(200).json({ message: 'Logout User' });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const registerUserAPI = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      throw new CustomError.BadRequestError(
        'Please provide email and password'
      );
    }
    const emailAlreadyExist = await User.findOne({ email });
    const usernameAlreadyExist = await User.findOne({ username });
    if (emailAlreadyExist) {
      throw new CustomError.BadRequestError('Email already exist');
    }
    if (usernameAlreadyExist) {
      throw new CustomError.BadRequestError('Username already exist');
    }
    const requestedUser = await User.create({ email, password, username });
    const tokenUser = createJWT({
      username: requestedUser.username,
      email: requestedUser.email,
      _id: requestedUser.id,
    });
    const user = await getUserByUID(requestedUser._id);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Register User', token: tokenUser, user });
  } catch (error) {
    res.status(400).json({ message: 'ERROR REGISTER', error: error });
  }
};

export const getUserByUID = async (uid: string | mongoose.Types.ObjectId) => {
  const user = await User.findById(uid).select('-password');
  return user;
};
