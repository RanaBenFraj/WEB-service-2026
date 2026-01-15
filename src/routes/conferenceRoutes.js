const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferenceController');
const auth = require('../middleware/auth');

// GET /api/conferences
router.get('/', conferenceController.getAllConferences);

// GET /api/conferences/:id
router.get('/:id', conferenceController.getConferenceById);

// POST /api/conferences
router.post('/', auth, conferenceController.createConference);

// PUT /api/conferences/:id
router.put('/:id', auth, conferenceController.updateConference);

// DELETE /api/conferences/:id
router.delete('/:id', auth, conferenceController.deleteConference);

module.exports = router;