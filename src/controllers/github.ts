import { NextFunction, Request, Response } from 'express';
import { getAllReposPages, getBranchesPromises } from '../utils/repoHelper';
import { HttpCodes } from '../enums';
import APIError from '../errors/APIError';

const repositoriesController = async (req: Request, res: Response, next: NextFunction) => {
    
    const { userName, pages } = req.params;
    
    if(!userName) {
        return next(new APIError('Missing \'userName\' parameter', HttpCodes.BAD_REQUEST));
    }

    try {
        const data = await getAllReposPages(userName, pages);
        const reposBranchPromises = getBranchesPromises(data);
        const reposWithBranches = await Promise.all(reposBranchPromises);
        res.status(HttpCodes.OK).json(reposWithBranches);
    } catch (err) {
        next(err);
    }
};

export { repositoriesController };