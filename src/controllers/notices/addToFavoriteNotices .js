const { Favorite } = require('../../models');

const addToFavoriteNotices = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;
  const idNotices = req.params.noticesId;
  const isHaveFavorite = await Favorite.findOne({ owner });
  if (isHaveFavorite === null) {
    const NewFavorite = new Favorite({ owner, favoriteList: [idNotices] });
    const result = await NewFavorite.save();
    res.json({ message: result });
  }
  const { favoriteList: prevFavoriteList } = isHaveFavorite;
  const newFavoriteList = new Set(prevFavoriteList);
  const favoriteUpdated = await Favorite.findOneAndUpdate(
    { owner },
    {
      $set: { favoriteList: [...newFavoriteList.add(idNotices)] },
    },
    { new: true }
  );

  res.json({ message: favoriteUpdated });
};

module.exports = addToFavoriteNotices;
