const { Notices } = require('../../models');
const { HttpError } = require('../../helpers');

const getNoticesById = async (req, res, next) => {
  const id = req.params.noticesId;
  // console.log('getNoticesById', id);
  // const id = req.params.noticesId;
  const notices = await Notices.findById(id);
  if (notices === null) {
    throw HttpError(404, `Notices with id:${id} not found`);
  }
  // console.log('response', notices);
  res.json({ message: notices });
};
module.exports = getNoticesById;
