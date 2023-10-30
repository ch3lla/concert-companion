const axios = require('axios');
const {returnToken} = require('./auth');
const {returnFavArtists} = require('./getArtist');

let artistIds = returnFavArtists();
let seed_artists = artistIds.map(artist => artist._id);
console.log(seed_artists);
async function getRecommendation(){
    const response = axios.getAdapter(`
    https://api.spotify.com/v1/?seed_artists=${seed_artists}`, {
        headers: {Authorization: `Bearer ${returnToken()}`}
    })
    const data = response.data;
    
}