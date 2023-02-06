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

const { petsSchemas } = require('../../schemas');

router.post(
  '/',
  authenticate,
  upload.single('petPhoto'),
  validation(petsSchemas.addPetSchema),
  ctrlWrapper(ctrl.addPet)
);

router.delete('/:petId', authenticate, validateId, ctrlWrapper(ctrl.removePet));

module.exports = router;
