import GithubApiService from '../../../src/services/github-api-service';
import type { BranchesList, ReposList } from '../../../src/types';
import { branches, getEntity, getRepos } from '../../mocks';
import { GithubEntityType, HttpCodes } from '../../../src/enums';
import nock from 'nock';
import config from '../../../config';

describe('Testing src/services/github-api-service.ts service', () => {
    const testEntity = getEntity(GithubEntityType.USER);
    const testRepos = getRepos(GithubEntityType.USER);

    it('Function `getUserData` should return a user object',
        async () => {
            nock(`${ config.gitHubAPI.urls.base }`)
                .get(`/users/${ testEntity.login }`)
                .reply(HttpCodes.OK, testEntity);
            const user: ReposList = await GithubApiService.getInstance().getUserData({ entityName: testEntity.login });
            console.log(typeof user);
            expect(user).toEqual(testEntity);
        });

    it('Function `getRepositoriesData` should return an array of repos',
        async () => {
            nock(`${ config.gitHubAPI.urls.base }`)
                .get(`/${ config.gitHubAPI.urls[testEntity.type] }/${ testEntity.login }/repos`)
                .query({ per_page: 100, page: 1 })
                .reply(200, testRepos);
            const user: ReposList = await GithubApiService
                .getInstance()
                .getRepositoriesData({
                    entityName: testEntity.login,
                    entityType: testEntity.type,
                    page: '1' });
            expect(user).toEqual(testRepos);
        });
    it('Function `getBranchesData` should return an array of branches',
        async () => {
            nock(`${ config.gitHubAPI.urls.base }`)
                .get(`/repos/${ testEntity.login }/${ testRepos[0].name }/branches`)
                .reply(200, branches);
            const branchesList: BranchesList = await GithubApiService
                .getInstance()
                .getBranchesData({
                    login: testEntity.login,
                    name: testRepos[0].name
                });
            expect(branchesList).toEqual(branches);
        });
});

