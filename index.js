require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieSession = require('cookie-session');
const session = require('express-session');
const {passport, router} = require('./utils/auth');
const favArtistRoute = require('./utils/get_new_fav_artist');

// middleware
app.use(session({
    secret: 'spotify-auth-session',
    resave: false,
    saveUnintialized: false
}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
app.use(favArtistRoute);

// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});



app.listen(8080, () => {
    console.log('Server is running on port 8080')
})