const { Notices } = require('../../models');

const getAllNoticesList = async (req, res, next) => {
  const { search = '' } = req.query;

  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  let noticesList = [];
  let totalHits = 0;
  if (search) {
    const searchRegexp = new RegExp(search);

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
