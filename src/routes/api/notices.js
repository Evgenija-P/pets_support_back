const express = require('express');
const router = express.Router();
const { schemas } = require('../../schemas');
const {
  ctrlWrapper,
  authenticate,
  validation,
  validateId,
  upload,
} = require('../../middlewares');
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
  upload.single('petImage'),
  validation(schemas.addNoticesSchema),
  ctrlWrapper(addNewNoticesController)
);

router.get('/favorite', ctrlWrapper(getFavoriteNotices));

router.get('/own', authenticate, ctrlWrapper(getNoticesByOwner));

// router.get('/:noticesId', authenticate, asyncWrapper(noticesByIdController));

router.delete(
  '/own/:noticesId',
  authenticate,
  validateId,
  ctrlWrapper(deleteNoticesController)
);

router.delete('/:noticesId/favorite', ctrlWrapper(removeFromFavoriteNotices));

router.post(
  '/:noticesId/favorite',
  authenticate,
  validateId,
  // validation(schemas.schemaFavoritePatch),
  ctrlWrapper(addToFavoriteNoticesController)
);

module.exports = router;
