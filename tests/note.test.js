const request = require('supertest');
const app = require('../server');
const db = require('../src/models/db');

describe('Note API', () => {
  let token;
  let conferenceId;
  let sessionId;

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

    // Create a session
    const sessResponse = await request(app)
      .post('/api/sessions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        conference_id: conferenceId,
        title: 'Test Session',
        speaker: 'Test Speaker',
        start_time: '2026-01-20T10:00:00',
        end_time: '2026-01-20T11:00:00'
      });

    sessionId = sessResponse.body.id;
  });

  afterAll((done) => {
    db.close(done);
  });

  describe('POST /api/notes', () => {
    it('should create a note linked to a session (status 201)', async () => {
      const response = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          session_id: sessionId,
          user_id: 1, // Assuming user id 1
          content: 'Test note content'
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.content).toBe('Test note content');
    });
  });

  describe('GET /api/notes/:sessionId', () => {
    it('should return all notes for a given session (status 200)', async () => {
      const response = await request(app)
        .get(`/api/notes/${sessionId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});