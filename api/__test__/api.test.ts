import { expect } from 'chai';
import app from '../src/index';
import request from 'supertest';

describe('Base API Test', () => {
  it('should return title for the app', (done) => {
    request(app)
      .get('/api')
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.message).to.be.equal('Welcome to Practitioner app');

        done();
      });
  });

  it('should return 404 not found for random API hits', (done) => {
    const randomString = Math.random().toString(36).substr(2, 5);

    request(app)
      .get(`/api/randomstring`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(404);
        expect(res.body.error.code).to.be.equal(404);

        done();
      });
  });
});
