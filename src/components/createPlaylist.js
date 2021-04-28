import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Row, Col, ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const CreatePlaylist = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState('');
  let songUri = [];
  const [songs, setSongs] = useState([]);
  // const [artistNames, setArtistNames] = useState([]);
  let playlistId;
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
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
  });

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
        songUri.push(results.data.tracks.items[randomSong].uri);
        setSongs((arr) => [...arr, results.data.tracks.items[randomSong]]);

        for (let j = 0; j < results.data.tracks.items[randomSong].artists.length; j++) {
          // setArtistNames((arr) => [...arr, results.data.tracks.items[randomSong].artists[j].name]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // add songs to the playlist
  const addSongs = async () => {
    try {
      for (let i = 0; i < songUri.length; i++) {
        const reqParams = {
          method: 'post',
          url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?position=${i}&uris=${songUri[i]}`,
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        };

        await axios(reqParams);
        setShowPlaylist(true);
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
      playlistId = results.data.id;
      setPlaylistUrl(results.data.url);
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
      <Row>
        <Col className='d-flex flex-row'>
          <h1 style={{textAlign: 'center', margin: '20px auto auto'}}> Setencify </h1>
        </Col>
        <Col className='d-flex flex-row-reverse'>
          <style type='text/css'>
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
            style={{ textDecoration: 'none', margin: '30px auto auto' }}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <Row className='justify-content-center' style={{margin: '150px auto auto'}}>
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
        <ListGroup className='d-flex justify-content-between align-items-center'>
          {songs.map((item) => (
            <>
              <ListGroup.Item className='bg-transparent borderless' style={{ border: 'none' }}>
                <>
                  <div className='float-left mr-5 ' style={{ margin: '20px auto auto' }}>
                    {item.name}
                  </div>
                  <img src={item.album.images[2].url} alt='song cover art' className='float-right'/>
                </>
              </ListGroup.Item>
            </>
          ))}
        </ListGroup>
      </Row>
      <Row className='justify-content-center' style={{margin: '50px auto auto'}}>
        {showPlaylist && (
          <Button
            className='bg-transparent font-weight-bold'
            variant='logout'
            style={{ textDecoration: 'none', margin: '30px auto auto' }}
            onClick={() => window.open(playlistUrl, '_blank')}
          >
            <h5>Click here to view your playlist</h5>
          </Button>
        )}
      </Row>
    </>
  );

};

export default CreatePlaylist;
