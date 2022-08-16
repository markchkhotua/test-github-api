import GithubApiService from '../../../src/services/github-api-service';
import type { BranchesList, GithubEntity, ReposList } from '../../../src/types';
import { branches, getEntity, getRepos } from '../../mocks';
import { GithubEntityType } from '../../../src/enums';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Testing src/services/github-api-service.ts service', () => {
    const testEntity: GithubEntity = getEntity(GithubEntityType.USER);
    const testRepos: ReposList = getRepos(GithubEntityType.USER);
    const mockedAxios: MockAdapter = new MockAdapter(axios);

    afterEach(() => {
        mockedAxios.reset();
    });
    
    it('Function `getUserData` should return a user object',
        async () => {
            mockedAxios.onGet().reply(200, testEntity);
            const user: GithubEntity = await GithubApiService.getInstance().getUserData({ entityName: testEntity.login });
            console.log(typeof user);
            expect(user).toEqual(testEntity);
        });

    it('Function `getRepositoriesData` should return an array of repos',
        async () => {
            mockedAxios.onGet().reply(200, testRepos);
            const repos: ReposList = await GithubApiService
                .getInstance()
                .getRepositoriesData({
                    entityName: testEntity.login,
                    entityType: testEntity.type,
                    page: '1' });
            expect(repos).toEqual(testRepos);
        });
    it('Function `getBranchesData` should return an array of branches',
        async () => {
            mockedAxios.onGet().reply(200, branches);
            const branchesList: BranchesList = await GithubApiService
                .getInstance()
                .getBranchesData({
                    login: testEntity.login,
                    name: testRepos[0].name
                });
            expect(branchesList).toEqual(branches);
        });
});

