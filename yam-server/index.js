const express = require('express');
const app = express();

const session = require('express-session');
const controllers = require('./controllers');

app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: true
    })
  );
app.use(express.json({
  limit: '1mb'
}))
app.use(express.urlencoded({
  limit: '1mb',
  extended: false
}))

const cors = require('cors');
const corsOptions = {
    origin: true,
    credentials: true
};

app.use(cors(corsOptions));
app.use("/images", express.static(`images`));

app.post('/join', controllers.user.join)
app.post('/login', controllers.user.login)
app.post('/logout', controllers.user.logout)
app.post('/modify', controllers.user.modify)

app.post('/write', controllers.post.write)
app.post('/update', controllers.post.update)
app.get('/read', controllers.post.read)
app.get('/remove', controllers.post.remove)
app.get('/search', controllers.post.search)

app.get('/tags', controllers.tag.tags)

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
let server = app.listen(HTTPS_PORT, () => console.log(`http server running ${HTTPS_PORT}`));

module.exports = server;