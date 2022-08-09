import { Branch, Repo } from './data';

export interface IGithubAPIService {
    getRepositoriesData: (userName: string, page: number) => Promise<Repo[]>
    getBranchesData: (userName: string, repoName: string) => Promise<Branch[]>
}