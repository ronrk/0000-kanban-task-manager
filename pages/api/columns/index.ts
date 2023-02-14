// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  serverNoDataOnBodyError,
  serverWrongMethodError,
} from '@/lib/server/serverErrorRes';
import { IColumn } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IApiSearchRequest extends NextApiRequest {
  body: { column?: IColumn };
}

export default function handler(req: IApiSearchRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { boardId, columnId } = query;
  if (!boardId) {
    res.status(401).json({ message: 'cant get columns withoud boardId' });
    return;
  }

  switch (method) {
    case 'GET':
      if (columnId) {
        res.status(200).json({ mesage: 'get Single Columns by Id', columnId });
        break;
      }
      res.status(200).json({ message: 'get all columns by board id', boardId });
      break;
    case 'POST':
      if (!body) {
        serverNoDataOnBodyError(res);
        break;
      }
      res
        .status(200)
        .json({ message: 'create column by boardId', boardId, column: body });
      break;
    default:
      serverWrongMethodError(res, ['GET', 'POST'], method || '');
      break;
  }
}
