import GithubAPIService from '../src/services/GithubAPIService';
import { getBranchesPromise } from '../src/utils/repoHelper';
import { Branch } from '../src/types';

type MockBranches = {
    [key: string]: Array<Branch>
}

const mockRepo = {
    name: 'acts_as_textiled',
    owner: {
        login: 'defunkt',
    },
    fork: false
};

const mockBranches: MockBranches = {
    'acts_as_textiled': [
        {
            name: 'master',
            commit: {
                sha: 'fce0e1f58f01403568bee122a256cfab1adc6b5b',
            },
        }
    ]
};

describe('Testing branches', () => {

    beforeEach(() => {
        jest.spyOn(GithubAPIService.getInstance(), 'getBranchesData')
            .mockImplementation((login, name: string) =>
                new Promise((resolve, reject) => mockBranches[name] ? resolve(mockBranches[name]) : reject(new Error())));
    });
    
    it('Should return a repo with array of branches in case of accessible branch', async () => {
        const response = await getBranchesPromise(mockRepo);
        expect(Array.isArray(response?.branches)).toBe(true);
        expect(response?.branches.length).not.toBe(0);
    });

    it('Should return a repo with empty branches array in case of accessible branch', async () => {
        const response = await getBranchesPromise({ ...mockRepo, name: 'qwe' });
        expect(Array.isArray(response?.branches)).toBe(true);
        expect(response?.branches.length).toBe(0);
    });
});

