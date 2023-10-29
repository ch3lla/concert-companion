const router = require('express').Router();
const axios = require('axios');
const {returnToken} = require('./auth');

let artists;
let mainArtist;
router.get('/home',  async(req, res) => {
    res.render('home', {
        title: 'Page One',
        libs: ['page-one', 'utils'],
        styles: ['page-one']
      });
})
router.get('/home', (req, res) => {
    res.render('home');
})
router.post(`/home`, async (req, res) => {
    const performingArtist = req.body.artist;
    console.log("performingArtist: ", performingArtist);
    try{
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${performingArtist}&type=artist&limit=1&offset=0`, {
            headers: {Authorization: `Bearer ${returnToken()}`}
        });
        const items = await response.data;
        console.log(items);
        mainArtist = items.artists.items.map(artist => ( {
            _id: artist.id,
            name: artist.name,
            genres: artist.genres
        }));

        const res = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=5&offset=0`, {
            headers: { Authorization: `Bearer ${returnToken()}` }
        });
        const data = await res.data;
        console.log(data);
        artists = data.items.map(artist => ({
            _id: artist.id,
            name: artist.name,
            genres: artist.genres
        }));
        console.log(artists);
        console.log(mainArtist);
    } catch (error){
        console.error(error);
    }
});

function returnPerformingArtists(){
    return performingArtist;
}

function returnfavArtists(){
    return artists;
}

module.exports = {router, returnPerformingArtists, returnfavArtists};