const express = require('express');
const router = express.Router();
// internal
const WaitlistController = require('../db/controllers/waitlist.js');

router.post('/', (req, res) => {
  WaitlistController.addWaitlist(req, res);
});

module.exports = router;
