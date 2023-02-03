const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

// Configuration
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

// Upload

const res = cloudinary.uploader.upload(
  'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
  { public_id: 'olympic_flag' }
);

res
  .then(data => {
    console.log(data);

    console.log(data.secure_url);
  })
  .catch(err => {
    console.log(err);
  });

// Generate
const url = cloudinary.url('olympic_flag', {
  width: 100,
  height: 150,
  Crop: 'fill',
});

// The output url
console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
