const { Sponsors } = require('../../models');

const { errorValidation } = require('../../helpers');

const getSponsors = async (req, res) => {
  const sponsors = await Sponsors.find();

  if (!sponsors) {
    throw errorValidation(404, 'Sponsors not received');
  }

  res.json({
    status: 'Success',
    code: 200,
    message: 'Sponsors received',
    data: { sponsors },
  });
};

module.exports = getSponsors;
