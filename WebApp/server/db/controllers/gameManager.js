const mongoose = require('mongoose');

const lol = require('../../../lol_access/index.js');
const GameManager = lol.Classes.Game.GameManager;
const LibraryCard = lol.Classes.Card.LibraryCard;
const LibraryEnchantment = lol.Classes.Enchantment.LibraryEnchantment;
const gameProperties = lol.Constants.gameProperties;

const { Card } = require('../models/CardAndEnchantment/Card.js');
const { Enchantment } = require('../models/CardAndEnchantment/Enchantment.js');

const getGameManager = async (req, res) => {
  try {
    const gameManager = await buildGameManager();
    res.status(200).json(gameManager);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error returning game manager' });
  }
};

const buildGameManager = async () => {
  try {
    // get the cards from the database and add to gameManager.cardLibrary
    const cards = await Card.find({}).lean();

    const cardLibrary = cards.map((card) => {
      const newCard = LibraryCard.fromJSON(card);
      return newCard;
    });

    const enchantments = await Enchantment.find({}).lean();

    const enchantmentLibrary = enchantments.map((enchantment) => {
      const newEnchantment = LibraryEnchantment.fromJSON(enchantment);
      return newEnchantment;
    });

    // create an instance of the game manager from LoL
    const gameManager = new GameManager(cardLibrary, enchantmentLibrary);

    return gameManager;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

module.exports = {
  getGameManager,
  buildGameManager,
};
