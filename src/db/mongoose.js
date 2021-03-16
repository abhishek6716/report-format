const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/report-format-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

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

const s2 = new Student({
    name: ' n1 t1 ',
    rollno: 35,
    section: 2
})

s2.save().then(() => {
    console.log(s2)
}).catch((error) => {
    console.log('Error', error)
})