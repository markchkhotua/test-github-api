import request from 'supertest';
import type { Response } from 'supertest';
import app from '../../src/app';
import { GithubEntityType, HttpCodes } from '../../src/enums';
import { branches, error404, getEntity, getRepos, getResultingRepos } from '../mocks';
import nock from 'nock';
import config from '../../config';
import type { GithubEntity, ReposList, ResultingRepos } from '../../src/types';

describe('Testing status route', () => {
    it('should return 200 and OK message', async () => {
        const response: Response = await request(app).get('/');
        expect(response.statusCode).toBe(HttpCodes.OK);
        expect(response.body).toEqual({ status: 200, Message: 'OK' });
    });
});

describe('Testing /repositories/github/:entityName route - 200 response', () => {

    const mockFullChainRequest = (entity: GithubEntity): void => {
        const repos: ReposList = getRepos(entity.type);
        nock(`${ config.gitHubAPI.urls.base }`)
            .get(`/users/${ entity.login }`)
            .reply(HttpCodes.OK, entity)
            .get(`/${ config.gitHubAPI.urls[entity.type] }/${ entity.login }/repos`)
            .query({ per_page: 100, page: 1 })
            .reply(200, repos)
            .get(`/repos/${ entity.login }/${ repos[0].name }/branches`)
            .reply(200, branches);
    };

    it('Users - should return 200 and resulting array', async () => {
        const user = getEntity(GithubEntityType.USER);
        mockFullChainRequest(user);
        const response: Response = await request(app)
            .get(`/repositories/github/${ user.login }`)
            .set('Accept', 'application/json');
        const toCompare = getResultingRepos(GithubEntityType.USER);
        expect(response.statusCode).toBe(HttpCodes.OK);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(toCompare);
    });
    
    it('Organizations - should return 200 and resulting array', async () => {
        const organization: GithubEntity = getEntity(GithubEntityType.ORGANIZATION);
        mockFullChainRequest(organization);
        const response: Response = await request(app)
            .get(`/repositories/github/${ organization.login }`)
            .set('Accept', 'application/json');
        const toCompare: ResultingRepos = getResultingRepos(GithubEntityType.ORGANIZATION);
        expect(response.statusCode).toBe(HttpCodes.OK);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(toCompare);
    });
});

describe('Testing /repositories/github/:entityName route - 404 response', () => {

    const mockRequest = (entity: GithubEntity): void => {
        nock(`${ config.gitHubAPI.urls.base }`)
            .get(`/users/${ entity.login }`)
            .reply(HttpCodes.NOT_FOUND, error404);
    };

    it('Should return 404 if user does not exist', async () => {
        const user: GithubEntity = getEntity(GithubEntityType.USER);
        mockRequest(user);
        const response: Response = await request(app)
            .get(`/repositories/github/${ user.login }`)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(HttpCodes.NOT_FOUND);
        expect(response.body.status).toEqual(HttpCodes.NOT_FOUND);
        expect(response.body.Message).toEqual('Not Found');
    });
});

describe('Testing /repositories/github/:entityName route - 400 response', () => {

    it('Should return 400 if Accept header don\'t include application/json', async () => {
        const response: Response = await request(app)
            .get('/repositories/github/no-matter-who');
        expect(response.statusCode).toBe(HttpCodes.BAD_REQUEST);
        expect(response.body.status).toEqual(HttpCodes.BAD_REQUEST);
        expect(response.body.Message).toEqual('Missing application/json Accept header');
    });
});

describe('Testing /repositories/github/:entityName route - 406 response', () => {

    it('Should return 406 if Accept header includes application/xml', async () => {
        const response: Response = await request(app)
            .get('/repositories/github/no-matter-who')
            .set('Accept', 'application/xml');
        expect(response.statusCode).toBe(HttpCodes.NOT_ACCEPTABLE);
        expect(typeof response.body).toBe('object');
        expect(response.body.status).toEqual(HttpCodes.NOT_ACCEPTABLE);
        expect(response.body.Message).toEqual('application/xml Accept header is not acceptable');
    });
});