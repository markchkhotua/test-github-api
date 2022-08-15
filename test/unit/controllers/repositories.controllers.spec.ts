import { githubController } from '../../../src/controllers';
import type { NextFunction, Request, Response } from 'express';
import { GithubEntity, IReposRequest, ReposList } from '../../../src/types';
import { ApiError } from '../../../src/errors';
import { GithubEntityType, HttpCodes } from '../../../src/enums';
import GithubApiService from '../../../src/services/github-api-service';
import { branch, getEntity, getRepos } from '../../mocks';

describe('src/controllers/repositories.ts', () => {
    let mReq: Partial<Request>;
    let mRes: Partial<Response>;
    let mNext: NextFunction = jest.fn();
    
    it('Should return 400 if `entityName` param is missing', async () => {
        mReq = {
            params: {
                page: '1'
            }
        };
        mRes = {
            json: jest.fn()
        };
        await githubController(mReq as IReposRequest, mRes as Response, mNext);
        expect(mNext).toBeCalledWith(new ApiError('Missing \'entityName\' parameter', HttpCodes.BAD_REQUEST));
    });
    
    it('Should return 404 if user not found', async () => {
        const notFoundError = new ApiError('Not found', HttpCodes.NOT_FOUND);
        jest.spyOn(GithubApiService.getInstance(), 'getUserData')
            .mockImplementation(() => {
                throw notFoundError;
            });
        const 
            mReq = {
                params: {
                    entityName: 'test',
                    page: '1'
                }
            };
        mRes = {
            json: jest.fn()
        };
        await githubController(mReq as IReposRequest, mRes as Response, mNext);
        expect(mNext).toBeCalledWith(notFoundError);
    });
    
    it('Should return 200 and response body if user found', async () => {
        const testEntity: GithubEntity = getEntity(GithubEntityType.USER);
        const testRepos: ReposList = getRepos(GithubEntityType.USER);
        jest.spyOn(GithubApiService.getInstance(), 'getUserData')
            .mockImplementation(() =>
                new Promise((resolve) =>
                    resolve(testEntity)));
        jest.spyOn(GithubApiService.getInstance(), 'getRepositoriesData')
            .mockImplementation(() =>
                new Promise((resolve) =>
                    resolve(testRepos)));
        jest.spyOn(GithubApiService.getInstance(), 'getRepositoriesData')
            .mockImplementation(() =>
                new Promise((resolve) =>
                    resolve(testRepos)));
        jest.spyOn(GithubApiService.getInstance(), 'getBranchesData')
            .mockImplementation(() =>
                new Promise((resolve) =>
                    resolve([branch])));
        const
            mReq = {
                params: {
                    entityName: 'test',
                    page: '1'
                }
            };
        mRes = {
            json: jest.fn(),
            status: jest.fn().mockImplementation(()=> mRes)
        };
        await githubController(mReq as IReposRequest, mRes as Response, mNext);
        expect(mRes.status).toBeCalledWith(HttpCodes.OK);
        expect(mRes.json).toBeCalled();
    });
});