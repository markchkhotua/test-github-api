import { GithubEntityType } from '../enums';

export type ReposList = Array<Repo>
export type BranchesList = Array<Branch>
export type ResultingBranchesList = Array<ResultingBranch>
export type ResultingRepos = Array<ResultingRepo>;

export type GithubEntity = {
    login: string,
    type: `${ GithubEntityType }`,
}

export type Repo = {
    name: string,
    owner: {
        login: string,
        type: `${ GithubEntityType }`,
    },
    fork?: boolean
}

export type Branch = {
    name: string,
    commit: {
        sha: string
    }
}

export type ResultingBranch = {
    name: string,
    sha: string
}

export type ResultingRepo = {
    login: string,
    name: string,
    type: `${ GithubEntityType }`,
    branches: ResultingBranchesList
}

export type UserInput = {
    entityName: string,
}

export type ReposInput = {
    entityName: string,
    entityType: `${ GithubEntityType }`,
    page: string
}

export type BranchesInput = {
    login: string,
    name: string
}