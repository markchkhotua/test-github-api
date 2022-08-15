import { getBranchesPromises } from '../utils/repo-helper.utils';
import { HttpCodes } from '../enums';
import { ApiError } from '../errors';
import GithubApiService from '../services/github-api-service';
import type { GithubController, ReposList, ResultingRepos, ResultingRepoPromises, GithubEntity } from '../types';

const githubController: GithubController =
    async (req, res, next) => {

        const { entityName, page } = req.params;

        if(!entityName) {
            return next(new ApiError('Missing \'entityName\' parameter', HttpCodes.BAD_REQUEST));
        }

        try {
            const githubApiService = GithubApiService.getInstance();
            const { type: entityType }: GithubEntity = await githubApiService.getUserData({ entityName });
            const data: ReposList = await githubApiService
                .getRepositoriesData({ entityName, entityType, page });
            const reposBranchPromises: ResultingRepoPromises = getBranchesPromises(data);
            const reposWithBranches: ResultingRepos = await Promise.all(reposBranchPromises);
            res.status(HttpCodes.OK).json(reposWithBranches);
        } catch (err) {
            next(err);
        }
    };

export { githubController };