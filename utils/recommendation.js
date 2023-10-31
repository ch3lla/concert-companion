const axios = require('axios');

async function getRecommendation(artistIds, token){
    /* const response = await axios.get(`
    https://api.spotify.com/v1/recommendations?limit=1&market=NG&seed_artists=${artistId}&seed_trcaks=${trackId}`, {
        headers: {Authorization: `Bearer ${token}`}
    })
    const data = response.data;
    console.log("Recommendation data: ", data); */
    
    const requests = artistIds.map(artistId => {
        return axios.get(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      });
      const responses = await Promise.all(requests);
      const allArtistNames = [];
      for (const response of responses) {
        if (response.status === 200) {
          console.log(`Response for artist ID ${response.request.path}:`, response.data);
          const artistNames = response.data.artists.map(artist => artist.name);
            allArtistNames.push(...artistNames);
        } else {
          console.error(`Error for artist ID ${response.request.path}:`, response.statusText);
        }
      }   
      console.log("All artist names:", allArtistNames);
    
    // const data = response.data;
    // console.log("recommendation: ", data);
}

module.exports = getRecommendation;