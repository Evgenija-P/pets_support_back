const { Notices } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
// const { HttpError } = require('../../helpers');

const getFavoriteNotices = async (req, res, next) => {
  //   const id = req.params.contactId;
  //   const categoryName = req.params.categoryName;

  const noticesList = await Notices.find({ favorite: true });
  res.json({ message: noticesList });
  // };
  // module.exports = { getNoticesByCategory: ctrlWrapper(getNoticesByCategory) };
};
module.exports = getFavoriteNotices;
