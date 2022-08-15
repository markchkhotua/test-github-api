import { modifySwaggerDoc } from '../../../src/middlewares';
import type { NextFunction, Request, Response } from 'express';
import { IExtendedRequest } from '../../../src/types';

describe('Testing src/middlewares/swagger.middlewares.ts middleware', () => {
    let mReq: Partial<Request>;
    let mRes: Partial<Response>;
    let mNext: NextFunction = jest.fn();

    it('Should call next() if receives swagger document', async () => {
        const swaggerDoc = {
            servers: [
                { url: 'our server url' }
            ]
        };
        mReq = {
        };
        mRes = {
        };
        await modifySwaggerDoc(swaggerDoc)(mReq as IExtendedRequest, mRes as Response, mNext);
        expect(mNext).toBeCalled();
    });

    it('Should call next() if receives non-swagger document anyway', async () => {
        const swaggerDoc = {
        };
        mReq = {
        };
        mRes = {
        };
        await modifySwaggerDoc(swaggerDoc)(mReq as IExtendedRequest, mRes as Response, mNext);
        expect(mNext).toBeCalled();
    });

});