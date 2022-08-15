import GithubApiService from '../../../src/services/github-api-service';
import type { BranchesInput, ResultingRepo } from '../../../src/types';
import { getBranchesPromises } from '../../../src/utils/repo-helper.utils';
import { branch, getRepos, getResultingRepos } from '../../mocks';
import { ApiError } from '../../../src/errors';
import { HttpCodes } from '../../../src/enums';

describe('Testing src/errors/api.errors.ts', () => {

    it('Function `getResponseObject` should return a proper error object',
        () => {
            const message = 'test error message';
            const error = new ApiError(message, HttpCodes.SERVER_ERROR);
            const responseObject = error.getResponseObject();
            expect(responseObject).toEqual({ status: HttpCodes.SERVER_ERROR, Message: message });
        });

});

