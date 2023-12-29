const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'player',
  },
  selectedRealm: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
