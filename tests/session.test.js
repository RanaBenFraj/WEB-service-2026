const request = require('supertest');
const app = require('../server');
const db = require('../src/models/db');

describe('Session API', () => {
  let token;
  let conferenceId;

  beforeAll(async () => {
    // Register and login
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

    // Create a conference
    const confResponse = await request(app)
      .post('/api/conferences')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Conference',
        description: 'A test conference',
        start_date: '2026-01-20',
        end_date: '2026-01-22'
      });

    conferenceId = confResponse.body.id;
  });

  afterAll((done) => {
    db.close(done);
  });

  describe('POST /api/sessions', () => {
    it('should create a session linked to a conference (status 201)', async () => {
      const response = await request(app)
        .post('/api/sessions')
        .set('Authorization', `Bearer ${token}`)
        .send({
          conference_id: conferenceId,
          title: 'Test Session',
          speaker: 'Test Speaker',
          start_time: '2026-01-20T10:00:00',
          end_time: '2026-01-20T11:00:00'
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Session');
    });
  });

  describe('GET /api/sessions/:conferenceId', () => {
    it('should return all sessions for a given conference (status 200)', async () => {
      const response = await request(app)
        .get(`/api/sessions/${conferenceId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});