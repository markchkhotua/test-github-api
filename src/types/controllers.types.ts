import type { NextFunction, Request, Response } from 'express';

export interface IReposRequest extends Request{
    params: RequestParams
}

export type GithubController = (req: IReposRequest, res: Response, next: NextFunction) => void

type RequestParams = {
    entityName: string,
    page: string
}
