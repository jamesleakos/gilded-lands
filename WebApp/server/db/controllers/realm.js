// external
const mongoose = require('mongoose');
const lol = require('../../../lol_access/index.js');
const LibraryRealm = lol.Classes.RealmsAndLand.LibraryRealm;

const GameManager = lol.Classes.Game.GameManager;
const GMManager = require('./gameManager.js');

// internal
const { Realm, DefaultRealm } = require('../models/Realm.js');
const User = require('../models/Users.js');

const createRealm = async (req, res) => {
  try {
    // make sure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    let realmData = req.body;

    // if they didn't send a realm to create then use the default realm
    if (!realmData.biomes) {
      const defaultRealm = await DefaultRealm.findOne({}).lean();

      console.log('defaultRealm', defaultRealm);

      if (!defaultRealm) {
        return res
          .status(500)
          .json({ message: 'Error creating realm - no default realms' });
      } else {
        defaultRealm._id = new mongoose.Types.ObjectId();
        realmData = defaultRealm;
      }
    }

    // do a check on realm validity
    const libraryRealm = LibraryRealm.fromJSON(realmData);

    const gameManager = await GMManager.buildGameManager();

    if (!libraryRealm || !libraryRealm.isRealmValid(gameManager)) {
      return res.status(400).json({ message: 'Invalid realm' });
    }

    console.log('createRealm: library realm is valid: ', libraryRealm);

    // create the new mongoose object and save
    const newRealm = new Realm(realmData);
    newRealm.userId = req.user._id;
    await newRealm.save();

    res.status(201).json(newRealm);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error creating realm', error });
  }
};

const updateRealm = async (req, res) => {
  try {
    // make sure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const realmId = req.params.realm_id;
    const updates = req.body;
    updates.userId = req.user._id;

    // do a check on realm validity
    const realm = LibraryRealm.fromJSON(updates);

    const gameManager = await GMManager.buildGameManager();

    if (!realm || !realm.isRealmValid(gameManager)) {
      return res.status(400).json({ message: 'Invalid realm' });
    }

    console.log('updateRealm: library realm is valid: ', realm);

    // Find the realm by ID and update it with the new data
    const updatedRealm = await Realm.findOneAndUpdate(
      { _id: realmId, userId: req.user._id },
      updates,
      {
        new: true, // This option returns the modified document rather than the original
        runValidators: true, // This option applies the schema's validation rules before updating
      }
    );

    if (!updatedRealm) {
      console.log(
        'could not find realm with id: ',
        realmId,
        ' and user id: ',
        req.user._id,
        ' so creating a new one'
      );
      createRealm(req, res);
      return;
    }

    res.status(200).json(updatedRealm);
  } catch (error) {
    console.log('error updating realm: realm.updateRealm: ', error);
    res.status(500).json({ message: 'Error updating realm', error });
  }
};

const deleteRealm = async (req, res) => {
  try {
    const realmId = req.params.realm_id;
    if (!realmId) {
      return res.status(400).json({ message: 'No realm ID provided' });
    }
    const deletedRealm = await Realm.findOneAndDelete({
      _id: realmId,
      userId: req.user._id,
    });

    if (!deletedRealm) {
      return res.status(404).json({ message: 'Realm not found' });
    } else {
      res.status(200).json(deletedRealm);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting realm', error });
  }
};

// get all the authenticated user's realms
// if the user doesn't have an realms, get the default realms
const getRealmsAPI = async (req, res) => {
  try {
    const realms = await Realm.find({ userId: req.user._id });
    if (!realms) {
      res.status(404).json({ message: 'No realms found' });
    } else if (realms.length === 0) {
      return getDefaultRealmsAPI(req, res);
    } else {
      res.status(200).json(realms);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting realms', error });
  }
};

const getUserRealms = async (user) => {
  try {
    const realms = await Realm.find({
      userId: user._id,
    });
    if (!realms) {
      console.log('ERROR: no realm object');
    } else if (realms.length === 0) {
      console.log('getUserRealms: no realms found, returning default realms');
      return getDefaultRealms();
    } else {
      return realms;
    }
  } catch (error) {
    console.log('Error getting realms', error);
  }
};

const _getRealmByID = async (realmID) => {
  try {
    const realms = await Realm.find({ _id: realmID });
    if (!realms) {
      console.log('ERROR: no realm object');
      return null;
    } else if (realms.length === 0) {
      console.log('no realms found, returning default realm');
      return await getDefaultRealmByID(realmID);
    } else {
      console.log('found realms: ', realms);
      return realms[0];
    }
  } catch (error) {
    console.log('Error getting realm by ID', error);
  }
};

const getDefaultRealmsAPI = async (req, res) => {
  try {
    const realms = await DefaultRealm.find();
    if (!realms) {
      return res.status(404).json({ message: 'No realms found' });
    } else {
      res.status(200).json(realms);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting realms', error });
  }
};

const getDefaultRealms = async () => {
  try {
    const realms = await DefaultRealm.find();
    if (!realms) {
      console.log('ERROR: no realm object');
    } else {
      return realms;
    }
  } catch (error) {
    console.log('Error getting default realms', error);
  }
};

const getDefaultRealmByID = async (realmID) => {
  try {
    const realms = await DefaultRealm.find({ _id: realmID });
    if (!realms) {
      console.log('ERROR: no realm object');
      return null;
    } else if (realms.length === 0) {
      console.log('no default realms found, returning random default realm');
      const defaultRealms = await DefaultRealm.find();
      if (!defaultRealms || defaultRealms.length === 0) {
        console.log('ERROR: no default realms');
        return null;
      }
      return defaultRealms[0];
    } else {
      return realms[0];
    }
  } catch (error) {
    console.log('Error getting realm by ID', error);
  }
};

const getUserSelectedRealm = async (userID) => {
  try {
    const user = await User.findOne({ _id: userID });
    if (!user) {
      throw new Error('User not found');
    } else {
      const realm = await _getRealmByID(user.selectedRealm);
      return realm;
    }
  } catch (error) {
    throw new Error('Error getting user selected realm: ', error);
  }
};

module.exports = {
  createRealm,
  updateRealm,
  deleteRealm,
  getUserRealms,
  getRealmsAPI,
  getUserSelectedRealm,
};
