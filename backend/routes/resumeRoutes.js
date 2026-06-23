const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { parseResumes } = require('../controllers/resumeController');

module.exports = router;

router.post('/parse', upload.array('resumes', 10), parseResumes);

