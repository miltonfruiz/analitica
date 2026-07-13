```javascript
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('./User');
const Model = require('./Model');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Model', () => {
  it('debe crear un nuevo usuario', async () => {
    const user = new User({ name: 'Juan', email: 'juan@example.com' });
    await user.save();
    expect(user._id).toBeDefined();
    expect(user.name).toBe('Juan');
    expect(user.email).toBe('juan@example.com');
  });

  it('no debe crear un nuevo usuario sin nombre', async () => {
    const user = new User({ email: 'juan@example.com' });
    await expect(user.save()).rejects.toThrow();
  });

  it('no debe crear un nuevo usuario sin email', async () => {
    const user = new User({ name: 'Juan' });
    await expect(user.save()).rejects.toThrow();
  });

  it('no debe crear un nuevo usuario con email duplicado', async () => {
    const user1 = new User({ name: 'Juan', email: 'juan@example.com' });
    await user1.save();
    const user2 = new User({ name: 'Juan2', email: 'juan@example.com' });
    await expect(user2.save()).rejects.toThrow();
  });
});

describe('Model Model', () => {
  it('debe crear un nuevo modelo', async () => {
    const model = new Model({ name: 'Modelo 1' });
    await model.save();
    expect(model._id).toBeDefined();
    expect(model.name).toBe('Modelo 1');
  });

  it('no debe crear un nuevo modelo sin nombre', async () => {
    const model = new Model({});
    await expect(model.save()).rejects.toThrow();
  });

  it('debe encontrar un modelo por id', async () => {
    const model = new Model({ name: 'Modelo 1' });
    await model.save();
    const foundModel = await Model.findById(model._id);
    expect(foundModel._id).toEqual(model._id);
    expect(foundModel.name).toBe('Modelo 1');
  });

  it('debe actualizar un modelo', async () => {
    const model = new Model({ name: 'Modelo 1' });
    await model.save();
    const updatedModel = await Model.findByIdAndUpdate(model._id, { name: 'Modelo 2' }, { new: true });
    expect(updatedModel.name).toBe('Modelo 2');
  });

  it('debe eliminar un modelo', async () => {
    const model = new Model({ name: 'Modelo 1' });
    await model.save();
    await Model.findByIdAndDelete(model._id);
    const foundModel = await Model.findById(model._id);
    expect(foundModel).toBeNull();
  });
});
```