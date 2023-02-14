const { Notices, Favorite } = require('../../models');
const { HttpError } = require('../../helpers');
const addToFavoriteNotices = async (req, res, next) => {
  // console.log('addToFavoriteNotices');
  const {
    user: { _id: owner },
  } = req;
  const idNotices = req.params.noticesId;
  const notices = await Notices.findById(idNotices);
  if (notices === null) {
    throw HttpError(404, `Notices with id:${idNotices} not found`);
  }
  const isHaveFavorite = await Favorite.findOne({ owner });
  if (isHaveFavorite === null) {
    const NewFavorite = new Favorite({ owner, favoriteList: [notices] });
    await NewFavorite.save();
    res.json({ message: notices });
  }
  const { favoriteList: prevFavoriteList } = isHaveFavorite;
  const isExists = prevFavoriteList.find(favorite => {
    // console.log('favorite._id', favorite._id);
    // console.log('idNotices', idNotices);
    return favorite._id.toString() === idNotices;
  });
  // console.log(isExists);
  if (isExists) {
    throw HttpError(404, `FavoritNotices with id:${idNotices} alredy exist!`);
  }
  const newFavoriteList = new Set(prevFavoriteList);
  await Favorite.findOneAndUpdate(
    { owner },
    {
      $set: { favoriteList: [...newFavoriteList.add(notices)] },
    },
    { new: true }
  );
  // console.log('notices', notices);
  res.status(201).json({
    message: notices,
  });
};

module.exports = addToFavoriteNotices;
