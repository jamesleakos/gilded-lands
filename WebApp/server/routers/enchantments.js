const express = require('express');
const router = express.Router();
const passport = require('passport');
// internal
const EnchantmentController = require('../db/controllers/enchantment.js');

router.get('/', (req, res) => {
  EnchantmentController.getEnchantments(req, res);
});

router.post('/', (req, res) => {
  EnchantmentController.createEnchantment(req, res);
});

router.post('/:libraryId', (req, res) => {
  EnchantmentController.editEnchantment(req, res);
});

router.delete('/:libraryId', (req, res) => {
  EnchantmentController.deleteEnchantment(req, res);
});

module.exports = router;
