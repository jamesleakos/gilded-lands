const mongoose = require('mongoose');

const lol = require('../../../lol_access/index.js');
const LibraryCard = lol.Classes.Card.LibraryCard;
const GameProperties = lol.Classes.Game.GameProperties;

const { Card } = require('../models/CardAndEnchantment/Card.js');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).lean();
    res.status(200).json(cards);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error returning cards' });
  }
};

const getCardsInternal = async () => {
  try {
    const cards = await Card.find({}).lean();
    return cards;
  } catch (error) {
    throw error;
  }
};

const createCard = async (req, res) => {
  try {
    // make sure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const cardData = {
      cardTypeId: 0,
      name: 'new card',
      biomeType: 'forest',
      biomeDepth: 'all',
      cardText: 'Sample Card Text',
      imageName: '',
      attack: 1,
      health: 1,
      priority: 1,
      costs: [],
      deckRequirements: [],
      keywords: [],
      abilities: [],
      cardUpgrades: [],
    };
    const lastCard = await Card.find().sort({ libraryId: -1 }).limit(1);
    const libraryId =
      lastCard && lastCard.length > 0 ? lastCard[0].libraryId + 1 : 0;
    const card = new Card({ libraryId: libraryId, ...cardData });
    await card.save();
    res.status(200).json(card);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error creating or editing card' });
  }
};

const editCard = async (req, res) => {
  try {
    // make sure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const libraryId = req.params.libraryId;
    if (!libraryId) {
      return res.status(400).json({ message: 'No libraryId provided' });
    }
    const updates = req.body;
    console.log('updates: ', JSON.stringify(updates));

    for (let ability of updates.abilities) {
      console.log('ability: ', ability);
    }

    // check card validity
    if (!LibraryCard.isLibraryJSONValid(updates)) {
      for (let ability of updates.abilities) {
        console.log('ability: ', JSON.stringify(ability));
      }
      return res.status(400).json({ message: 'Card is not valid' });
    }

    // find the card and update it
    const card = await Card.findOneAndUpdate(
      { libraryId: libraryId },
      updates,
      { new: true, runValidators: true }
    );
    console.log('card: ', card);
    res.status(200).json(card);
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error creating or editing card' });
  }
};

const deleteCard = async (req, res) => {
  try {
    // make sure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const libraryId = req.params.libraryId;
    if (!libraryId) {
      return res.status(400).json({ message: 'No libraryId provided' });
    }
    console.log('libraryId: ', libraryId);
    await Card.findOneAndDelete({ libraryId: libraryId });
    res.status(200).json({ message: 'Card deleted' });
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ message: 'Error deleting card' });
  }
};

module.exports = {
  getCards,
  getCardsInternal,
  createCard,
  editCard,
  deleteCard,
};
