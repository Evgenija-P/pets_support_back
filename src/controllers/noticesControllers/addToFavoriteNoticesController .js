const { Favorite } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
// const { HttpError } = require('../../helpers');

const addToFavoriteNoticesController = async (req, res, next) => {
  const {
    // body,
    user: { _id: owner },
  } = req;
  const idNotices = req.params.noticesId;
  const isHaveFavorite = await Favorite.findOne({ owner });
  if (isHaveFavorite === null) {
    // console.log('create!');
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
  // if (noticestUpdated === null) {
  //   throw HttpError(404, `Contact with id:${id} not found`);
  // }

  res.json({ message: favoriteUpdated });
};
// module.exports = {
//   addToFavoriteNoticesController: ctrlWrapper(addToFavoriteNoticesController),
// };
module.exports = addToFavoriteNoticesController;
