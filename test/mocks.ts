import { Branch } from '../src/types';

type MockBranches = {
    [key: string]: Array<Branch>
}

const repos = [
    {
        name: 'acts_as_textiled',
        owner: {
            login: 'defunkt',
        },
        fork: false
    }
];
const branches = [
    {
        name: 'master',
        commit: {
            sha: 'fce0e1f58f01403568bee122a256cfab1adc6b5b',
        },
    }
];

const repo = {
    name: 'acts_as_textiled',
    owner: {
        login: 'defunkt',
    },
    fork: false
};

const accessibleBranch: MockBranches = {
    'acts_as_textiled': [
        {
            name: 'master',
            commit: {
                sha: 'fce0e1f58f01403568bee122a256cfab1adc6b5b',
            },
        }
    ]
};

export { repos, repo, branches, accessibleBranch };
