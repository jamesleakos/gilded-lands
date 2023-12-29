const express = require('express');
const router = express.Router();
const passport = require('passport');
// internal
const GameController = require('../db/controllers/gameManager.js');

router.get('/', (req, res) => {
  GameController.getGameManager(req, res);
});

module.exports = router;