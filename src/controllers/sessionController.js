const db = require('../models/db');

const getSessionsByConferenceId = (req, res) => {
  const { conferenceId } = req.params;
  db.all('SELECT * FROM sessions WHERE conference_id = ?', [conferenceId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching sessions', error: err.message });
    }
    res.json(rows);
  });
};

const createSession = (req, res) => {
  const { conference_id, title, speaker, start_time, end_time } = req.body;
  db.run(
    'INSERT INTO sessions (conference_id, title, speaker, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
    [conference_id, title, speaker, start_time, end_time],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error creating session', error: err.message });
      }
      res.status(201).json({ id: this.lastID, conference_id, title, speaker, start_time, end_time });
    }
  );
};

const updateSession = (req, res) => {
  const { id } = req.params;
  const { conference_id, title, speaker, start_time, end_time } = req.body;
  db.run(
    'UPDATE sessions SET conference_id = ?, title = ?, speaker = ?, start_time = ?, end_time = ? WHERE id = ?',
    [conference_id, title, speaker, start_time, end_time, id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error updating session', error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Session not found' });
      }
      res.json({ message: 'Session updated successfully' });
    }
  );
};

const deleteSession = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM sessions WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting session', error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json({ message: 'Session deleted successfully' });
  });
};

module.exports = { getSessionsByConferenceId, createSession, updateSession, deleteSession };