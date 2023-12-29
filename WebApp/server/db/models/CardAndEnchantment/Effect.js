const mongoose = require('mongoose');

const EffectSchema = new mongoose.Schema({
  effectType: {
    type: String,
    required: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
});

module.exports = {
  EffectSchema,
};
