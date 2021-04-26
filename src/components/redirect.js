import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import hash from './functions/hash';

const RedirectPage = () => {
  const history = useHistory();

  useEffect(() => {
    const retrievedToken = hash.access_token;

    const checkToken = async () => {
      try {  
        if (retrievedToken) {
          const token = retrievedToken;
          // const expiryTime = new Date().getTime() + token.expires_in * 1000;
          // localStorage.setItem('expiry_time', expiryTime);
          localStorage.setItem('token', JSON.stringify(token));
          console.log(token);
          // console.log(expiryTime);
          history.push('/create');
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkToken();
  });

  return null;
};

export default RedirectPage;
