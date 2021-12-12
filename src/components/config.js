export const authEndpoint = 'https://accounts.spotify.com/authorize';
export const redirectUri = 'http://sentencify.netlify.com/.netlify/functions/callback';
export const scopes = [
  'playlist-modify',
  'playlist-modify-private',
  'user-read-private',
];
