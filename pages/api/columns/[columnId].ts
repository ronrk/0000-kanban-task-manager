// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  serverNoDataOnBodyError,
  serverWrongMethodError,
} from '@/lib/server/serverErrorRes';
import { IColumn, IColumnWithId } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IApiSearchRequest extends NextApiRequest {
  body: { column?: IColumn };
}

export default function handler(req: IApiSearchRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const { columnId } = query;

  if (!columnId) {
    res.status(401).json({ message: 'cant get columns withoud columnId' });
    return;
  }

  switch (method) {
    case 'PATCH':
      if (!body) {
        serverNoDataOnBodyError(res);
        break;
      }
      res
        .status(200)
        .json({ message: 'Update column', columnId, column: body });
      break;
    case 'DELETE':
      res.status(200).json({ message: 'Delete Column', columnId });
      break;
    default:
      serverWrongMethodError(res, ['PATCH', 'DELETE'], method || '');
      break;
  }
}
