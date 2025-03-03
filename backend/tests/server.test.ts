import request from 'supertest';
import app from '../server.js';

describe('GET /', () => {
  it('should return a hello message from server.js', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Hello from server.js!');
  });
});
