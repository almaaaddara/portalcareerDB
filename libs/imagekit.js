const ImageKit = require('imagekit');
require('dotenv').config();

const {
  IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_URL_ENDPOINT,
} = process.env;

const imagekit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
});

module.exports = imagekit;