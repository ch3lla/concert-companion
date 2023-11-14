const axios = require('axios');

async function getRecommendation(artistIds, token){
    const relatedArtistNames = [];
    const requests = artistIds.map(artistId => {
        return axios.get(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      });
      const responses = await Promise.all(requests);
      for (const response of responses) {
        if (response.status === 200) {
           const currentArtistNames = response.data.artists.map(artist => artist.name);
            relatedArtistNames.push(...currentArtistNames);
        } else {
          console.error(`Error for artist ID ${response.request.path}:`, response.statusText);
        }
      }
      return relatedArtistNames;
}

module.exports = getRecommendation;