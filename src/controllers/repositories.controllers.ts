import { getBranchesPromises } from '../utils/repo-helper.utils';
import { HttpCodes, VCSEntityType } from '../enums';
import { ApiError } from '../errors';
import GithubApiService from '../services/github-api-service';
import type { GithubController, ReposList, ResultingRepos, ResultingRepoPromises } from '../types';

const githubController: GithubController = 
    async (req, res, next) => {
    
        const { entityName, entityType = VCSEntityType.users, page } = req.params;
    
        if(!entityName) {
            return next(new ApiError('Missing \'entityName\' parameter', HttpCodes.BAD_REQUEST));
        }

        try {
            const data: ReposList = await GithubApiService
                .getInstance()
                .getRepositoriesData({ entityName, entityType, page });
            const reposBranchPromises: ResultingRepoPromises = getBranchesPromises(data);
            const reposWithBranches: ResultingRepos = await Promise.all(reposBranchPromises);
            res.status(HttpCodes.OK).json(reposWithBranches);
        } catch (err) {
            next(err);
        }
    };

export { githubController };