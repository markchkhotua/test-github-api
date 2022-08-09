export type ReposList = Array<Repo>

export type Repo = {
    name: string,
    owner: {
        login: string
    },
    fork?: boolean
}

export type RepoInput = {
    userName: string,
    page: number
}

export type Branch = {
    name: string,
    commit: {
        sha: string
    }
}
