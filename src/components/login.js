import { React, useEffect } from 'react';
import { Button, Row, Container } from 'react-bootstrap';
import { authEndpoint, redirectUri, scopes } from './config';
require('dotenv').config();

const LoginScreen = () => {
  const authUri = `${authEndpoint}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}`
  const responseUri = `&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
  const uri = `${authUri}${responseUri}`

  useEffect(() => document.body.style.backgroundColor = '#becf94be');

  return (
    <div className='d-flex align-items-center min-vh-100'>
      <Container>
        <Row className='justify-content-center'>
          <h1 style={{textAlign: 'center', margin: '-90px auto auto'}}> Sentencify</h1>
        </Row>
        <Row className='justify-content-center' style={{margin: '20px auto auto'}}>
          <Button 
            className='btn btn-default text-center rounded-pill' 
            size='lg' 
            variant='success' 
            onClick={() => window.location = uri}
          >
            Login To Spotify
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default LoginScreen;
