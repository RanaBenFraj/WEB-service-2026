const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const auth = require('../middleware/auth');

// GET /api/sessions/:conferenceId
router.get('/:conferenceId', sessionController.getSessionsByConferenceId);

// POST /api/sessions
router.post('/', auth, sessionController.createSession);

// PUT /api/sessions/:id
router.put('/:id', auth, sessionController.updateSession);

// DELETE /api/sessions/:id
router.delete('/:id', auth, sessionController.deleteSession);

module.exports = router;