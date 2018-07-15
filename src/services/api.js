import keys from './private';
import fetch from 'node-fetch';
import CryptoJS from 'crypto-js';

const url = "http://gateway.marvel.com/";
const ep = "v1/public/characters";
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + keys.privateKey + keys.publicKey).toString()

const params = {
  url,
  ep,
  ts,
  hash
}

export const fetchCharacters = () => {
  return fetch(`${url}${ep}?limit=50&ts=${ts}&apikey=${keys.publicKey}&hash=${hash}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'cors'
    })
    .then( res => res.json() )
    .then( json => json.data.results )
}
