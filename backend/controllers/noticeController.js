const Notice = require('../models/Notice');

// @desc    Get all notices
// @route   GET /api/notices
// @access  Public
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.status(200).json({ success: true, count: notices.length, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get notice by ID
// @route   GET /api/notices/:id
// @access  Public
exports.getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }
    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create notice
// @route   POST /api/notices
// @access  Protected
exports.createNotice = async (req, res) => {
  try {
    const { title, description, category, date } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Please provide title and description' });
    }

    const notice = await Notice.create({
      title,
      description,
      category: category || 'General',
      date: date || Date.now()
    });

    res.status(201).json({ success: true, message: 'Notice created successfully', data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update notice
// @route   PUT /api/notices/:id
// @access  Protected
exports.updateNotice = async (req, res) => {
  try {
    let notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, message: 'Notice updated successfully', data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete notice
// @route   DELETE /api/notices/:id
// @access  Protected
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }
    await Notice.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
