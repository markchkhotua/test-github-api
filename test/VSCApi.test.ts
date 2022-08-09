import request from 'supertest';
import app from '../src/app';
import { HttpCodes } from '../src/enums';

const testValidUser = 'defunkt';
const testInvalidUser = 'defunkttttt';

describe('Testing status route', () => {
    it('should return 200 and OK message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(HttpCodes.OK);
        expect(response.body).toEqual({ status: 200, Message: 'OK' });
    });
});

describe('Testing repositories route', () => {
    
    it('should return 200 and resulting array', async () => {
        const response = await request(app)
            .get(`/repositories/${ testValidUser }`)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(HttpCodes.OK);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 404 if user does not exist', async () => {
        const response = await request(app)
            .get(`/repositories/${ testInvalidUser }`)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(HttpCodes.NOT_FOUND);
        expect(response.body.status).toEqual(HttpCodes.NOT_FOUND);
        expect(response.body.Message).toEqual('Not Found');
    });

    it('should return 400 if Accept header don\'t include application/json', async () => {
        const response = await request(app)
            .get(`/repositories/${ testValidUser }`);
        expect(response.statusCode).toBe(HttpCodes.BAD_REQUEST);
        expect(typeof response.body).toBe('object');
        expect(response.body.status).toEqual(HttpCodes.BAD_REQUEST);
        expect(response.body.Message).toEqual('Missing application/json Accept header');
    });
   
    it('should return 406 if Accept header includes application/xml', async () => {
        const response = await request(app)
            .get(`/repositories/${ testValidUser }`)
            .set('Accept', 'application/xml');
        expect(response.statusCode).toBe(HttpCodes.NOT_ACCEPTABLE);
        expect(typeof response.body).toBe('object');
        expect(response.body.status).toEqual(HttpCodes.NOT_ACCEPTABLE);
        expect(response.body.Message).toEqual('application/xml Accept header is not acceptable');
    });
    
});