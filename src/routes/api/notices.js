// const express = require("express");
const { schemas } = require('../../schemas');
const { ctrlWrapper } = require('../../middlewares');
const {
  getNoticesByCategory,
  addNewNoticesController,
  noticesByIdController,
  deleteNoticesController,
  addToFavoriteNoticesController,
  getFavoriteNotices,
  removeFromFavoriteNotices,
} = require('../../controllers');
// const { upload } = require("../../middlewares/upload");
const { validation } = require('../../middlewares');

const express = require('express');

const router = express.Router();

// router.get('/', ctrl.getNoticesListController);

router.get('/:categoryName', ctrlWrapper(getNoticesByCategory));
router.get('/favorite', ctrlWrapper(getFavoriteNotices));

// router.get('/:noticesId', authenticate, asyncWrapper(noticesByIdController));
router.get('/:categoryName/:noticesId', ctrlWrapper(noticesByIdController));
router.post(
  '/',
  //   upload.single('avatar'),
  validation(schemas.addNoticesSchema),
  ctrlWrapper(addNewNoticesController)
);
router.delete('/:noticesId', ctrlWrapper(deleteNoticesController));
router.delete('/:noticesId/favorite', ctrlWrapper(removeFromFavoriteNotices));
router.patch(
  '/:noticesId/favorite',

  validation(schemas.schemaFavoritePatch),
  ctrlWrapper(addToFavoriteNoticesController)
);

module.exports = router;
