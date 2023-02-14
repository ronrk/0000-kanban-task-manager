// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ISearchData } from '@/lib/search/types';
import type { NextApiRequest, NextApiResponse } from 'next';

interface IApiSearchRequest extends NextApiRequest {
  body: { searchTerm?: string };
}

export type IApiSearchResponseData = ISearchData[];

export default function handler(req: IApiSearchRequest, res: NextApiResponse) {
  res.status(200).json({ hello: 'world' });
}
