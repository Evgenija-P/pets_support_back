const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

// Configuration
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

// Upload

// const res = cloudinary.uploader.upload(
//   'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
//   { public_id: 'olympic_flag' }
// );

// res
//   .then(data => {
//     console.log(data);

//     console.log(data.secure_url);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// // Generate
// const url = cloudinary.url('olympic_flag', {
//   width: 100,
//   height: 150,
//   Crop: 'fill',
// });

// The output url
// console.log(url);
// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag

const uploadImage = async imagePath => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    // return result.public_id;
    return result.url;
  } catch (error) {
    console.error(error);
  }
};
module.exports = uploadImage;
