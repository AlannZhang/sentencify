import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Row, Col, Table, Fade } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const CreatePlaylist = () => {
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState('');
  const [formArr, setFormArr] = useState([]);
  const [songs, setSongs] = useState([]);
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showSongs, setShowSongs] = useState(false);
  let songUri = [];
  let playlistId;
  const randomSong = Math.floor(Math.random() * 20);

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

  // create the playlist with name set as form input
  const createPlaylist = async () => {
    try {
      const reqParams = {
        method: 'post',
        url: `.netlify/netlify_functions/server/createPlaylist/${userId}`,
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
        setShowSongs(true);
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

  const onSubmit = (e) => {
    e.preventDefault();
    createPlaylist();
    getSongs();
    setShowForm(false);
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    history.push('/');
  }

  const makeBold = (item, keyword) => {
    const re = new RegExp(keyword, 'i');
    return item.replace(re, '<b>' + keyword.toUpperCase() + '</b>');
  };

  return (
    <>
      <style type='text/css'>
        {`
        .btn-transparent {
          color: #006600;
        }
        `}
      </style>
      <Row>
        <Col className='d-flex flex-row' md={3}>
          <h1 style={{textAlign: 'center', margin: '20px auto auto'}}> Setencify </h1>
        </Col>
        <Col className='d-flex flex-row-reverse' md={{ span: 3, offset: 6 }}>
          <Button
            className='bg-transparent font-weight-bold'
            variant='transparent'
            onClick={logOut}
            style={{ textDecoration: 'none', margin: '35px auto auto' }}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        {showForm && (
          <h5 
            style={{textAlign: 'center', margin: '100px auto auto'}}
          >
            Welcome to Sentencify, type a sentence to generate a playlist.
            <br/> Each song that is added represents a word from your sentence.
          </h5>
        )}
      </Row>
      <Row className='justify-content-center' style={{margin: '80px auto auto'}}>
        {showForm && (
          <Form name='testform' onSubmit={onSubmit}>
            <input 
              type='text' 
              required
              className='border border-light rounded' 
              value={formData}
              onChange={(e) => {
                setFormData(e.target.value)
                setFormArr(e.target.value.split(' '))
              }}
              placeholder='Type a sentence...'
              style={{width: '450px'}}
          />
          </Form>
        )}
        <Fade in={showSongs}>
          <Table
            className='table'
            style={{ width: '45%', margin: '20px auto' }}
            bg-transparent 
            borderless
            responsive
          >
            <tbody>
              {songs.map((item, i) => (
                <tr key={item.id}>
                  <td>
                    <Row>
                      <Col>
                        <h5 dangerouslySetInnerHTML={{ __html: makeBold(item.name, formArr[i])}}/>
                      </Col>
                      <Col>
                        <img src={item.album.images[2].url} alt='song cover art' className='float-right'/>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Fade>
      </Row>
      <Row className='justify-content-center' style={{margin: '50px auto auto'}}>
        {showPlaylist && (
          <Button
            className='bg-transparent font-weight-bold'
            variant='transparent'
            style={{ textDecoration: 'none'}}
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
