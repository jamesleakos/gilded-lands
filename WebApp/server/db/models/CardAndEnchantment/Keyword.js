const mongoose = require('mongoose');
const ConditionSchema = require('./Condition');

const KeywordSchema = new mongoose.Schema({
  keywordType: {
    type: String,
    required: true,
  },
  indexForUpgrades: {
    type: Number,
    required: true,
  },
  designerDescription: {
    type: String,
    required: true,
  },
  isPermanent: {
    type: Boolean,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  startsActive: {
    type: Boolean,
    required: true,
  },
  conditions: [ConditionSchema],
  imageName: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
});

module.exports = {
  KeywordSchema,
};
