```javascript
const request = require('supertest');
const app = require('./backend/server');
const User = require('./backend/models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let token;

beforeAll(async () => {
  await User.deleteMany({});
  const user = new User({ email: 'test@example.com', password: 'password' });
  await user.save();
  token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
});

afterAll(async () => {
  await User.deleteMany({});
});

describe('GET /users', () => {
  it('should return all users', async () => {
    const response = await request(app)
      .get('/users')
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('GET /users/:id', () => {
  it('should return a user by id', async () => {
    const user = await User.findOne({ email: 'test@example.com' });
    const response = await request(app)
      .get(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(user._id.toString());
  });
});

describe('POST /users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .set("Authorization", `Bearer ${token}`)
      .send({ email: 'newuser@example.com', password: 'password' });
    expect(response.status).toBe(201);
    expect(response.body.email).toBe('newuser@example.com');
  });
});

describe('PUT /users/:id', () => {
  it('should update a user', async () => {
    const user = await User.findOne({ email: 'test@example.com' });
    const response = await request(app)
      .put(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: 'updateduser@example.com' });
    expect(response.status).toBe(200);
    expect(response.body.email).toBe('updateduser@example.com');
  });
});

describe('DELETE /users/:id', () => {
  it('should delete a user', async () => {
    const user = await User.findOne({ email: 'test@example.com' });
    const response = await request(app)
      .delete(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
});
```