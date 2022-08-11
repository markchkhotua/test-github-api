import { githubUrlBuilder } from '../src/utils/urlBuilder';
import { repoInput, branchInput } from './mocks';

describe('Testing url builder', () => {

    it('Should return a proper url for repos', () => {
        const url = githubUrlBuilder.getReposUrl(repoInput);
        expect(url).toEqual(`/${ repoInput.entityType }/${ repoInput.entityName }` + 
            `/repos?per_page=100&page=${ repoInput.page }`);
    });
    it('Should return a proper url for branch', () => {
        const url = githubUrlBuilder.getBranchesUrl(branchInput);
        expect(url).toEqual(`/repos/${ branchInput.entityName }/${ branchInput.repoName }/branches`);
    });

});

