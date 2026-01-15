const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../middleware/auth');

// GET /api/notes/:sessionId
router.get('/:sessionId', noteController.getNotesBySessionId);

// POST /api/notes
router.post('/', auth, noteController.createNote);

// DELETE /api/notes/:id
router.delete('/:id', auth, noteController.deleteNote);

module.exports = router;