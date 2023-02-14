const { Notices } = require('../../models');

const PER_PAGE = 20;
const getAllNoticesList = async (req, res, next) => {
  // console.log('getAllNoticesList');
  // let favoriteList = null;
  // if (req.user) {
  //   const {
  //     user: { _id: owner },
  //   } = req;
  //   favoriteList = await Favorite.findOne({ owner });
  // }
  const { search = '' } = req.query;
  // console.log('getAllNoticesList');
  const { page = 1, limit = PER_PAGE } = req.query;
  const skip = (page - 1) * limit;
  let noticesList = [];
  let totalHits = 0;
  if (search) {
    // console.log('search', search);
    // noticesList = await Notices.find({ categoryName, title: search }, '', {
    //   skip,
    //   limit,
    // });
    const searchRegexp = new RegExp(search);
    // console.log('searchRegex', searchRegexp);
    noticesList = await Notices.find(
      {
        $or: [
          { comments: { $regex: searchRegexp, $options: 'i' } },
          { title: { $regex: searchRegexp, $options: 'i' } },
        ],
      },
      '',
      {
        skip,
        limit,
      }
    ).sort({ createdAt: -1 });
    totalHits = await Notices.find({
      $or: [
        { comments: { $regex: searchRegexp, $options: 'i' } },
        { title: { $regex: searchRegexp, $options: 'i' } },
      ],
    }).count();
  } else {
    noticesList = await Notices.find({}, '', {
      skip,
      limit,
    }).sort({ createdAt: -1 });
    totalHits = await Notices.find({}).count();
    // const noticesLists = await Notices.find({}, '', {
    //   skip,
    //   limit,
    // }).sort({ createdAt: 1 });
    // totalHits = await Notices.find({}).count();
    // console.log('-1', noticesList);
    // console.log('1', noticesLists);
  }

  res.json({
    message: noticesList,
    search,
    // favoriteList,
    page,
    totalHits,
    limit,
  });
};
module.exports = getAllNoticesList;
