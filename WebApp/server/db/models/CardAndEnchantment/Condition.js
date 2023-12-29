const mongoose = require('mongoose');

const ConditionSchema = new mongoose.Schema({
  conditionType: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
});

module.exports = {
  ConditionSchema,
};
