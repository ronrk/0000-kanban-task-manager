import { IApiColumnRequest } from '@/pages/api/columns';
import { NextApiResponse } from 'next';
import Columns from '../models/Column';

export const getTemplateColumn = async (
  req: IApiColumnRequest,
  res: NextApiResponse
) => {
  try {
    const newColumn = new Columns({ name: 'Todo' });

    return res.status(200).json({ newColumn });
  } catch (error) {
    return res.status(200).json({ message: 'Errror fetching data' });
  }
};
