const router = require('express').Router();
const axios = require('axios');
const {returnToken} = require('./auth');
const getRecommendation = require('./recommendation');
const binarySearch = require('./binarySearch');


// global variables
let artists;
let mainArtist;
let token;

function mapArtistData(data) {
    return data.items.map(artist => ({
        _id: artist.id,
        name: artist.name,
        genres: artist.genres,
    }));
}

router.get('/home', (req, res) => {
    res.render('home');
})

router.post(`/home`, async (req, res) => {
    
    //res.status(200).send('Request received successfully!');
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

        mainArtist = mapArtistData(mainArtistResponse.data);
        artists = mapArtistData(artistsResponse.data);

        const artistNames = artists.map(item => item.name);
        const p_artist = mainArtist.map(item => item.name).join(' ');

        const artistIds = artists.map(item => item._id);
        const recommendedData = await getRecommendation(artistIds, token);
        const relatedArtists = recommendedData.sort();
        const favArtists = artistNames.sort();
        console.log(relatedArtists);

        const index = binarySearch(relatedArtists, p_artist);
        const answer = binarySearch(favArtists, p_artist);
        console.log("index: ", index, "answer: ", answer);


        if (index !== -1){
            const randomNum = Math.floor(Math.random() * (70 - 65 + 1)) + 65;
            const p_artistDetails = mainArtistResponse.data.artists.items.map(item => ({
                external_urls: item.external_urls,
                followers: item.followers,
                genres: item.genres,
                href: item.href,
                id: item.id,
                images: item.images,
                name: item.name,
                popularity: item.popularity,
                type: item.type,
                uri: item.uri
            }));
            res.render('result', {randomNum, p_artistDetails});
        } else if (answer !== -1){
            console.log(`Artist ${p_artist} found at index ${answer}.`);
            const artistsResponseDetails = artistsResponse.data.items;
            const artistsDetails = artistsResponseDetails.find(artist => artist.name == p_artist);
            console.log("artistsdeets --- ", artistsDetails);
        } else{
            console.log(`Artist ${p_artist} not found in the list.`);
        }
    } catch (error){
        console.error(error);
    }
});
module.exports = router;