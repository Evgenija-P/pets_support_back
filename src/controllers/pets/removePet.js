const {
  pet: { Pet },
} = require('../../models');
const { HttpError } = require('../../helpers');
const { cloud } = require('../../services');

const removePet = async (req, res) => {
  const { petId } = req.params;
  const { _id: owner } = req.user;

  const result = await Pet.findOneAndRemove({ owner, _id: petId });

  if (!result) {
    throw HttpError(404, `Pet with id ${petId} not found`);
  }

  if (result.photoURL) {
    const imageId = cloud.parseIdFromImageURL(result.photoURL);
    await cloud.removeImageFromCloud(imageId);
  }

  res.json({
    status: 'Success',
    code: 200,
    message: 'Pet was deleted',
  });
};

module.exports = removePet;
