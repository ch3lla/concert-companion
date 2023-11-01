const router = require('express').Router();
const axios = require('axios');
const {returnToken} = require('./auth');
const getAudioFeatures = require('./getAudioFeatures');
const getRecommendation = require('./recommendation');
const binarySearch = require('./binarySearch');

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
        const artistNames = artists.map(item => item.name);
        const pArtist = mainArtist.map(item => item.name);
        const p_artist = pArtist.join(' ');
        const recommendedData = await getRecommendation(artistIds, token);
        const relatedArtists = recommendedData.sort();
        const favArtists = artistNames.sort();
        console.log(relatedArtists);
        //const audioFeatures = await getAudioFeatures(artistId, token);

        const index = binarySearch(relatedArtists, p_artist);
        const answer = binarySearch(favArtists, p_artist);
        console.log("index: ", index, "answer: ", answer);

        if (index != -1 && answer != -1){
            console.log(`Artist ${p_artist} found at index ${index}.`);
        } else {
            console.log(`Artist ${p_artist} not found in the list.`);
        }

    } catch (error){
        console.error(error);
    }
});
module.exports = router;