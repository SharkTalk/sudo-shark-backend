const request = require('supertest');

const server = 'http://localhost:3000';

describe('GET /__test', () => {
  it('responds with 200 status', () =>
    request(server).get('/__test').expect(200));
});
