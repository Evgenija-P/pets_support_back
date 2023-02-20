const { Notices } = require('../../models');

const getNoticesByOwner = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;
  let noticesList = [];
  let totalHits = 0;
  const { page = 1, limit = 20, search = '' } = req.query;
  const skip = (page - 1) * limit;
  if (search) {
    const searchRegexp = new RegExp(search);
    noticesList = await Notices.find(
      {
        $and: [
          { owner },
          {
            $or: [
              { comments: { $regex: searchRegexp } },
              { title: { $regex: searchRegexp } },
            ],
          },
        ],
      },
      '',
      {
        skip,
        limit,
      }
    ).sort({ createdAt: -1 });
    totalHits = await Notices.find({
      $and: [
        { owner },
        {
          $or: [
            { comments: { $regex: searchRegexp } },
            { title: { $regex: searchRegexp } },
          ],
        },
      ],
    }).count();
  } else {
    noticesList = await Notices.find({ owner }, '', {
      skip,
      limit,
    }).sort({ createdAt: -1 });

    totalHits = await Notices.find({ owner }).count();
  }
  res.json({ message: noticesList, page, totalHits, search, limit });
};
module.exports = getNoticesByOwner;
