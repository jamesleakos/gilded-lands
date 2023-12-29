const mongoose = require('mongoose');
const { PayResourceCostSchema } = require('./PayResourceCost');
const { DeckRequirementSchema } = require('./DeckRequirement');
const { KeywordSchema } = require('./Keyword');
const { AbilitySchema } = require('./Ability');

const CardSchema = new mongoose.Schema({
  libraryId: {
    type: Number,
    required: true,
    unique: true,
  },
  cardTypeId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  biomeType: {
    type: String,
    required: true,
  },
  biomeDepth: {
    type: String,
    required: true,
  },
  cardText: {
    type: String,
    required: false,
  },
  imageName: {
    type: String,
    required: false,
  },
  attack: {
    type: Number,
    required: true,
  },
  health: {
    type: Number,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  // use cost schema
  costs: [PayResourceCostSchema],
  deckRequirements: [DeckRequirementSchema],
  keywords: [KeywordSchema],
  abilities: [AbilitySchema],
  cardUpgrades: [mongoose.Schema.Types.Mixed],
});

const Card = mongoose.model('cards', CardSchema);

module.exports = {
  Card,
};
