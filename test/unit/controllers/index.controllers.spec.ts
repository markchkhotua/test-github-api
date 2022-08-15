import defaultHandler from '../../../src/controllers';
import type { NextFunction, Request, Response } from 'express';
import {  HttpCodes } from '../../../src/enums';

describe('Testing src/controllers/index.ts controller', () => {
    let mReq: Partial<Request>;
    let mRes: Partial<Response>;
    let mNext: NextFunction = jest.fn();
    
    it('Should return 200 and status json', async () => {
        mReq = {
        };
        mRes = {
            json: jest.fn(),
            status: jest.fn().mockImplementation(()=> mRes)
        };
        await defaultHandler(mReq as Request, mRes as Response, mNext);
        expect(mRes.status).toBeCalledWith(HttpCodes.OK);
        expect(mRes.json).toBeCalledWith({ status: HttpCodes.OK, Message: 'OK' });
    });
});