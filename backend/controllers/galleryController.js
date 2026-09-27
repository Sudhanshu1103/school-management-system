const Gallery = require('../models/Gallery');

// @desc    Get all galleries
// @route   GET /api/galleries
// @access  Public
exports.getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ date: -1 });
    res.status(200).json({ success: true, count: galleries.length, data: galleries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get gallery by ID
// @route   GET /api/galleries/:id
// @access  Public
exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.status(200).json({ success: true, data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new gallery item
// @route   POST /api/galleries
// @access  Protected
exports.createGallery = async (req, res) => {
  try {
    const { title, imagesUrl, date } = req.body;
    if (!title || !imagesUrl) {
      return res.status(400).json({ success: false, message: 'Please provide title and imagesUrl' });
    }

    const gallery = await Gallery.create({
      title,
      imagesUrl,
      date: date || Date.now()
    });

    res.status(201).json({ success: true, message: 'Gallery item created successfully', data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update gallery item
// @route   PUT /api/galleries/:id
// @access  Protected
exports.updateGallery = async (req, res) => {
  try {
    let gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, message: 'Gallery item updated successfully', data: gallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/galleries/:id
// @access  Protected
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
