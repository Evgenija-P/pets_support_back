const { Notices } = require('../../models');
const { uploadImage } = require('../../helpers');
const fs = require('fs/promises');

const addNewNotices = async (req, res, next) => {
  const { body, user } = req;
  const { _id: owner, email, phone } = user;
  let petImageURL = '';

  if (req.file) {
    const { path: tempUpload } = req.file;
    petImageURL = await uploadImage(tempUpload);
    try {
      await fs.unlink(tempUpload);
    } catch (err) {
      console.error(err);
    }
  }
  const NewNotices = new Notices({ ...body, owner, email, phone, petImageURL });
  const result = await NewNotices.save();
  res.status(201).json({ message: result });
};

module.exports = addNewNotices;
