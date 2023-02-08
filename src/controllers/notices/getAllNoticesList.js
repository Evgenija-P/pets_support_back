const { Notices } = require('../../models');

const PER_PAGE = 20;
const getAllNoticesList = async (req, res, next) => {
  // let favoriteList = null;
  // if (req.user) {
  //   const {
  //     user: { _id: owner },
  //   } = req;
  //   favoriteList = await Favorite.findOne({ owner });
  // }

  const { page = 1, limit = PER_PAGE } = req.query;
  const skip = (page - 1) * limit;

  const noticesList = await Notices.find({}, '', {
    skip,
    limit,
  });
  const totalHits = await Notices.find({}).count();
  res.json({
    message: noticesList,
    // favoriteList,
    page,
    totalHits,
  });
};
module.exports = getAllNoticesList;
