# Sentencify

A web app that uses Spotify's APIs that allows a user to create a playlist based on the words in a sentence that they type in as input. Each word in the sentence is represented by a song that is added to the playlist. To gain an access token, I implemented Spotify's [implicit grant flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow). Once the access token is retrieved, the processes such as creating a playlist, and addings songs to the playlist could begin. This app was built using 

* **React** 
* **Bootstrap**
* **Express** 
* **Node JS**

# Instructions

Run the following command to install dependencies: 
```sh 
npm i
```

Run the following command to locally start the web app:
```sh
npm start
```

Navigate to the backend directory then run the command to locally start the express server:
```sh
cd backend
nodemon server.js
```

# Current Screenshots 

Login Page:

![alt text](https://github.com/AlannZhang/sentencify/blob/master/screenshots/login.png?raw=true)

Spotify Authentication:

![alt text](https://github.com/AlannZhang/sentencify/blob/master/screenshots/authentication.png?raw=true)

Sentence Form:

![alt text](https://github.com/AlannZhang/sentencify/blob/master/screenshots/form.png?raw=true)

Playlist Songs View:

![alt text](https://github.com/AlannZhang/sentencify/blob/master/screenshots/songs.png?raw=true)