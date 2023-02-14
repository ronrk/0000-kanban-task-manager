// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  serverNoDataOnBodyError,
  serverWrongMethodError,
} from '@/lib/server/serverErrorRes';
import { ITask } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IApiSearchRequest extends NextApiRequest {
  body: { task?: ITask };
}

export default function handler(req: IApiSearchRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { columnId, taskId } = query;
  if (!columnId) {
    res.status(401).json({ message: 'cant get tasks withoud columnId' });
    return;
  }

  switch (method) {
    case 'GET':
      if (taskId) {
        res.status(200).json({ mesage: 'get Single Tasks by Id', taskId });
        break;
      }
      res
        .status(200)
        .json({ message: 'get all columns by Column id', columnId });
      break;
    case 'POST':
      if (!body) {
        serverNoDataOnBodyError(res);
        break;
      }
      res
        .status(200)
        .json({ message: 'create task by columnId', columnId, column: body });
      break;
    default:
      serverWrongMethodError(res, ['GET', 'POST'], method || '');
      break;
  }
}
