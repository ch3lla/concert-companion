const router = require('express').Router();
const axios = require('axios');
const {returnToken} = require('../utils/auth');
const getRecommendation = require('../utils/recommendation');
const binarySearch = require('../helpers/binarySearch');
const {mapArtistData, mapArtistDetails} = require('../helpers/mapping');


// global variables
let artists;
let mainArtist;
let token;

router.get('/home', (req, res) => {
    res.render('home');
})

router.post(`/home`, async (req, res) => {
    try{
        token = await returnToken();
        const performingArtist = req.body.artist;
        const [mainArtistResponse, artistsResponse] = await Promise.all([
            await axios.get(`https://api.spotify.com/v1/search?q=${performingArtist}&type=artist&limit=1&offset=0`, {
            headers: {Authorization: `Bearer ${token}`}
        }),
        axios.get(`https://api.spotify.com/v1/me/top/artists?limit=5&offset=0`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        ]);

        if (mainArtistResponse.status !== 200 || artistsResponse.status !== 200){
            return res.status(500).send('Failed to retrive data from Spotify.');
        }

        mainArtist = mapArtistData(mainArtistResponse.data.artists);
        artists = mapArtistData(artistsResponse.data);

        const artistNames = artists.map(item => item.name);
        const performingArtistName = mainArtist.map(item => item.name).join(' ');

        const artistIds = artists.map(item => item._id);
        const recommendedData = await getRecommendation(artistIds, token);
        const relatedArtists = recommendedData.sort();
        const favArtists = artistNames.sort();

        const index = binarySearch(relatedArtists, performingArtistName);
        const answer = binarySearch(favArtists, performingArtistName);


        if (index !== -1){
            const randomNum = Math.floor(Math.random() * (70 - 65 + 1)) + 65;
            const performingArtistDetails = mainArtistResponse.data.artists.items.map(mapArtistDetails);
            res.render('result', {randomNum, performingArtistDetails});
        } else if (answer !== -1){
            const artistDetails = artistsResponse.data.items.filter((artist) => artist.name === performingArtistName);
            res.render('result', {artistDetails, performingArtistDetails: null});
        } else{
            console.log(`Artist ${performingArtistName} not found in the list.`);
            const randomNum = Math.floor(Math.random() * (42 - 23 + 1)) + 23;
            const performingArtistDetails = mainArtistResponse.data.artists.items.map(mapArtistDetails);
            res.render('result', {randomNum, performingArtistDetails});
        }
    } catch (error){
        console.error(error);
    }
});
module.exports = router;