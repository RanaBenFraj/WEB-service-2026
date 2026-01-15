const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// GET /api/tasks/:userId
router.get('/:userId', taskController.getTasksByUserId);

// POST /api/tasks
router.post('/', auth, taskController.createTask);

// PUT /api/tasks/:id
router.put('/:id', auth, taskController.updateTask);

// DELETE /api/tasks/:id
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;