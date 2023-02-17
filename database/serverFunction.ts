import mongoose, { Model } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

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
