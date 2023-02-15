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
  const { method, body, query } = req;
  const { taskId } = query;

  if (!taskId) {
    res.status(401).json({ message: 'cant get tasks withoud taskId' });
    return;
  }

  switch (method) {
    case 'PATCH':
      if (!body) {
        serverNoDataOnBodyError(res);
        break;
      }
      res.status(200).json({ message: 'Update task', taskId, task: body });
      break;
    case 'DELETE':
      res.status(200).json({ message: 'Delete task', taskId });
      break;
    default:
      serverWrongMethodError(res, ['PATCH', 'DELETE'], method || '');
      break;
  }
}
