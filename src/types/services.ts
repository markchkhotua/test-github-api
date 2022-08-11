import { Branch, Repo } from './data';

export interface IGithubAPIService {
    getRepositoriesData: (entityName: string, entityType: string, page: number) => Promise<Repo[]>
    getBranchesData: (entityName: string, repoName: string) => Promise<Branch[]>
}

export type VCSInputData = {
    [key: string]: string | number
}

export type GetUrlFunction = (vscInputData: any) => string