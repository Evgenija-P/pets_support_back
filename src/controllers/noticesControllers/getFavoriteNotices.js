const { Notices } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
// const { errorValidation } = require('../../helpers');

const getFavoriteNotices = async (req, res, next) => {
  //   const id = req.params.contactId;
  //   const categoryName = req.params.categoryName;

  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const noticesList = await Notices.find({ favorite: true }, '', {
    skip,
    limit,
  });
  res.json({ message: noticesList });
  // };
  // module.exports = { getNoticesByCategory: ctrlWrapper(getNoticesByCategory) };
};
module.exports = getFavoriteNotices;
