import { githubUrlBuilder } from '../../../src/utils/url-builder.utils';
import { repoInput, branchInput, userInput } from '../../mocks';
import config from '../../../config';

describe('Testing src/utils/url-builder.utils.ts util', () => {

    it('Function `getUserUrl` should return a proper url for repos', () => {
        const url: string = githubUrlBuilder.getUserUrl(userInput);
        expect(url).toEqual(`/users/${ userInput.entityName }`);
    });
    
    it('Function `getReposUrl` should return a proper url for repos', () => {
        const url: string = githubUrlBuilder.getReposUrl(repoInput);
        expect(url).toEqual(`/${ config.gitHubAPI.urls[repoInput.entityType] }/${ repoInput.entityName }` + 
            `/repos?per_page=100&page=${ repoInput.page }`);
    });
    
    it('Function `getBranchesUrl` should return a proper url for branches', () => {
        const url: string = githubUrlBuilder.getBranchesUrl(branchInput);
        expect(url).toEqual(`/repos/${ branchInput.login }/${ branchInput.name }/branches`);
    });
});

