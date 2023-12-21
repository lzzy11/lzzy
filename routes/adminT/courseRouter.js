var express = require('express')
const CourseController = require('../../controllers/CourseController')
var CourseRouter = express.Router();
//添加课程
CourseRouter.post("/admin/course/add", CourseController.add)
    //获取课表，需要携带 DT 星期几，GClass上课的班级
CourseRouter.get("/admin/course/getlist", CourseController.getList)


module.exports = CourseRouter