import request from 'supertest';
import app from '../src/app';
import { HttpCodes } from '../src/enums';
import GithubAPIService from '../src/services/GithubAPIService';
import APIError from '../src/errors/APIError';
import { repos, branches } from './mocks';

describe('Testing status route', () => {
    it('should return 200 and OK message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(HttpCodes.OK);
        expect(response.body).toEqual({ status: 200, Message: 'OK' });
    });
});

describe('Testing OK response', () => {
    beforeEach(() => {
        jest.spyOn(GithubAPIService.getInstance(), 'getRepositoriesData')
            .mockImplementation(() => new Promise((resolve) => resolve(repos)));
        jest.spyOn(GithubAPIService.getInstance(), 'getBranchesData')
            .mockImplementation(() => new Promise((resolve) => resolve(branches)));
    });

    it('Users - should return 200 and resulting array', async () => {
        const response = await request(app)
            .get('/repositories/users/asdfghjkl')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(HttpCodes.OK);
        expect(Array.isArray(response.body)).toBe(true);
    });
    it('Organizations - should return 200 and resulting array', async () => {
        const response = await request(app)
            .get('/repositories/orgs/zxcvbnm')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(HttpCodes.OK);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('Testing 404 response', () => {

    beforeEach(() => {
        jest.spyOn(GithubAPIService.getInstance(), 'getRepositoriesData')
            .mockImplementation(() => new Promise((resolve, reject) => {
                reject(new APIError('Not Found', 404));
            }));
    });

    it('Users - should return 404 if user does not exist', async () => {
        const response = await request(app)
            .get('/repositories/users/aaazzzxxx')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(HttpCodes.NOT_FOUND);
        expect(response.body.status).toEqual(HttpCodes.NOT_FOUND);
        expect(response.body.Message).toEqual('Not Found');
    });
    it('Organizations - should return 404 if organization does not exist', async () => {
        const response = await request(app)
            .get('/repositories/orgs/aaazzzxxx')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(HttpCodes.NOT_FOUND);
        expect(response.body.status).toEqual(HttpCodes.NOT_FOUND);
        expect(response.body.Message).toEqual('Not Found');
    });
    
});

describe('Testing 400 response', () => {

    it('Users - should return 400 if Accept header don\'t include application/json', async () => {
        const response = await request(app)
            .get('/repositories/users/aaazzzxxx');
        expect(response.statusCode).toBe(HttpCodes.BAD_REQUEST);
        expect(response.body.status).toEqual(HttpCodes.BAD_REQUEST);
        expect(response.body.Message).toEqual('Missing application/json Accept header');
    });
    it('Organizations should return 400 if Accept header don\'t include application/json', async () => {
        const response = await request(app)
            .get('/repositories/orgs/aaazzzxxx');
        expect(response.statusCode).toBe(HttpCodes.BAD_REQUEST);
        expect(response.body.status).toEqual(HttpCodes.BAD_REQUEST);
        expect(response.body.Message).toEqual('Missing application/json Accept header');
    });

});

describe('Testing 406 response', () => {

    it('Users should return 406 if Accept header includes application/xml', async () => {
        const response = await request(app)
            .get('/repositories/users/asdfghjkl')
            .set('Accept', 'application/xml');
        expect(response.statusCode).toBe(HttpCodes.NOT_ACCEPTABLE);
        expect(typeof response.body).toBe('object');
        expect(response.body.status).toEqual(HttpCodes.NOT_ACCEPTABLE);
        expect(response.body.Message).toEqual('application/xml Accept header is not acceptable');
    });

    it('Organizations should return 406 if Accept header includes application/xml', async () => {
        const response = await request(app)
            .get('/repositories/orgs/asdfghjkl')
            .set('Accept', 'application/xml');
        expect(response.statusCode).toBe(HttpCodes.NOT_ACCEPTABLE);
        expect(typeof response.body).toBe('object');
        expect(response.body.status).toEqual(HttpCodes.NOT_ACCEPTABLE);
        expect(response.body.Message).toEqual('application/xml Accept header is not acceptable');
    });

});