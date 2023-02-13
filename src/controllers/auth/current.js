const {
  pet: { Pet },
} = require('../../models');

const current = async (req, res) => {
  const { _id, email, name, city, phone, birthday, avatarURL } = req.user;

  const currentUserPets = await Pet.find({ owner: _id }).sort({
    createdAt: 'desc',
  });
  const currentUserData = {
    _id,
    email,
    name,
    city,
    phone,
    birthday,
    avatarURL,
    pets: currentUserPets,
  };

  res.json({
    status: 'Success',
    code: 200,
    message: "user's info was received",
    data: currentUserData,
  });
};

module.exports = current;
