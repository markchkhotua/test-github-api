import type { BranchesInput, BranchesList, ReposInput, ReposList } from './data.types';

export interface IGithubAPIService {
    getUserData: GetVCSDataFunction<ReposList, ReposInput>,
    getRepositoriesData: GetVCSDataFunction<ReposList, ReposInput>,
    getBranchesData: GetVCSDataFunction<BranchesList, BranchesInput>
}

export type AbstractGetVCSDataFunction = (url: string) => Promise<any>;

export type GetVCSDataFunction<T, K> = (vcsInput: K) => Promise<T>

