import { React } from 'react';
import { Button, Row } from 'react-bootstrap';
import { authEndpoint, redirectUri, scopes } from './config';
require('dotenv').config();

const LoginScreen = () => {
  const authUri = `${authEndpoint}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectUri}`
  const responseUri = `&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
  const uri = `${authUri}${responseUri}`

  return (
    <>
      <Row className='d-flex justify-content-center align-items-center'>
        <h1 style={{textAlign: 'center', margin: '200px auto auto'}}> Sentencify</h1>
      </Row>
      <Row className='d-flex justify-content-center align-items-center' style={{margin: '50px auto auto'}}>
        <div className='d-flex justify-content-center'>
          <Button 
            className='btn btn-default text-center' 
            size='lg' 
            variant='success' 
            onClick={() => window.location = uri}
          >
            Login To Spotify
          </Button>
        </div>
      </Row>
    </>
  );
}

export default LoginScreen;
