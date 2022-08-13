import type { UrlBuilder } from '../types';

export const githubUrlBuilder: UrlBuilder = {
    getReposUrl: ({ entityName, entityType, page }) =>
        `/${ entityType }/${ entityName }/repos?per_page=100&page=${ page }`,
    getBranchesUrl: ({ login, name }) =>
        `/repos/${ login }/${ name }/branches`,
};