const router = require('express').Router();
const axios = require('axios');

let artists;

router.get('/home',  async(req, res) => {
    res.render('home', {
        title: 'Page One',
        libs: ['page-one', 'utils'],
        styles: ['page-one']
      });
})

// document.getElementById('artistForm').addEventListener('submit', function (event) {
//     event.preventDefault(); // Prevent the form submission
//     const artistsInput = document.getElementById('artist');
//     const artists = artistsInput.value.split(',').map(artist => artist.trim());      
//     console.log(artists);    
//     if (artists.length < 2 || artists.length > 4) {
//         alert('Please enter between 2 and 4 artists.');
//     }
// });

router.get(`/home?${artists}`, async (req, res) => {

    artists = req.query.artist;
    const artsitsArray = artists.split(',');
    console.log(artsitsArray);

    axios.get(`https://api.spotify.com/v1/search?type=artists&q=${artists}`, {
        headers: {
            Authorization: `${token_type} ${access_token}`
        }
    })
    .then((response => {
        console.log(response);
    }))
    // axios.get(`https://api.spotify.com/v1/artists?ids=${artists}`, {
    //     headers: {
    //         Authorization: `${token_type} ${access_token}`
    //     }
    // })
    
})

function formatJsonData(jsonData){
    const artistsList = jsonData.artists;
    const items = artistsList.items;
    const ids = [];

    for (const item of items) {
        const artistId = item.id;
        ids.push(artistId);
      }
    
      return ids;
}

router.get('/artists/{:id}', async (req, res) => {
    axios.get("https://api.spotify.com/v1/me/shows?offset=0&limit=5")
    .then(res => {
        response.data(res);
    })
    .catch(error => {
        res.send(error);
    });
})

module.exports = router;