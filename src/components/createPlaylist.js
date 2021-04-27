import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Row, Col, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const CreatePlaylist = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState('');
  const [songUri, setSongUri] = useState([])
  const [songNames, setSongNames] = useState([]);
  const [artistNames, setArtistNames] = useState([]);
  const [playlistId, setPlaylistId] = useState('');
  const [showForm, setShowForm] = useState(true);
  const randomSong = Math.floor(Math.random() * 20);
  let formArr = [];

  // get user id on render
  useEffect(() => {
    document.body.style.backgroundColor = '#becf94be';

    const getUserInfo = async () => {
      try {
        const reqParams = {
          method: 'get',
          url: 'https://api.spotify.com/v1/me',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }

        const results = await axios(reqParams);
        setUserId(results.data.id)
      } catch (err) {
        console.error(err);
      }
    }

    getUserInfo();
  }, []);

  // search for songs based on each word from the form input
  const getSongs = async () => {
    try {
      for (let i = 0; i < formArr.length; i++) {
        const reqParams = {
          method: 'get',
          url: `https://api.spotify.com/v1/search?q=${formArr[i]}&type=track&limit=20`,
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        };

        const results = await axios(reqParams);
        setSongUri((arr) => [...arr, results.data.tracks.items[randomSong].uri]);
        setSongNames((arr) => [...arr, results.data.tracks.items[randomSong].name]);
        console.log(`Song: ${results.data.tracks.items[randomSong].name}`);

        for (let j = 0; j < results.data.tracks.items[randomSong].artists.length; j++) {
          console.log(`Artist: ${results.data.tracks.items[randomSong].artists[j].name}`);
          setArtistNames((arr) => [...arr, results.data.tracks.items[randomSong].artists[j].name]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // add songs to the playlist
  const addSongs = async () => {
    console.log(userId);
    try {
      for (let i = 0; i < songUri.length; i++) {
        const reqParams = {
          method: 'post',
          url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?position=${i}&uris=${songUri[i]}`,
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        };

        const results = await axios(reqParams);
        console.log(results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // create the playlist with name set as form input
  const createPlaylist = async () => {
    try {
      const reqParams = {
        method: 'post',
        url: `http://localhost:8000/createPlaylist/${userId}`,
        data: {
          'formData': `${formData}`,
          'token': `${token}`
        }
      }

      const results = await axios(reqParams);
      // console.log(results.data);
      setPlaylistId(results.data);
      addSongs();
    } catch (err) {
      console.error(err);
    }
  };
    
  const onSubmit = (e) => {
    e.preventDefault();
    formArr = formData.split(' ');
    createPlaylist();
    getSongs();
    setShowForm(false);
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    history.push('/');
  }

  return (
    <>
      <Row className='justify-content-center'>
        <h1 style={{textAlign: 'center', margin: '30px auto auto'}}> Setencify </h1>
        <style type="text/css">
          {`
          .btn-logout {
            color: #006600;
          }
          `}
        </style>
        <Button
          className='bg-transparent font-weight-bold'
          variant='logout'
          onClick={logOut}
          style={{ textDecoration: 'none' }}
        >
          Logout
        </Button>
      </Row>
      <Row className='justify-content-center' style={{margin: '100px auto auto'}}>
        {showForm && (
          <Form name='testform' onSubmit={onSubmit}>
            <input 
              type='text' 
              required
              className='form' 
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              placeholder='Type a sentence...'
          />
          </Form>
        )}
        <ListGroup>
          {songNames.map((item) => (
            <ListGroup.Item>{item}</ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </>
  );

};

export default CreatePlaylist;
