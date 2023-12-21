const CourseService = require('../service/CourseService')

const CourseController = {
    add: async(req, res) => {
        await CourseService.addCourse(req.body)
        res.send('ok')
    },
    getList: async(req, res) => {
        const { DT, GClass } = req.query
        const result = await CourseService.getList({ DT, GClass })
        if (result.length) {
            res.send({
                code: 1,
                result
            })
        } else {
            res.send({
                code: '-1',
                msg: "无"
            })
        }
    }
}
module.exports = CourseController