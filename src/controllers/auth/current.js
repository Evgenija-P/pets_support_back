const {
  pet: { Pet },
} = require('../../models');

const current = async (req, res) => {
  const {
    _id: userId,
    password,
    token,
    verify,
    verificationToken,
    ...userInfo
  } = req.user;

  const currentUserPets = await Pet.find({ owner: userId }, '-owner');

  res.json({
    status: 'Success',
    code: 200,
    message: "user's info was received",
    data: { ...userInfo, pets: currentUserPets },
  });
};

module.exports = current;
