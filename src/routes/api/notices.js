const express = require('express');
const router = express.Router();
const { schemas } = require('../../schemas');
const { ctrlWrapper, authenticate, validation } = require('../../middlewares');
const {
  getNoticesByCategory,
  getAllNoticesListController,
  addNewNoticesController,
  noticesByIdController,
  deleteNoticesController,
  addToFavoriteNoticesController,
  getFavoriteNotices,
  removeFromFavoriteNotices,
  getNoticesByOwner,
} = require('../../controllers');

router.get('/', ctrlWrapper(getAllNoticesListController));

// router.get('/:noticesId', ctrlWrapper(noticesByIdController));

router.get('/:categoryName', ctrlWrapper(getNoticesByCategory));

router.post(
  '/',
  authenticate,
  validation(schemas.addNoticesSchema),
  ctrlWrapper(addNewNoticesController)
);

router.get('/favorite', ctrlWrapper(getFavoriteNotices));

router.get('/own', authenticate, ctrlWrapper(getNoticesByOwner));

// router.get('/:noticesId', authenticate, asyncWrapper(noticesByIdController));

router.delete(
  '/:noticesId',
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
