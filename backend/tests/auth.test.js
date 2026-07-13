```javascript
const request = require('supertest');
const app = require('../backend/server');
const mongoose = require('mongoose');
const User = require('../backend/models/User');

jest.mock('../backend/models/User');

describe('Autenticacin', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost/test');
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  it('debe registrar un usuario', async () => {
    const respuesta = await request(app)
      .post('/api/auth/register')
      .send({ nombre: 'Juan', email: 'juan@example.com', password: '123456' });

    expect(respuesta.status).toBe(201);
    expect(respuesta.body).toHaveProperty('token');
  });

  it('debe loguear un usuario', async () => {
    const user = new User({ nombre: 'Juan', email: 'juan@example.com', password: '123456' });
    await user.save();

    const respuesta = await request(app)
      .post('/api/auth/login')
      .send({ email: 'juan@example.com', password: '123456' });

    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toHaveProperty('token');
  });

  it('debe rechazar un token invlido', async () => {
    const respuesta = await request(app)
      .post('/api/auth/login')
      .send({ email: 'juan@example.com', password: '1234567' });

    expect(respuesta.status).toBe(401);
    expect(respuesta.body).toHaveProperty('mensaje', 'Credenciales invlidas');
  });
});
```