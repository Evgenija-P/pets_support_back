const { Sponsors } = require('../../models');

const { errorValidation } = require('../../helpers');

const getSponsors = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const sponsors = await Sponsors.find().skip(skip).limit(limit);

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
