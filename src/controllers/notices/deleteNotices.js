const { Notices } = require('../../models');
const { HttpError } = require('../../helpers');

const deleteNotices = async (req, res, next) => {
  const idNotices = req.params.noticesId;

  const {
    user: { _id: owner },
  } = req;
  const noticesRemoved = await Notices.findOneAndRemove({
    owner,
    _id: idNotices,
  });
  if (noticesRemoved === null) {
    throw HttpError(404, `Notices with id:${idNotices} not found`);
  }

  res.json({ message: noticesRemoved });
};
module.exports = deleteNotices;
