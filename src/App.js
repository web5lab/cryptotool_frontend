import React from 'react';
import { getTwitterRequestToken } from './twitter';

const App = () => {
  const handleClick = async () => {
    try {
      const { token, token_secret } = await getTwitterRequestToken();
      const redirect_uri = encodeURIComponent('http://localhost:3000/callback');
      window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${token}&oauth_callback=${redirect_uri}`;
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <button onClick={handleClick}>Sign in with Twitter</button>
  );
};

export default App;
