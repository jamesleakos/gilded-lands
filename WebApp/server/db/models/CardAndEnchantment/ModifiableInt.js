const mongoose = require('mongoose');

const ModifiableIntSchema = new mongoose.Schema({
  baseValue: {
    type: Number,
    required: true
  },
});

module.exports = {
  ModifiableIntSchema,
};