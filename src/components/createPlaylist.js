import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Row } from 'react-bootstrap';
require('dotenv').config();

const CreatePlaylist = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState('');
  let formArr = [];

  useEffect(() => {
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
    
  const createPlaylist = async () => {
    try {
      const reqParams = {
        method: 'post',
        url: `https://api.spotify.com/v1/users/${userId}/playlists`,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        data: {
          'name': `${formData}`,
          'description': 'Playlist generated from the sentencify app',
          'public': true,
        }
      }

      const results = await axios(reqParams);
      console.log(results);
    } catch (err) {
      console.error(err);
    }
  };

  const getSongs = async () => {
    try {
      for (let i = 0; i < formArr.length; i++) {
        const reqParams = {
          method: 'get',
          url: 'https://api.spotify.com/v1/search',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          data: {
            q: `${formArr[i]}`,
            type: 'track',
            limit: '10',
          }
        }

        console.log(formArr[i]);
        const results = await axios(reqParams);
        console.log(results);
      }
    } catch (error) {
      console.error(error);
    }
  }
    
  const onSubmit = (e) => {
    e.preventDefault();
    formArr = formData.split(' ');
    // createPlaylist();
    getSongs();
  };

  return (
    <>
      <Row className='justify-content-center'>
        <h1 style={{textAlign: 'center', margin: '30px auto auto'}}> Setencify </h1>
      </Row>
      <Row className='justify-content-center' style={{margin: '100px auto auto'}}>
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
      </Row>
    </>
  )

};

export default CreatePlaylist;
