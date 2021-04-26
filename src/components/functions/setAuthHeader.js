import axios from 'axios';

export const setHeader = () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      axios.defaults.headers.common[
      'Authorization'
      ] = `Bearer ${token}`;
      
      console.log(token);
    }
    } catch (error) {
    console.log('Error setting auth', error);
  }
};

export default setHeader;
