//     "test": "jest --detectOpenHandles --forceExit"

const request = require('supertest');
const app = require("../app");
const userTest = require('./fixtures/myusers.json')

let token;
let userId ='';

beforeAll((done) => {
  request(app)
    .post('/api/auth/signin')
    .send({
      email: userTest[0].email,
      password: userTest[0].password,
    })
    .end((err, response) => {
      token = response.body.accessToken; // save the token!
      done();
    });
});

describe('User controller', () => {
  // add user
  test('It add an user', (done) => {
    return request(app)
      .post('/api/user')
      .set('x-access-token', token)
      .send({
        params: {
          email: userTest[1].email,
          name: userTest[1].name,
          password: userTest[1].password
        }
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
        userId = response.body.data.id;
        done()
      })
  })

    // change status user
    test('It change an user status', (done) => {
      return request(app)
        .post('/api/user/changestatus')
        .set('x-access-token', token)
        .send({
          params: {
            id: userId
          }
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body.status).toBe(true);
          done()
        })
    })

  // get user information
  test('It return user information for id='+userId, (done) => {
    return  request(app)
      .get('/api/user/' + userId)
      .set('x-access-token', token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toBeDefined()
        done()
      })
  });

  // delete user
  test('It delete an user', (done) => {
    return request(app)
      .delete('/api/user/'+userId)
      .set('x-access-token', token)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe(true);
        done()
      })
  })
  
});
