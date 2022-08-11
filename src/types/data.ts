export type ReposList = Array<Repo>

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
    branches: Array<Branch>
}

export type RepoInput = {
    entityName: string,
    entityType: string,
    page: number
}

export type BranchesInput = {
    entityName: string,
    repoName: string
}
