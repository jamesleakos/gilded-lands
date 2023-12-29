const mongoose = require('mongoose');

const PayResourceCostSchema = new mongoose.Schema({
  statId: Number,
  value: Number,
});

module.exports = {
  PayResourceCostSchema,
};
