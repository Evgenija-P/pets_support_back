const { Notices } = require('../../models');
const addNewNotices = async (req, res, next) => {
  const { body, user } = req;
  const { _id: owner, email, phone } = user;

  // let petImageURL = '';
  // if (req.file) {
  //   const { path: tempUpload, filename } = req.file;
  // const resultUpload = path.join(avatarDir, filename);
  //   try {
  //     await fs.unlink(tempUpload);
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   petImageURL = path.join('avatars', filename);
  //   // console.log("avatarURL", avatarURL);
  // }
  const NewNotices = new Notices({ ...body, owner, email, phone });
  const result = await NewNotices.save();
  res.status(201).json({ message: result });
};

module.exports = addNewNotices;
