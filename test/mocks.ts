import type {
    BranchesInput,
    ReposInput,
    GetEntityFunction,
    GetReposFunction, 
    GetResultingReposFunction, 
    Error404,
    UserInput
} from '../src/types';
import { GithubEntityType } from '../src/enums';

const getEntity: GetEntityFunction = (type = GithubEntityType.USER) => (
    {
        login: `johndoe_${ type }`,
        type
    }
);

const getRepos: GetReposFunction = (type = GithubEntityType.USER) => [
    {
        name: 'acts_as_textiled',
        owner: {
            login: `johndoe_${ type }`,
            type
        },
        fork: false
    }
];

const getResultingRepos: GetResultingReposFunction = (type = GithubEntityType.USER) => [
    {
        login: `johndoe_${ type }`,
        name: 'acts_as_textiled',
        type,
        branches: [
            {
                name: 'master',
                sha: 'fce0e1f58f01403568bee122a256cfab1adc6b5b',
            }
        ]
    }
];

const branch = {
    name: 'master',
    commit: {
        sha: 'fce0e1f58f01403568bee122a256cfab1adc6b5b',
    },
};

const error404: Error404 = {
    message: 'Not Found',
    documentation_url: 'https://docs.github.com/rest/reference/users#get-a-user'
};

const branches = [
    branch
];

const userInput: UserInput = {
    entityName: 'test_user',
};

const repoInput: ReposInput = {
    entityName: 'test_user',
    entityType: GithubEntityType.USER,
    page: '1'
};

const branchInput: BranchesInput = {
    login: 'test_user',
    name: 'test_repo'
};

export { error404, branch, repoInput, userInput, branchInput, branches, getEntity, getResultingRepos, getRepos };
