const request = require('supertest');
const app = require('../server');
const db = require('../src/models/db');

describe('Conference API', () => {
  let token;

  beforeAll(async () => {
    // Register and login to get token
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    token = loginResponse.body.token;
  });

  afterAll((done) => {
    db.close(done);
  });

  describe('GET /api/conferences', () => {
    it('should return an array of conferences', async () => {
      const response = await request(app)
        .get('/api/conferences')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /api/conferences', () => {
    it('should create a conference when authenticated', async () => {
      const response = await request(app)
        .post('/api/conferences')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Conference',
          description: 'A test conference',
          start_date: '2026-01-20',
          end_date: '2026-01-22'
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Conference');
    });

    it('should return 401 when not authenticated', async () => {
      const response = await request(app)
        .post('/api/conferences')
        .send({
          title: 'Test Conference',
          description: 'A test conference',
          start_date: '2026-01-20',
          end_date: '2026-01-22'
        })
        .expect(401);

      expect(response.body).toHaveProperty('message', 'No token provided');
    });
  });
});