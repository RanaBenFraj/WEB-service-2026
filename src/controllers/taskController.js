const db = require('../models/db');

const getTasksByUserId = (req, res) => {
  const { userId } = req.params;
  db.all('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching tasks', error: err.message });
    }
    res.json(rows);
  });
};

const createTask = (req, res) => {
  const { note_id, user_id, description, status } = req.body;
  db.run(
    'INSERT INTO tasks (note_id, user_id, description, status) VALUES (?, ?, ?, ?)',
    [note_id, user_id, description, status || 'pending'],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error creating task', error: err.message });
      }
      res.status(201).json({ id: this.lastID, note_id, user_id, description, status: status || 'pending' });
    }
  );
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { note_id, user_id, description, status } = req.body;
  db.run(
    'UPDATE tasks SET note_id = ?, user_id = ?, description = ?, status = ? WHERE id = ?',
    [note_id, user_id, description, status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error updating task', error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task updated successfully' });
    }
  );
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting task', error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
};

module.exports = { getTasksByUserId, createTask, updateTask, deleteTask };