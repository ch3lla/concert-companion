require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const {passport, router} = require('./utils/auth');
const artistRouter = require('./routes/getArtist');


app.set('view engine', 'ejs');
// middleware
app.use(session({
    secret: 'spotify-auth-session',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(passport.initialize());
app.use(passport.session());


app.use(router);
app.use(artistRouter);

// routes
app.get('/', (req, res) => {
    res.render('login');
});

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})