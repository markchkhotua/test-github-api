import { UrlBuilder } from '../types';

export const githubUrlBuilder: UrlBuilder = {
    getReposUrl: ({ userName, page }) =>
        `/users/${ userName }/repos?per_page=100&page=${ page }`,
    getBranchesUrl: ({ userName, repoName }) => 
        `/repos/${ userName }/${ repoName }/branches`,
};