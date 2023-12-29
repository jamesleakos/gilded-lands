const mongoose = require('mongoose');
const { EffectSchema } = require('./Effect');
const { PayResourceCostSchema } = require('./PayResourceCost');

const AbilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  effect: EffectSchema,
  useableInPhases: [String],
  indexForUpgrades: {
    type: Number,
    required: false,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  costs: [PayResourceCostSchema],
  usesPerTurn: {
    type: Number,
    required: false,
  },
});

module.exports = {
  AbilitySchema,
};
