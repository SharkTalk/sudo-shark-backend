const request = require('supertest');

const server = 'http://localhost:3000';

describe('POST /api/', () => {
  const payload = {
    language: '__test',
    text: 'LoremIpsum',
  };
  it('responds with 200 status and text/html content type', () =>
    request(server).post('/api/').send(payload).expect(payload.text));
});
