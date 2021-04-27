const express = require('express');
const cors = require('cors');
const createPlaylistRouter = require('./routes/createPlaylist');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/createPlaylist', createPlaylistRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
