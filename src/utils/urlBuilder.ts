import { UrlBuilder } from '../types';

export const githubUrlBuilder: UrlBuilder = {
    getReposUrl: ({ entityName, entityType, page }) =>
        `/${ entityType }/${ entityName }/repos?per_page=100&page=${ page }`,
    getBranchesUrl: ({ entityName, repoName }) => 
        `/repos/${ entityName }/${ repoName }/branches`,
};