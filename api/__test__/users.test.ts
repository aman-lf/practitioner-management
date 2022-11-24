import { expect } from 'chai';
import request from 'supertest';
import app from '../src/index';
import db from '../src/db';
import User from '../src/models/user';
const createUser = jest.fn();
/**
 * Tests for '/api/signup'
 * Tests for '/api/signin'
 */
describe('Users Controller Test', () => {
  beforeEach((done) => {
    db(User.table)
      .del()
      .then(() => {
        done();
      });
  });

  it('should respond with bad request for empty JSON in request body', (done) => {
    const user = {};

    request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(400);
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');

        done();
      });
  });

  it('should create a new user with valid data', (done) => {
    const user = {
      email: 'test@test.com',
      password: 'test',
    };

    request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        const { message } = res.body;

        expect(res.status).to.be.equal(201);
        expect(message).to.be.equal('Successfully created a user.');

        done();
      });
  });

  it('should not create user if invalid email is provided', (done) => {
    const user = {
      email: 'test',
      password: 'test',
    };

    request(app)
      .post('/api/signup')
      .send(user)
      .end((err, res) => {
        const { message, details } = res.body.error;
        console.log('asdf', res.body);

        expect(res.status).to.be.equal(400);
        expect(message).to.be.equal('Bad Request');
        expect(details).to.be.an('array');
        expect(details[0]).to.have.property('message');
        expect(details[0]).to.have.property('param', 'email');

        done();
      });
  });

  // it('should return login jwt token', (done) => {
  //   const user = {
  //     email: 'test@test.com',
  //     password: 'test',
  //   };

  //   request(app)
  //     .post('/api/signin')
  //     .send(user)
  //     .end((err, res) => {
  //       console.log('asdf', res.body);
  //       const { data } = res.body.error;

  //       expect(res.status).to.be.equal(200);
  //       expect(data).to.have.property('accessToken');

  //       done();
  //     });
  // });

  it('should return "Email or Password incorrect" if wrong password provided', (done) => {
    const user = {
      email: 'test@test.com',
      password: 'wrongpassword',
    };

    request(app)
      .post('/api/signin')
      .send(user)
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(401);
        expect(code).to.be.equal(401);
        expect(message).to.be.equal('Email or Password incorrect');

        done();
      });
  });

  it('should return "Email or Password incorrect" if unregistered email provided', (done) => {
    const user = {
      email: 'unregistered@unregistered.com',
      password: 'wrongpassword',
    };

    request(app)
      .post('/api/signin')
      .send(user)
      .end((err, res) => {
        const { code, message } = res.body.error;

        expect(res.status).to.be.equal(401);
        expect(code).to.be.equal(401);
        expect(message).to.be.equal('Email or Password incorrect');

        done();
      });
  });
});
