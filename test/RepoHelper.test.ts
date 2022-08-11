import GithubAPIService from '../src/services/GithubAPIService';
import { getBranchesPromise } from '../src/utils/repoHelper';
import { accessibleBranch, repo } from './mocks';

describe('Testing branches', () => {

    beforeEach(() => {
        jest.spyOn(GithubAPIService.getInstance(), 'getBranchesData')
            .mockImplementation((login, name: string) =>
                new Promise((resolve, reject) => accessibleBranch[name] ? resolve(accessibleBranch[name]) : reject(new Error())));
    });
    
    it('Should return a repo with array of branches in case of accessible branch', async () => {
        const response = await getBranchesPromise(repo);
        expect(Array.isArray(response?.branches)).toBe(true);
        expect(response?.branches.length).not.toBe(0);
    });

    it('Should return a repo with empty branches array in case of accessible branch', async () => {
        const response = await getBranchesPromise({ ...repo, name: 'qwe' });
        expect(Array.isArray(response?.branches)).toBe(true);
        expect(response?.branches.length).toBe(0);
    });
});

