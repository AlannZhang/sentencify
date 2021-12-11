import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import hash from './hash';

const RedirectPage = () => {
  const history = useHistory();

  useEffect(() => {
    const retrievedToken = hash.access_token;

    const checkToken = () => {
      if (retrievedToken) {
        const token = retrievedToken;
        localStorage.setItem('token', JSON.stringify(token));
        history.push('/create');
      } else {
        history.push('/');
      }
    }

    checkToken();
  });

  return null;
};

export default RedirectPage;
