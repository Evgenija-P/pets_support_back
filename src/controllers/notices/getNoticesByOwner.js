const { Notices } = require('../../models');

const PER_PAGE = 20;
const getNoticesByOwner = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;
  let noticesList = [];
  let totalHits = 0;
  const { page = 1, limit = PER_PAGE, search = '' } = req.query;
  const skip = (page - 1) * limit;
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
    );
    //  totalHits = await Notices.find({
    //    $or: [{ comments: { $regex: search } }, { title: { $regex: search } }],
    //  }).count();
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
    });

    totalHits = await Notices.find({ owner }).count();
  }
  res.json({ message: noticesList, page, totalHits, search, limit });
};
module.exports = getNoticesByOwner;
