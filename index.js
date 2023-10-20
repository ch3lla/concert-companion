require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieSession = require('cookie-session');
const authRoute = require('./routes/auth');

// middleware
app.use(cookieSession({
    name: 'spotify-auth-session',
    keys: ['key1', 'key2']
}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoute);

// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});



app.listen(8080, () => {
    console.log('Server is running on port 8080')
})