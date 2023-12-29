const mongoose = require('mongoose');

const WaitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Waitlist = mongoose.model('waitlist', WaitlistSchema);
module.exports = Waitlist;
