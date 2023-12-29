const express = require('express');
const router = express.Router();
const passport = require('passport');
// internal
const RealmController = require('../db/controllers/realm.js');
const UserController = require('../db/controllers/user.js');

router.get('/', (req, res) => {
  RealmController.getRealmsAPI(req, res);
});

router.post('/', (req, res) => {
  RealmController.createRealm(req, res);
});

router.put('/:realm_id', (req, res) => {
  if (!req.query.realm_id) req.query.realm_id = req.params.realm_id;
  RealmController.updateRealm(req, res);
});

router.patch('/selected-realm', (req, res) => {
  UserController.updateSelectedRealm(req, res);
});

router.delete('/:realm_id', (req, res) => {
  if (!req.query.realm_id) req.query.realm_id = req.params.realm_id;
  RealmController.deleteRealm(req, res);
});

module.exports = router;
