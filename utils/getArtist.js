const router = require('express').Router();
const axios = require('axios');
const {returnToken} = require('./auth');

let artists;
let mainArtist;
router.get('/home', (req, res) => {
    res.render('home');
})
router.post(`/home`, async (req, res) => {
    const performingArtist = req.body.artist;
    res.status(200).send('Request received successfully!');
    try{
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${performingArtist}&type=artist&limit=1&offset=0`, {
            headers: {Authorization: `Bearer ${returnToken()}`}
        });
        const items = await response.data;
        mainArtist = items.artists.items.map(artist => ( {
            _id: artist.id,
            name: artist.name,
            genres: artist.genres
        }));

        const input = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=5&offset=0`, {
            headers: { Authorization: `Bearer ${returnToken()}` }
        });
        const data = await input.data;
        artists = data.items.map(artist => ({
            _id: artist.id,
            name: artist.name,
            genres: artist.genres
        }));
        console.log(artists);
        console.log(mainArtist);
        console.log(seed_artists);
        getTrackData();
        getAudioFeatures();
    } catch (error){
        console.error(error);
    }
});

let tracks;
async function getTrackData(){
    const artistId = mainArtist[0]._id;
    const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=NG`, {
        headers: { Authorization: `Bearer ${returnToken()}` }
    });
    
    const data = await response.data;
    tracks = data.tracks.map(track => ({
        _trackid: track.id,
        name: track.name
    }));
    console.log(tracks);
}

let audioFeaturesResult;
async function getAudioFeatures(){
    try {
        await getTrackData();
        if(tracks.length > 0){
            const _trackid = tracks[0]._trackid;
            const pArtistAudiofeatures = await axios.get(`https://api.spotify.com/v1/audio-features?ids=${_trackid}`, {
                headers: {Authorization: `Bearer ${returnToken()}`}
            });
            audioFeaturesResult = await pArtistAudiofeatures.data;
            const danceability = audioFeaturesResult[danceability];
            const energy = audioFeaturesResult[energy];
            const tempo = audioFeaturesResult[tempo];
        
        } else {
            console.log('No tracks available to fetch audio features.');
        }
    } catch (error){
        console.error(error);
    }
}

function returnFavArtists(){
    return artists;
}



module.exports = {router, returnFavArtists};