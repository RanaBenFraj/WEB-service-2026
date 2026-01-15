const request = require('supertest');
const app = require('../server');
const db = require('../src/models/db');

describe('Task API', () => {
  let token;
  let conferenceId;
  let sessionId;
  let noteId;
  let taskId;

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

    // Create a note
    const noteResponse = await request(app)
      .post('/api/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        session_id: sessionId,
        user_id: 1,
        content: 'Test note content'
      });

    noteId = noteResponse.body.id;

    // Create a task
    const taskResponse = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        note_id: noteId,
        user_id: 1,
        description: 'Test task description',
        status: 'pending'
      });

    taskId = taskResponse.body.id;
  });

  afterAll((done) => {
    db.close(done);
  });

  describe('POST /api/tasks', () => {
    it('should create a task linked to a note (status 201)', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          note_id: noteId,
          user_id: 1,
          description: 'Another test task',
          status: 'pending'
        })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.description).toBe('Another test task');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update task status to "completed" (status 200)', async () => {
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          note_id: noteId,
          user_id: 1,
          description: 'Test task description',
          status: 'completed'
        })
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Task updated successfully');
    });
  });

  describe('GET /api/tasks/:userId', () => {
    it('should return all tasks for a given user (status 200)', async () => {
      const response = await request(app)
        .get('/api/tasks/1')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});