const express = require('express');
const router = express.Router();
const passport = require('passport');
// internal
const CardController = require('../db/controllers/card.js');

router.get('/', (req, res) => {
  CardController.getCards(req, res);
});

router.post('/', (req, res) => {
  CardController.createCard(req, res);
});

router.post('/:libraryId', (req, res) => {
  CardController.editCard(req, res);
});

router.delete('/:libraryId', (req, res) => {
  CardController.deleteCard(req, res);
});

module.exports = router;
