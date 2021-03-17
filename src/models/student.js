const mongoose = require('mongoose')
const validator = require('validator')

const Student = mongoose.model('Student', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    rollno: {
        type: Number,
        required: true
    },
    section: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0 || value > 5) {
                throw new Error('Enter valid section!')
            }
        }
    },
    cgpa: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if (value < 0 || value > 10) {
                throw new Error('Enter valid cgpa!')
            }
        }
    }
})


module.exports = Student