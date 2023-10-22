const router = require('express').Router();
const axios = require('axios');

let artists;
router.get('/artists/{:id}', async (req, res) => {
    axios.get("https://api.spotify.com/v1/me/shows?offset=0&limit=5")
    .then(res => {
        response.data(res);
    })
    .catch(error => {
        res.send(error);
    });
})

router.get(`/submit-artists?${artists}`, async (req, res) => {
    artists = req.query.artist;
    const artsitsArray = artists.split(',')
})
module.exports = router;