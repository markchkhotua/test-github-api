export type ReposList = Array<Repo>
export type BranchesList = Array<Branch>
export type ResultingRepos = Array<ResultingRepo>;

export type Repo = {
    name: string,
    owner: {
        login: string
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
    branches: BranchesList
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