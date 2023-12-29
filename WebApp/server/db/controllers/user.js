const User = require('../models/Users.js');

const getUserById = async (id) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    console.log('ERROR: User object not found');
  } else if (user.length === 0) {
    console.log('ERROR: No users found');
  } else {
    out = user.toObject();
    out.id = user._id.toString();
    return user;
  }
};

const updateSelectedRealm = async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.user._id },
      { selectedRealm: req.body.realm_id }
    );
    res.status(200).send(result.selectedRealm);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getUserById,
  updateSelectedRealm,
};
