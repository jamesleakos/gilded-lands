require('dotenv').config();
// THIS IS NEEDED to call the db file even if we don't use the output
const { db, sessionMiddleware } = require('./db');

const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('./passport/setup.js');

// getting the server going
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

// routers
const authRouter = require('./routers/auth.js');
const realmRouter = require('./routers/realms.js');
const waitlistRouter = require('./routers/waitlist.js');
const cardRouter = require('./routers/cards.js');
const enchantmentRouter = require('./routers/enchantments.js');
const gameRouter = require('./routers/game.js');

// this gives the restful API access to the session
app.use(sessionMiddleware);
// this gives the socket.io access to the session
io.engine.use(sessionMiddleware);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// body interpreters
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(cors({ origin: '*' }));

// restful routes
app.use('/auth', authRouter);
app.use('/realms', realmRouter);
app.use('/waitlist', waitlistRouter);
app.use('/cards', cardRouter);
app.use('/enchantments', enchantmentRouter);
app.use('/game', gameRouter);

// io handlers
const pregameHandler = require('./ioHandlers/pregameHandler.js');
// register the io handlers
io.on('connection', (socket) => {
  pregameHandler(io, socket);
});

// send the FE files
app.use(express.static(path.join(__dirname, '../client/dist')));

// return other entered routes
app.get('/*', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../client/dist/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on ${PORT}`));
