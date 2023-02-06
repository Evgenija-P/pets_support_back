const { Notices, Favorite } = require('../../models');
const { HttpError } = require('../../helpers');

const PER_PAGE = 20;

const getFavoriteNotices = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;
  const { page = 1, limit = PER_PAGE } = req.query;
  const skip = (page - 1) * limit;
  const isHaveFavorite = await Favorite.findOne({ owner });
  if (isHaveFavorite === null) {
    throw HttpError(404, `user don't have favorite notices `);
  }
  const { favoriteList } = isHaveFavorite;

  if (favoriteList.length === 0) {
    throw HttpError(404, `user don't have favorite notices `);
  }

  const favoriteNoticesList = await Notices.find(
    {
      _id: { $in: [...favoriteList] },
    },
    '',
    {
      skip,
      limit,
    }
  );
  res.json({ message: favoriteNoticesList });
};
module.exports = getFavoriteNotices;
