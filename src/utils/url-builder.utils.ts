import type { UrlBuilder } from '../types';
import config from '../../config';

export const githubUrlBuilder: UrlBuilder = {
    getUserUrl: ({ entityName }) =>
        `/users/${ entityName }`,
    getReposUrl: ({ entityName, entityType, page }) =>
        `/${ config.gitHubAPI.urls[entityType] }/${ entityName }/repos?per_page=100&page=${ page }`,
    getBranchesUrl: ({ login, name }) =>
        `/repos/${ login }/${ name }/branches`,
};