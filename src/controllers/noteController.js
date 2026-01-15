const db = require('../models/db');

const getNotesBySessionId = (req, res) => {
  const { sessionId } = req.params;
  db.all('SELECT * FROM notes WHERE session_id = ?', [sessionId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching notes', error: err.message });
    }
    res.json(rows);
  });
};

const createNote = (req, res) => {
  const { session_id, user_id, content } = req.body;
  db.run(
    'INSERT INTO notes (session_id, user_id, content) VALUES (?, ?, ?)',
    [session_id, user_id, content],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error creating note', error: err.message });
      }
      res.status(201).json({ id: this.lastID, session_id, user_id, content });
    }
  );
};

const deleteNote = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM notes WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting note', error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  });
};

module.exports = { getNotesBySessionId, createNote, deleteNote };