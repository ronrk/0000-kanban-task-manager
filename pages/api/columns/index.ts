// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getTemplateColumn } from '@/database/controllers/columnController';
import {
  serverNoDataOnBodyError,
  serverWrongMethodError,
} from '@/lib/server/serverErrorRes';
import { IColumn } from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface IApiColumnRequest extends NextApiRequest {
  body: IColumn;
}

export default function handler(req: IApiColumnRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { boardId, columnId, template } = query;
  const isQuery = Object.keys(query).length !== 0;

  switch (method) {
    case 'GET':
      if (isQuery) {
        if (query.template && template === 'true') {
          getTemplateColumn(req, res);
          break;
        }
      }
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
