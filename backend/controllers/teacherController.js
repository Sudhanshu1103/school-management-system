const Teacher = require('../models/Teacher');

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Public
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: teachers.length, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single teacher by ID
// @route   GET /api/teachers/:id
// @access  Public
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create teacher
// @route   POST /api/teachers
// @access  Protected
exports.createTeacher = async (req, res) => {
  try {
    const { name, subject, designation, bio, image } = req.body;
    if (!name || !subject || !designation) {
      return res.status(400).json({ success: false, message: 'Please provide name, subject, and designation' });
    }

    const teacher = await Teacher.create({
      name,
      subject,
      designation,
      bio: bio || '',
      image: image || ''
    });

    res.status(201).json({ success: true, message: 'Teacher created successfully', data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update teacher
// @route   PUT /api/teachers/:id
// @access  Protected
exports.updateTeacher = async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, message: 'Teacher updated successfully', data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete teacher
// @route   DELETE /api/teachers/:id
// @access  Protected
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }
    await Teacher.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
