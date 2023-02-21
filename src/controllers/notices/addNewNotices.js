const { Notices } = require('../../models');
const { uploadImage } = require('../../helpers');
const fs = require('fs/promises');

// const path = require('path');

// const sharp = require('sharp');
const addNewNotices = async (req, res, next) => {
  const { body, user } = req;
  const { _id: owner, email, phone } = user;
  let petImageURL = '';
  // let compressPath = '';
  if (req.file) {
    // const { path: tempUpload, filename } = req.file;
    const { path: tempUpload } = req.file;
    // const config = {
    //   jpeg: { quality: 80 },
    //   webp: { quality: 80 },
    //   png: { compressionLevel: 8 },
    // };

    // const image = sharp(tempUpload);
    // const meta = await image.metadata();
    // const { format } = meta;

    // await image[format](config[format])
    //   .flatten()
    //   .toFile(path.join(__dirname, '../../../', 'temp', 'compressed', filename))
    //   .then(() => {
    //     compressPath = path.join(
    //       __dirname,
    //       '../../../',
    //       'temp',
    //       'compressed',
    //       filename
    //     );
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // console.log('compress', compressPath);
    petImageURL = await uploadImage(tempUpload);
    // console.log('petImageURL', petImageURL);
    if (petImageURL) {
      const [firstPart, secondPart] = petImageURL.split('upload/');
      petImageURL = firstPart + 'upload/q_auto/' + secondPart;
      try {
        await fs.unlink(tempUpload);
        // await fs.unlink(compressPath);
      } catch (err) {
        console.error(err);
      }
    }
  }

  const NewNotices = new Notices({ ...body, owner, email, phone, petImageURL });
  const result = await NewNotices.save();
  res.status(201).json({ message: result });
};

module.exports = addNewNotices;
