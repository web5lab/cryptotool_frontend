import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';


const API_KEY = 'LuBXwVFRCfnZheQOoo5SKFG8m';
const API_SECRET_KEY = '4zL3tsFF75FqZboED63CR2GGGVPDbyutnlFR5chD8hQmZSc2vV';


const oauth = OAuth({
  consumer: {
    key: API_KEY,
    secret: API_SECRET_KEY,
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (base_string, key) => {
    const signature = CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
    return signature;
  },
});


export const getTwitterRequestToken = async () => {
  const request_data = {
    url: 'https://api.twitter.com/oauth/request_token',
    method: 'POST',
  };
  const res = await fetch(request_data.url, {
    method: request_data.method,
    headers: oauth.toHeader(oauth.authorize(request_data)),
  });
  const text = await res.text();
  const token = text
    .split('&')
    .find(str => str.startsWith('oauth_token='))
    .split('=')[1];
  const token_secret = text
    .split('&')
    .find(str => str.startsWith('oauth_token_secret='))
    .split('=')[1];
  return { token, token_secret };
};
