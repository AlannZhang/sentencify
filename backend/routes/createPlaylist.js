const router = require('express').Router();
const axios = require('axios');

router.post('/:userId', (async (req, res) => {
  try {
    const reqParams = {
      method: 'post',
      url: `https://api.spotify.com/v1/users/${req.params.userId}/playlists`,
      headers: {
        'Authorization': `Bearer ${req.body.token}`,
      },
      data: {
        'name': `${req.body.formData}`,
        'description': 'Playlist generated from the sentencify app',
        'public': true,
      }
    };

    const results = await axios(reqParams);
    console.log(results.data);
    res.send({
      id: results.data.id,
      url: results.data.external_urls.spotify,
    });
  } catch (err) {
    console.error(err);
  }
}));

module.exports = router;
