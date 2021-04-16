import { useState, useEffect } from 'react';
import * as $ from 'jquery';
import { Button, Form } from 'react-bootstrap';
import { authEndpoint, redirectUri, scopes } from './config.js';
import hash from './hash';
require('dotenv').config();

const LoginScreen = () => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState('');
  
  const authUri = `${authEndpoint}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}&scope=`
  const scopesUri = `${scopes.join('%20')}&response_type=token&show_dialog=true`;
  const uri = `${authUri}${scopesUri}`
  let formArr;

  useEffect(() => {
    let _token = hash.access_token;

    if (_token) {
      setToken(_token);
    }
  }, []);

  const getUserInfo = () => {
    $.ajax({
      url: 'https://api.spotify.com/v1/me',
      type: 'GET',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: data => {
        setUserId(data.id);
        createPlaylist();
      }
    })
  }

  const createPlaylist = (token) => {
    $.ajax({
      url: `https://api.spotify.com/v1/users/${userId}/playlists`,
      type: 'POST',
      data: {
        'name': `${formData}`,
        'description': 'Playlist generated from the sentencify app',
        'public': false,
      },
      processData: false,
      contentType: 'application/json; charset=UTF-8',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      success: data => {
        console.log(data);
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formArr = formData.split(' ');
    console.log(formArr);
    // console.log(formData);
    getUserInfo();
  };

  return (
    <div className='d-flex justify-content-center align-items-center'>
    <header className='App-header'>
      <h1 style={{textAlign: 'center', margin: '30px auto auto'}}> Sentencify</h1>
      <div className='col text-center'> 
        {!token && (
          <a href={uri} className='Button'>
            <Button className='btn btn-default' size='lg' variant='success'>Login To Spotify</Button>
          </a>
        )}
      </div>
      <div>
        {token && (
          <Form name='testform' onSubmit={onSubmit}>
            <input type='text' 
              required
              className='form' 
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              placeholder='Type a sentence...'
            />
          </Form>
        )}
      </div>
    </header>
  </div>
  );
}

export default LoginScreen;
