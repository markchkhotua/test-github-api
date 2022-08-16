import type { Branch, GithubEntity, ReposList, ResultingRepos } from './';
import { GithubEntityType } from '../enums';
import { BranchesInput } from './';

type MockBranches = {
    [key: string]: Array<Branch>
}

type GetEntityFunction = (type?: GithubEntityType) => GithubEntity

type GetReposFunction = (type?: `${ GithubEntityType }`) => ReposList

type GetResultingReposFunction = (type?: GithubEntityType) => ResultingRepos

type Error404 = {
    message: string,
    documentation_url: string
}

type GithubAPIServiceMock = jest.MockInstance<Promise<any>, [BranchesInput]>;

type SwaggerDocMock = {
    servers?: Array<{ url: string }>
}

export { MockBranches, GetEntityFunction, GetReposFunction, GetResultingReposFunction, Error404, GithubAPIServiceMock, SwaggerDocMock };