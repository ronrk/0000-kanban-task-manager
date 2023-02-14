// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  serverNoDataOnBodyError,
  serverWrongMethodError,
} from '@/lib/server/serverErrorRes';
import { ISubtaskWithId } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IApiSearchRequest extends NextApiRequest {
  body: { subtask?: ISubtaskWithId };
}

export default function handler(req: IApiSearchRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const { subtaskId } = query;

  if (!subtaskId) {
    res.status(401).json({ message: 'cant get subtasks without subtaskId' });
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
        .json({ message: 'Update subtask', subtaskId, column: body });
      break;
    case 'DELETE':
      res.status(200).json({ message: 'Delete subtask', subtaskId });
      break;
    default:
      serverWrongMethodError(res, ['PATCH', 'DELETE'], method || '');
      break;
  }
}
