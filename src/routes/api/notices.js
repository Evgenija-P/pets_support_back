// const express = require("express");
const { schemas } = require('../../../schemas/noticesSchemas');
const ctrl = require('../../controllers/noticesController');
// const { upload } = require("../../middlewares/upload");
const { validation } = require('../../../middlewares');

const express = require('express');
const router = express.Router();
// router.get('/', ctrl.getNoticesListController);
router.get('/', ctrl.getNoticesByCategory);

// router.get('/:noticesId', authenticate, asyncWrapper(noticesByIdController));
router.get('/:noticesId', ctrl.noticesByIdController);
router.post(
  '/',
  //   upload.single('avatar'),
  validation(schemas.addNoticesSchema),
  ctrl.addNewNoticesController
);
router.delete('/:noticesId', ctrl.deleteNoticesController);

router.patch(
  '/:noticesId/favorite',

  validation(schemas.schemaFavoritePatch),
  ctrl.changeFavoriteNoticesController
);

module.exports = router;
