const Student = require('../models/Student');
exports.getStudents = async (req, res, next) => {
    try {
        const page = +req.query.page - 1;
        const limit = +req.query.limit;
        const sortby = req.query.sortby;
        const order = req.query.order;
        const searchby = req.query.searchby;
        const search = req.query.search;
        const obj = {};
        obj[searchby] = search;
        const students = await Student.find(obj)
            .skip(page * limit)
            .limit(limit)
            .sort(`${order === 'asc' ? '' : '-'}${sortby}`)
            .exec();

        res.status(200).json({ success: true, data: students });
        // let articles = await Article.findAll().paginate({page: page, limit: limit}).exec();
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};
exports.addStudent = async (req, res, next) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ success: true, data: student });
    } catch (e) {
        res.status(400).json({ success: false, error: e.message });
    }
};

exports.getStudent = async (req, res, next) => {
    const _id = req.params.id;
    try {
        const student = await Student.findById(_id);
        if (!student) {
            return res.status(404).send();
        }
        res.send(student);
    } catch (e) {
        res.status(500).send();
    }
};

exports.updateStudent = async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'rollno', 'section', 'cgpa'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!student) {
            return res.status(404).send();
        }
        res.send(student);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).send();
        }
        res.send(student);
    } catch (e) {
        res.status(500).send();
    }
};