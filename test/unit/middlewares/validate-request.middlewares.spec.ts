import { validateRequestMiddlewares } from '../../../src/middlewares';
import type { NextFunction, Request, Response } from 'express';
import { IExtendedRequest } from '../../../src/types';
import { ApiError } from '../../../src/errors';
import { HttpCodes } from '../../../src/enums';

describe('src/middlewares/validate-request.middlewares.ts', () => {
    let mReq: Partial<Request>;
    let mRes: Partial<Response>;
    let mNext: NextFunction = jest.fn();

    it('Should return 406 if Accept header `application/xml is present', async () => {
        mReq = {
            headers: {
                accept: 'application/xml'
            }
        };
        mRes = {
            json: jest.fn()
        };
        await validateRequestMiddlewares(mReq as IExtendedRequest, mRes as Response, mNext);
        expect(mNext).toBeCalledWith(new ApiError('application/xml Accept header is not acceptable',
            HttpCodes.NOT_ACCEPTABLE));
    });

    it('Should return 400 if Accept header `application/json is missing', async () => {
        mReq = {
            headers: {
                accept: 'application/lol'
            }
        };
        mRes = {
            json: jest.fn()
        };
        await validateRequestMiddlewares(mReq as IExtendedRequest, mRes as Response, mNext);
        expect(mNext).toBeCalledWith(new ApiError('Missing application/json Accept header',
            HttpCodes.BAD_REQUEST));
    });

    it('Should call next() if Accept header `application/json is present', async () => {
        mReq = {
            headers: {
                accept: 'application/json'
            }
        };
        mRes = {
            json: jest.fn()
        };
        await validateRequestMiddlewares(mReq as IExtendedRequest, mRes as Response, mNext);
        expect(mNext).toBeCalledWith();
    });
});