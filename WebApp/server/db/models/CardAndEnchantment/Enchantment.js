const mongoose = require('mongoose');
const { KeywordSchema } = require('./Keyword');
const { AbilitySchema } = require('./Ability');

const EnchantmentSchema = new mongoose.Schema({
  libraryId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keywords: [KeywordSchema],
  abilities: [AbilitySchema],
  imageName: {
    type: String,
    required: false,
  },
});

const Enchantment = mongoose.model('enchantments', EnchantmentSchema);

module.exports = {
  Enchantment,
};
