// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  serverNoDataOnBodyError,
  serverWrongMethodError,
} from '@/lib/server/serverErrorRes';
import { ISubtask } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IApiSearchRequest extends NextApiRequest {
  body: { subtask?: ISubtask };
}

export default function handler(req: IApiSearchRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { taskId, subtaskId } = query;
  if (!taskId) {
    res.status(401).json({ message: 'cant get subtask withoud taskId' });
    return;
  }
  switch (method) {
    case 'GET':
      if (subtaskId) {
        res.status(200).json({ mesage: 'get Single Subtask by Id', subtaskId });
        break;
      }
      res.status(200).json({ message: 'get all Subtasks by task id', taskId });
      break;
    case 'POST':
      if (!body) {
        serverNoDataOnBodyError(res);
        break;
      }
      res
        .status(200)
        .json({ message: 'create subtask by taskId', taskId, subtask: body });
      break;
    default:
      serverWrongMethodError(res, ['GET', 'POST'], method || '');
      break;
  }
}
