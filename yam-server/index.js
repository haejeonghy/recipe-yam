const express = require('express');
const app = express();
const cors = require('cors');

const session = require('express-session');
const controllers = require('./controllers');

app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        domain: "localhost",
        path: "/",
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: "none",
        httpOnly: true,
        secure: true,
      },
    })
  );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post('/join', controllers.user.join)
app.post('/login', controllers.user.login)
app.post('/logout', controllers.user.logout)
app.post('/modify', controllers.user.modify)

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
let server = app.listen(HTTPS_PORT, () => console.log(`http server running ${HTTPS_PORT}`));

module.exports = server;