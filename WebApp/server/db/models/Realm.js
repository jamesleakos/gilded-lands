const mongoose = require('mongoose');

const LandTileSchema = new mongoose.Schema({
  id: Number,
  x: Number,
  y: Number,
  z: Number,
  depth: Number,
  landType: String,
});

const CardSchema = new mongoose.Schema({
  libraryID: Number,
  amount: Number,
});

const BiomeSchema = new mongoose.Schema({
  biomeType: String,
  biomeDepth: String,
  cards: [CardSchema],
  landTiles: [LandTileSchema],
  subBiomes: [this],
});

const RealmSchema = new mongoose.Schema({
  // user id is a object id
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  biomes: [BiomeSchema],
});

const DefaultRealmSchema = new mongoose.Schema({
  name: String,
  biomes: [BiomeSchema],
});

const Realm = mongoose.model('realms', RealmSchema);
const DefaultRealm = mongoose.model('defaultrealms', DefaultRealmSchema);

module.exports = {
  Realm,
  DefaultRealm,
};
