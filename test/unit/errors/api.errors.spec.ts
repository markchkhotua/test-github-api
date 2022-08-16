import { ApiError } from '../../../src/errors';
import { HttpCodes } from '../../../src/enums';
import type { ErrorResponseObject } from '../../../src/types';

describe('Testing src/errors/api.errors.ts', () => {
    it('Function `getResponseObject` should return a proper error object',
        () => {
            const message: string = 'test error message';
            const error: ApiError = new ApiError(message, HttpCodes.SERVER_ERROR);
            const responseObject: ErrorResponseObject = error.getResponseObject();
            expect(responseObject).toEqual({ status: HttpCodes.SERVER_ERROR, Message: message });
        });

});

