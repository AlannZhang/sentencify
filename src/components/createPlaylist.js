import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Form, Row } from 'react-bootstrap';
require('dotenv').config();

const CreatePlaylist = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const [userId, setUserId] = useState('');
  const [formData, setFormData] = useState('');
  let formArr;

  // console.log(token);

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
      console.log(results.data.id);
      setUserId(results.data.id)
    } catch (err) {
      console.error(err);
    }
  }
    
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
          'public': false,
        }
      }

      const results = await axios(reqParams);
      console.log(results);
      setUserId(results)
    } catch (err) {
      console.error(err);
    }
  };
    
  const onSubmit = (e) => {
    e.preventDefault();
    formArr = formData.split(' ');
    console.log(formArr);
    getUserInfo();
  };

  return (
    <Row className='justify-content-center'>
      <h1 style={{textAlign: 'center', margin: '30px auto auto'}}> Setencify </h1>
      <div className='col-md-4 col-md-offset-5 align-center'>
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
      </div>
    </Row>
  )

};

export default CreatePlaylist;
