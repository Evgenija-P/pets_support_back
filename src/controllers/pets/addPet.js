const {
  pet: { Pet },
} = require('../../models');

const addPet = async (req, res) => {
  const { _id: owner } = req.user;
  const newPet = Pet.create({ ...req.body, owner });

  res.json({
    status: 'Success',
    code: 200,
    data: newPet,
  });
};

module.exports = addPet;
