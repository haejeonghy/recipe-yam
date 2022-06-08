const express = require('express');
const app = express();
const cors = require('cors');

const controllers = require('./controllers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
      origin: ['https://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS']
    })
);
app.post('/join', controllers.user.join)
app.post('/login', controllers.user.login)
app.get('/logout', controllers.user.logout)

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
let server = app.listen(HTTPS_PORT, () => console.log(`http server running ${HTTPS_PORT}`));

module.exports = server;