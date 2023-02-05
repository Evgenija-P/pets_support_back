const fs = require('fs/promises');

const { Pet } = require('../../models/pet');
const { uploadImage } = require('../../services/cloud');

const addPet = async (req, res) => {
  let photoURL = null;
  const path = req.file?.path;

  if (path) {
    const [filename] = req.file.filename.split('.');
    const { url } = await uploadImage(path, {
      public_id: filename,
    });
    photoURL = url;
    fs.rm(path);
  }

  const { _id: owner } = req.user;
  const newPet = await Pet.create({ ...req.body, owner, photoURL });

  res.json({
    status: 'Success',
    code: 200,
    message: 'pet was added',
    data: newPet,
  });
};

module.exports = addPet;
