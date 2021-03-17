const express = require('express')
require('./db/mongoose')
const Student = require('./models/student')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/students', async (req, res) => {
    const student = new Student(req.body)

    try {
        await student.save()
        res.send(student)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find({ section: 1 })
        res.send(students)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/students/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const student = await Student.findById(_id)
        if (!student) {
            return res.status(404).send()
        }
        res.send(student)
    } catch (e) {
        res.status(500).send()
    }
})

app.patch('/students/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'rollno', 'section', 'cgpa']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!student) {
            return res.status(404).send()
        }
        res.send(student)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        if (!student) {
            return res.status(404).send()
        }
        res.send(student)
    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})