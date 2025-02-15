
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
