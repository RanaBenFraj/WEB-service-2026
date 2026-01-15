const db = require('../models/db');

const getAllConferences = (req, res) => {
  db.all('SELECT * FROM conferences', (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching conferences', error: err.message });
    }
    res.json(rows);
  });
};

const getConferenceById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM conferences WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching conference', error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Conference not found' });
    }
    res.json(row);
  });
};

const createConference = (req, res) => {
  const { title, description, start_date, end_date } = req.body;
  db.run(
    'INSERT INTO conferences (title, description, start_date, end_date) VALUES (?, ?, ?, ?)',
    [title, description, start_date, end_date],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error creating conference', error: err.message });
      }
      res.status(201).json({ id: this.lastID, title, description, start_date, end_date });
    }
  );
};

const updateConference = (req, res) => {
  const { id } = req.params;
  const { title, description, start_date, end_date } = req.body;
  db.run(
    'UPDATE conferences SET title = ?, description = ?, start_date = ?, end_date = ? WHERE id = ?',
    [title, description, start_date, end_date, id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error updating conference', error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Conference not found' });
      }
      res.json({ message: 'Conference updated successfully' });
    }
  );
};

const deleteConference = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM conferences WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting conference', error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Conference not found' });
    }
    res.json({ message: 'Conference deleted successfully' });
  });
};

module.exports = { getAllConferences, getConferenceById, createConference, updateConference, deleteConference };