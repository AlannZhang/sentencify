const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const createPlaylistRouter = require('./routes/createPlaylist');
const app = express();
// const port = 8000;

app.use(cors());
// app.use(express.json());
app.use('/.netlify/netlify_functions/server', createPlaylistRouter);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

module.exports.handler = serverless(app);