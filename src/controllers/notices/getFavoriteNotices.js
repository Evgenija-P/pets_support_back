const { Notices, Favorite } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
const { HttpError } = require('../../helpers');

const getFavoriteNotices = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;

  const isHaveFavorite = await Favorite.findOne({ owner });
  if (isHaveFavorite === null) {
    throw HttpError(404, `user don't have favorite notices `);
  }
  const { favoriteList } = isHaveFavorite;

  if (favoriteList.length === 0) {
    throw HttpError(404, `user don't have favorite notices `);
  }

  const favoriteNoticesList = await Notices.find({
    _id: { $in: [...favoriteList] },
  });
  res.json({ message: favoriteNoticesList });
};
module.exports = getFavoriteNotices;
