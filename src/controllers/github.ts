import { RequestHandler } from 'express';
import { getBranchesPromises } from '../utils/repoHelper';
import { HttpCodes, VCSEntityType } from '../enums';
import APIError from '../errors/APIError';
import GithubAPIService from '../services/GithubAPIService';

const repositoriesController: RequestHandler = async (req, res, next) => {
    
    const { entityName, entityType = VCSEntityType.users, page } = req.params;
    
    if(!entityName) {
        return next(new APIError('Missing \'entityName\' parameter', HttpCodes.BAD_REQUEST));
    }

    try {
        const data = await GithubAPIService.getInstance().getRepositoriesData(entityName, entityType, +page);
        const reposBranchPromises = getBranchesPromises(data);
        const reposWithBranches = await Promise.all(reposBranchPromises);
        res.status(HttpCodes.OK).json(reposWithBranches);
    } catch (err) {
        next(err);
    }
};

export { repositoriesController };