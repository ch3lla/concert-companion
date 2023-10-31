const router = require('express').Router();
const axios = require('axios');
const {returnToken} = require('./auth');
const getAudioFeatures = require('./getAudioFeatures');
const getRecommendation = require('./recommendation');

let artists;
let mainArtist;
let token;

router.get('/home', (req, res) => {
    res.render('home');
})

router.post(`/home`, async (req, res) => {
    token = await returnToken();
    const performingArtist = req.body.artist;
    res.status(200).send('Request received successfully!');
    try{
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${performingArtist}&type=artist&limit=1&offset=0`, {
            headers: {Authorization: `Bearer ${token}`}
        });
        const items = await response.data;
        mainArtist = items.artists.items.map(artist => ( {
            _id: artist.id,
            name: artist.name,
            genres: artist.genres
        }));

        const input = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=5&offset=0`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await input.data;
        artists = data.items.map(artist => ({
            _id: artist.id,
            name: artist.name,
            genres: artist.genres
        }));
        const artistIds = artists.map(item => item._id);
        console.log(artists);
        console.log(mainArtist);
        const artistId = mainArtist[0]._id;
        const favArtist = artists[0]._id;
        const recommended_data = getRecommendation(artistIds, token);
        //const audioFeatures = await getAudioFeatures(artistId, token);

    } catch (error){
        console.error(error);
    }
});
module.exports = router;