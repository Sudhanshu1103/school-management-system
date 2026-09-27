const express = require('express');
const router = express.Router();
const { getTeachers, getTeacherById, createTeacher, updateTeacher, deleteTeacher } = require('../controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getTeachers)
  .post(protect, createTeacher);

router.route('/:id')
  .get(getTeacherById)
  .put(protect, updateTeacher)
  .delete(protect, deleteTeacher);

module.exports = router;
