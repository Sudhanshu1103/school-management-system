const express = require('express');
const router = express.Router();
const { getGalleries, getGalleryById, createGallery, updateGallery, deleteGallery } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getGalleries)
  .post(protect, createGallery);

router.route('/:id')
  .get(getGalleryById)
  .put(protect, updateGallery)
  .delete(protect, deleteGallery);

module.exports = router;
