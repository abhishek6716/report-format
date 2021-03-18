const express = require('express');
const {
    getStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudent,
} = require('../controllers/students');

const router = express.Router();

router.route('/').get(getStudents).post(addStudent);
router.route('/:id').get(getStudent).patch(updateStudent).delete(deleteStudent);
module.exports = router;