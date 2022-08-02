import { expect } from 'chai';
import supertest from 'supertest';

const generateEmail = () =>
  `newuser${Math.floor(Math.random() * 1000)}@gmail.com`;
const testEmail = generateEmail();

describe('Auth', () => {
  const request = supertest('https://clientbase-server.herokuapp.com/v3');
  it('Successful login new user', () => {
    request
      .post('/user')
      .send({
        firstName: 'Iryna',
        lastName: 'Lala',
        email: testEmail,
        password: '123123',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.eq(201);
        expect(res.body.message).to.eq(
          'User created successfully. Please check your email and verify it'
        );
      });
  });
  it('Unsuccessful login new user with existing credentials', () => {
    request
      .post('/user')
      .send({
        firstName: 'Iryna',
        lastName: 'Lala',
        email: 'dala@ddt.com',
        password: '123123',
      })
      .end((err, res) => {
        expect(res.statusCode).to.eq(409);
        expect(res.body.message).to.eq('User with this e-mail exists');
      });
  });
});
