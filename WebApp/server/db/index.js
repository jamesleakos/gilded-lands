require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

// to connect to mongoDB Atlas
// const mongoURI = `mongodb+srv://${process.env.MONGO_CLOUD_ATLAS_USER}:${process.env.MONGO_CLOUD_ATLAS_PASSWORD}@${process.env.MONGO_CLOUD_ATLAS_URL}/${process.env.MONGO_CLOUD_ATLAS_DB}`;
// to connect to local mongoDB
const mongoURI = `mongodb://localhost:27017/${process.env.MONGO_LOCAL_DB}`;

// for auth
const sessionMiddleware = session({
  secret: 'very secret this is',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: mongoURI }),
});

// for db connection
const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

db.then((db) => console.log(`Connected to: ${mongoURI}`)).catch((err) => {
  console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
  console.log(err);
});

module.exports = { db, sessionMiddleware };
