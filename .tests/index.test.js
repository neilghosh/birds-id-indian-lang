
const request = require('supertest');
const app = require('../server');
describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        // console.log(response);
    });
    test('It should response the POST method', async () => {
        const response = await request(app).post('/').attach('img', `${__dirname}/test.jpeg`);
        expect(response.statusCode).toBe(200);
        //console.log(response.data);
    }, 20000);


});

describe('Test the /api path', () => {
    test('It should respond with 200 to POST method with image', async () => {
        const response = await request(app)
            .post('/api')
            .attach('img', `${__dirname}/test.jpeg`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('birdData');
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('imgBuffer');
    }, 20000);

    test('It should respond with 400 to POST method without image', async () => {
        const response = await request(app)
            .post('/api')
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');

    }, 20000);
});