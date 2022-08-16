import GithubApiService from '../../../src/services/github-api-service';
import type {
    GithubAPIServiceMock,
    ReposList,
    ResultingRepo,
    ResultingRepoPromises
} from '../../../src/types';
import { getBranchesPromises } from '../../../src/utils/repo-helper.utils';
import { branch, getRepos, getResultingRepos } from '../../mocks';

describe('Testing src/utils/repo-helper.utils.ts util', () => {
    
    const mockGetBranchesServiceMethod = (isAccessible: boolean): GithubAPIServiceMock =>
        jest.spyOn(GithubApiService.getInstance(), 'getBranchesData')
            .mockImplementation(() =>
                new Promise((resolve, reject) =>
                    isAccessible
                        ? resolve([branch])
                        : reject(new Error())));

    const repos: ReposList = getRepos();
    const { name, owner: { login } } = repos[0];

    it('Function `getBranchesPromises` should return a repo with array of branches in case of accessible branch', 
        async () => {
            const mock: GithubAPIServiceMock = mockGetBranchesServiceMethod(true);
            const response: ResultingRepoPromises = getBranchesPromises(repos);
            expect(Array.isArray(response)).toBe(true);
            expect(response[0]).toBeInstanceOf(Promise<ResultingRepo>);
            const resolved: ResultingRepo = await response[0];
            expect(mock).toBeCalled();
            expect(mock).toBeCalledWith({ login, name });
            expect(resolved).toEqual(getResultingRepos()[0]);
        });
    
    it('Function `getBranchesPromises` should return a repo with empty array of branches in case of non-ccessible branch', 
        async () => {
            const mock: GithubAPIServiceMock = mockGetBranchesServiceMethod(false);
            const response: ResultingRepoPromises = getBranchesPromises(repos);
            expect(Array.isArray(response)).toBe(true);
            expect(response[0]).toBeInstanceOf(Promise<ResultingRepo>);
            const resolved: ResultingRepo = await response[0];
            const resultingRepo: ResultingRepo = getResultingRepos()[0];
            resultingRepo.branches = [];
            expect(mock).toBeCalled();
            expect(mock).toBeCalledWith({ login, name });
            expect(resolved).toEqual(resultingRepo);
        });

});

