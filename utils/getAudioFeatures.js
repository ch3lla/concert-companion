const axios = require('axios');
const {returnPerformingArtist, returnFavArtists} = require('./getArtist');

async function getAudioFeatures(artistId, accessToken){
    const pArtist = returnPerformingArtist();
    const pArtistId = pArtist._id;
    const pArtistAudiofeatures = axios.get(`https://api.spotify.com/v1/audio-features?ids=${pArtistId}`, {
        headers: {Authorization: `Bearer ${accessToken}`}
    });
    const audiofeaturesResult = await pArtistAudiofeatures.data;
    console.log(audiofeaturesResult);
    
    const fArtist = returnFavArtists();
    const fArtistId = fArtist._id;

    const fArtistAudiofeatures = axios.get(`https://api.spotify.com/v1/audio-features?ids=${fArtistId}`, {
        headers: {Authorization: `Bearer ${accessToken}`}
    });
    const FAudiofeaturesResult = await fArtistAudiofeatures.data;
    console.log(FAudiofeaturesResult);
}