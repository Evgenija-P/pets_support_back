const { Notices } = require('../../models');
const { uploadImage } = require('../../helpers');
const fs = require('fs/promises');
const Jimp = require('jimp');
const path = require('path');
const JIMP_QUALITY = 60;

const addNewNotices = async (req, res, next) => {
  const { body, user } = req;
  const { _id: owner, email, phone } = user;
  let petImageURL = '';
  let resultUpload = '';
  const compressedDir = path.join(__dirname, '../../../', 'temp', 'compressed');
  // console.log('compressedDir', compressedDir);
  if (req.file) {
    const { path: tempUpload, filename } = req.file;
    // console.log('tempUpload', tempUpload);
    await Jimp.read(tempUpload)
      .then(avatar => {
        resultUpload = path.join(compressedDir, filename);
        console.log(' resultUpload', resultUpload);
        return (
          avatar
            // .resize(RESIZE_WIDTH) // resize
            .quality(JIMP_QUALITY) // set JPEG quality
            .write(resultUpload)
        ); // save
      })
      .catch(err => {
        console.error(err);
      });

    petImageURL = await uploadImage(resultUpload);
    const [firstPart, secondPart] = petImageURL.split('upload/');
    petImageURL = firstPart + 'upload/q_auto/' + secondPart;
    try {
      await fs.unlink(tempUpload);
      await fs.unlink(resultUpload);
    } catch (err) {
      console.error(err);
    }
  }

  const NewNotices = new Notices({ ...body, owner, email, phone, petImageURL });
  const result = await NewNotices.save();
  res.status(201).json({ message: result });
};

module.exports = addNewNotices;
