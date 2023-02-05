const express = require('express');
const router = express.Router();

const { pets: ctrl } = require('../../controllers');
const {
  authenticate,
  validation,
  validateId,
  upload,
} = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');

const {
  pet: { petJoiSchema },
} = require('../../models');

router.post(
  '/',
  authenticate,
  validation(petJoiSchema),
  upload.single('avatar'),
  ctrlWrapper(ctrl.addPet)
);

router.delete('/:petId', authenticate, validateId, ctrlWrapper(ctrl.removePet));

module.exports = router;
