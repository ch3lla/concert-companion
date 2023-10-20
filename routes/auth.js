const router = require('express').Router();
const axios = require('axios');
const { randomBytes } = require('crypto');

const stateKey = 'spotfy_auth_state';

router.post('/login', (req, res) => {
    const generateRandomString = (length) => {
        return randomBytes(length).toString('base64').slice(0, length);
      };
      
      const state = generateRandomString(16);
      res.cookie(stateKey, state);
      const scope = 'user-read-private user-read-email playlist-read-private user-follow-read user-top-read user-read-recently-played';

      const queryParams = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.CALLBACK_URL,
        state: state,
        scope: scope
    });
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

router.get('/auth/spotify/callback', (req, res) => {
    const code = req.query.code || null;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data:{
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.CALLBACK_URL
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
      },
    })
    .then(response => {
        if (response.status === 200) {
    
          const { access_token, token_type } = response.data;
    
          axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `${token_type} ${access_token}`
            }
          })
            .then(response => {
              res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
            })
            .catch(error => {
              res.send(error);
            });
    
        } else {
          res.send(response);
        }
      })
      .catch(error => {
        res.send(error);
      });
  });

  router.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
      },
    })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.send(error);
      });
});

module.exports = router;