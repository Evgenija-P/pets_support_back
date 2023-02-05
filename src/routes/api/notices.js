const express = require('express');
const router = express.Router();
const { schemas } = require('../../schemas');
const { ctrlWrapper, authenticate, validation } = require('../../middlewares');
const {
  // getNoticesByCategory,
  addNewNoticesController,
  noticesByIdController,
  deleteNoticesController,
  addToFavoriteNoticesController,
  // getFavoriteNotices,
  removeFromFavoriteNotices,
  getNoticesByOwner,
} = require('../../controllers');

// router.get('/', ctrl.getNoticesListController);

// router.get('/:categoryName', ctrlWrapper(getNoticesByCategory));
// router.get('/favorite', ctrlWrapper(getFavoriteNotices));
router.get('/owner', authenticate, ctrlWrapper(getNoticesByOwner));
// router.get('/:noticesId', authenticate, asyncWrapper(noticesByIdController));
router.get('/:categoryName/:noticesId', ctrlWrapper(noticesByIdController));
router.post(
  '/',
  //   upload.single('avatar'),
  authenticate,
  validation(schemas.addNoticesSchema),
  ctrlWrapper(addNewNoticesController)
);
router.delete(
  '/:categoryName/:noticesId',
  authenticate,
  ctrlWrapper(deleteNoticesController)
);
router.delete('/:noticesId/favorite', ctrlWrapper(removeFromFavoriteNotices));
router.patch(
  '/:noticesId/favorite',

  validation(schemas.schemaFavoritePatch),
  ctrlWrapper(addToFavoriteNoticesController)
);

module.exports = router;
