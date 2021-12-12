import axios from 'axios';
const router = require('express').Router();

router.post('/createPlaylist/:userId', (async (req, res) => {
  try {
    // sending the playlist creation request from the backend
    // due to cors issues in the frontend
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
    res.status(200).send({
      id: results.data.id,
      url: results.data.external_urls.spotify,
    });
  } catch (err) {
    console.error(err);
  }
}));

export default router;
