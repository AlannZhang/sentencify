import react, { Component } from 'react';
import authHandler from './handleAuth';
import { authEndpoint, clientId, redirectUri, scopes } from "./config.js";
import Player from './player';
import hash from './hash';
import * as $ from "jquery";
const auth = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=`
const scopesUri = `${scopes.join("%20")}&response_type=token&show_dialog=true`;
const uri = `${auth}${scopesUri}`

class LoginScreen extends Component {
  // state = {  }
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if(this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          this.setState({
            no_data: true,
          });
          return;
        }

        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
          no_data: false 
        });
      }
    });
  }

  render() {
      return (
        // <button onClick={authHandler.onLogin()}> Press To Login To Spotify</button>
        <div className="App">
        <header className="App-header">
          <div className = "Title"> 
            <h1> Welcome To My Spotify Project</h1>
          </div>
          <div className="Title">
          </div>
            {!this.state.token && (
              <a href={uri}>
                <button>Login To Spotify</button>
              </a>
            )}
          {this.state.token && !this.state.no_data && (
            <form>
              <input type="text" placeholder="Type a sentence..."/>
            </form>
          )}
          {this.state.no_data && (
            <form>
              <input type="text" placeholder="Type a sentence..."/>
            </form>
          )}
        </header>
      </div>
      );
  }
}

/*
<Player
item={this.state.item}
is_playing={this.state.is_playing}
progress_ms={this.state.progress_ms}
/>
*/

export default LoginScreen;
