const Waitlist = require('../models/Waitlist.js');

const addWaitlist = async (req, res) => {
  try {
    const existingEntry = await Waitlist.findOne({ email: req.body.email });

    if (existingEntry) {
      res.status(409).send('Email already in waitlist');
      return;
    }

    const newEntry = new Waitlist({ email: req.body.email });
    await newEntry.save();
    res.status(201).send('Email added to waitlist');
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addWaitlist,
};

