const router = require('express').Router();
const axios = require('axios');
const {returnToken} = require('./auth');

let artists;

router.get('/home',  async(req, res) => {
    res.render('home', {
        title: 'Page One',
        libs: ['page-one', 'utils'],
        styles: ['page-one']
      });
})

router.get(`/home?${artists}`, async (req, res) => {

    artists = req.query.artist;
    const artsitsArray = artists.split(',');
    console.log(artsitsArray);

    axios.get(`https://api.spotify.com/v1/search?type=artists&q=${artists}`, {
        headers: {
            Authorization: `${token_type} ${access_token}`
        }
    })
    .then((response => {
        console.log(response);
    }))    
})

router.get('/top/artists', async (req, res) => {
    console.log(returnToken());
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=5&offset=0`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${returnToken()}` }
        });
        const data = await response.json();
        console.log(data);
        artists = data.items.map(artist => ({
            name: artist.name,
            _id: artist.id
        }));
        console.log(artists);
    } catch(error) {
        console.error(error);
    }
});

module.exports = router;