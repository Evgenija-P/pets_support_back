const { Notices, Favorite } = require('../../models');
const { HttpError } = require('../../helpers');

const updateFavoriteList = async ({ _id, list }) => {
  const result = await Favorite.findOneAndUpdate(
    { _id },
    {
      $set: { favoriteList: [...list] },
    },
    { new: true }
  );
  return result;
};

const deleteNotices = async (req, res, next) => {
  const idNotices = req.params.noticesId;

  const {
    user: { _id: owner },
  } = req;
  const AllUsersFavorite = await Favorite.find();
  AllUsersFavorite.forEach(element => {
    const { _id, favoriteList } = element;
    const index = favoriteList.findIndex(
      item => item._id.toString() === idNotices
    );

    if (index !== -1) {
      const updatedFavoritelist = favoriteList.filter(
        item => item._id.toString() !== idNotices
      );
      try {
        updateFavoriteList({ _id, list: updatedFavoritelist });
      } catch (error) {
        console.log(error);
      }
    }
  });

  const noticesRemoved = await Notices.findOneAndRemove({
    owner,
    _id: idNotices,
  });
  if (noticesRemoved === null) {
    throw HttpError(404, `Notices with id:${idNotices} not found`);
  }

  res.json({ message: noticesRemoved });
};
module.exports = deleteNotices;
