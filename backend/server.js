import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import createPlaylistRouter from './routes/createPlaylist';
const app = express();
// const port = 8000;

app.use(cors());
// app.use(express.json());
app.use('/.netlify/netlify_functions/server', createPlaylistRouter);

export const handler = serverless(app);