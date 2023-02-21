const { Favorite } = require('../../models');
const { HttpError } = require('../../helpers');

const removeFromFavoriteNotices = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;
  const idNotices = req.params.noticesId;
  const isHaveFavorite = await Favorite.findOne({ owner });
  if (isHaveFavorite === null) {
    throw HttpError(404, `user don't have favorite notices `);
  }
  const { favoriteList: prevFavoriteList } = isHaveFavorite;
  const newFavoriteList = prevFavoriteList.filter(
    notices => notices._id.toString() !== idNotices
  );

  const result = await Favorite.findOneAndUpdate(
    { owner },
    {
      $set: { favoriteList: [...newFavoriteList] },
    },
    { new: true }
  );
  const { favoriteList: updatedFavoritList } = result;
  if (updatedFavoritList) {
    if (!updatedFavoritList.some(notice => notice._id === idNotices)) {
      res.status(201).json({ message: idNotices });
    }
  } else {
    throw HttpError(400, result);
    // res.status(201).json({ message: result });
  }
};
module.exports = removeFromFavoriteNotices;
