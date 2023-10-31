const axios = require('axios');

async function getAudioFeatures(artistId, token){
    let tracks;
    let audiofeaturesResult;
    //let token = returnToken();
    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=NG`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.data;
        tracks = data.tracks.map(track => ({
            _trackid: track.id,
            name: track.name
        }));
        console.log(tracks);

        if (tracks.length > 0){
            const trackIds = tracks.map(item => item._trackid);
            const encodedTrackIds = trackIds.map(trackId => encodeURIComponent(trackId));
            const pArtistAudiofeatures = axios.get(`https://api.spotify.com/v1/audio-features?ids=${encodedTrackIds}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            audiofeaturesResult = await pArtistAudiofeatures.data;
            console.log(audiofeaturesResult);
        } else {
            console.error('No tracks available to fetch audio features.');
        }
    } catch (error){
        console.error(error);
    }
    return audiofeaturesResult;
}

module.exports = getAudioFeatures;