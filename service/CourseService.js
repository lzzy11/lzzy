const CourseModel = require('../models/CourseModel')
const CourseService = {
    addCourse: async({ Cname, CID, gClassT, DT, GClass }) => {
        return CourseModel.create({
            Cname,
            CID,
            gClassT,
            DT,
            GClass
        })
    },
    getList: async({ DT, GClass }) => {
        return CourseModel.find({
            DT,
            GClass
        }).sort({ gClassT: 1 })
    },
    //打卡查找课程
    check: async({ DT, Cname, GClass, gClassT }) => {
        return CourseModel.find({
            DT,
            Cname,
            GClass,
            gClassT
        })
    }

}
module.exports = CourseService