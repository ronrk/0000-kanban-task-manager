import { NextApiResponse } from 'next';

export const serverWrongMethodError = (
  res: NextApiResponse,
  allowedMethods: string[],
  method: string
) =>
  res
    .setHeader('Allow', allowedMethods)
    .status(405)
    .end(`Method ${method} Not Allowed`);

export const serverNoDataOnBodyError = (res: NextApiResponse) =>
  res.status(404).json({ message: 'cant find data on req.body' });
