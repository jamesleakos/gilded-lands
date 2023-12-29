const mongoose = require('mongoose');

const lol = require('../../../lol_access/index.js');
const LibraryEnchantment = lol.Classes.Enchantment.LibraryEnchantment;

const { Enchantment } = require('../models/CardAndEnchantment/Enchantment.js');

const getEnchantments = async (req, res) => {
  try {
    const enchantments = await Enchantment.find({}).lean();
    res.status(200).json(enchantments);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error returning enchantments' });
  }
};

const getEnchantmentsInternal = async () => {
  try {
    const enchantments = await Enchantment.find({}).lean();
    return enchantments;
  } catch (error) {
    throw error;
  }
};

const createEnchantment = async (req, res) => {
  try {
    // make sure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const enchantmentData = {
      name: 'new enchantment',
      description: 'Sample Enchantment Text',
      keywords: [],
      abilities: [],
      imageName: '',
    };
    const lastEnchantment = await Enchantment.find()
      .sort({ libraryId: -1 })
      .limit(1);
    const libraryId =
      lastEnchantment && lastEnchantment.length > 0
        ? lastEnchantment[0].libraryId + 1
        : 0;
    const enchantment = new Enchantment({
      libraryId: libraryId,
      ...enchantmentData,
    });
    await enchantment.save();
    res.status(200).json(enchantment);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error creating or editing enchantment' });
  }
};

const editEnchantment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const libraryId = req.params.libraryId;
    if (!libraryId) {
      return res.status(400).json({ message: 'No libraryId provided' });
    }
    const updates = req.body;

    if (!LibraryEnchantment.isLibraryJSONValid(updates)) {
      return res.status(400).json({ message: 'Enchantment is not valid' });
    }

    const enchantment = await Enchantment.findOneAndUpdate(
      { libraryId: libraryId },
      updates,
      { new: true, runValidators: true }
    );
    res.status(200).json(enchantment);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error creating or editing enchantment' });
  }
};

const deleteEnchantment = async (req, res) => {
  try {
    // make sure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const libraryId = req.params.libraryId;
    if (!libraryId) {
      return res.status(400).json({ message: 'No libraryId provided' });
    }
    await Enchantment.findOneAndDelete({ libraryId: libraryId });
    res.status(200).json({ message: 'Enchantment deleted' });
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error deleting enchantment' });
  }
};

module.exports = {
  getEnchantments,
  getEnchantmentsInternal,
  createEnchantment,
  editEnchantment,
  deleteEnchantment,
};
