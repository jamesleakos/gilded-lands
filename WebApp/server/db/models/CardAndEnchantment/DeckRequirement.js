const mongoose = require('mongoose');

const DeckRequirementSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  reqValues: [{
    key: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }]
});


module.exports = {
  DeckRequirementSchema,
};