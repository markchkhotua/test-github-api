import { GithubEntityType } from '../enums';

export type ReposList = Array<Repo>
export type BranchesList = Array<Branch>
export type ResultingRepos = Array<ResultingRepo>;

export type User = {
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

export type ResultingRepo = {
    login: string,
    name: string,
    type: `${ GithubEntityType }`,
    branches: BranchesList
}

export type UserInput = {
    entityName: string,
}

export type ReposInput = {
    entityName: string,
    entityType: string,
    page: string
}

export type BranchesInput = {
    login: string,
    name: string
}