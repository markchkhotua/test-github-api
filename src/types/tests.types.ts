import type { Branch, GithubEntity, ReposList, ResultingRepos } from './';
import { GithubEntityType } from '../enums';

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

export { MockBranches, GetEntityFunction, GetReposFunction, GetResultingReposFunction, Error404 };