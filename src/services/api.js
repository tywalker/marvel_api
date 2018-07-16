import keys from './private';
import fetch from 'node-fetch';
import CryptoJS from 'crypto-js';

const baseUrl = "http://gateway.marvel.com/";
const endPoint = "v1/public/characters";
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + keys.privateKey + keys.publicKey).toString()

const buildUrl = (url, params) => {
  let fetchUrl = `${url}?`;
  for(let key in params) {
    fetchUrl += `${key}=${params[key]}&`;
  }
  return fetchUrl.slice(0, -1);
}


export const fetchCharacters = (offset) => {
  const url = baseUrl + endPoint;
  const params = {
    limit: '50',
    offset,
    ts,
    apikey: keys.publicKey,
    hash
  }
  return fetch(buildUrl(url, params),
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'no-cors'
    })
    .then( res => res.json() )
    .then( json => json.data.results )
}

export const fetchCharactersFromSearch = (val, offset = 1) => {
  const url = baseUrl + endPoint;
  const params = {
    nameStartsWith: val,
    limit: '50',
    offset,
    ts,
    apikey: keys.publicKey,
    hash
  }
  return fetch(buildUrl(url, params),
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'no-cors'
    })
    .then( res => res.json() )
    .then( json => json.data.results )
}

export const buildImageUrl = (imgUrl) => {
  let url = imgUrl + '/detail.jpg';
  const params = {
    apikey: keys.publicKey,
    hash
  }

  return buildUrl(url, params);
}
