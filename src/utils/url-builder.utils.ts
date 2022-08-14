import type { UrlBuilder } from '../types';

export const githubUrlBuilder: UrlBuilder = {
    getUserUrl: ({ entityName }) =>
        `/users/${ entityName }`,
    getReposUrl: ({ entityName, entityType, page }) =>
        `/${ entityType }/${ entityName }/repos?per_page=100&page=${ page }`,
    getBranchesUrl: ({ login, name }) =>
        `/repos/${ login }/${ name }/branches`,
};