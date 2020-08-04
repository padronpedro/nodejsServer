//     "test": "jest --detectOpenHandles --forceExit"

const request = require('supertest');
const app = require("../app");

let token;
let userId ='';

beforeAll((done) => {
  request(app)
    .post('/api/auth/signin')
    .send({
      email: 'a@a.com',
      password: '321321321',
    })
    .end((err, response) => {
      token = response.body.accessToken; // save the token!
      done();
    });
});

describe('User controller', () => {
  // add user
  test('It add an user', async (done) => {
    return await request(app)
      .post('/api/user')
      .set('x-access-token', token)
      .send({
        params: {
          email: 't@t.com',
          name: 'test',
          password: 't'
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
