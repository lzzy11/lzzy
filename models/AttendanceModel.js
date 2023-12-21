const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AttendanceType = {
    name: String,
    studentID: String,
    studentClass: String,
    DT: Number, //周几的课
    AT: String, //打卡分钟
    gClassT: Number,
    Cname: String, //科目
    status: String, //状态
    month: Number,
    day: Number,
    time: Date,
    grade: String, //年级
    profession: String //专业

}

const AttendanceModel = mongoose.model("Attendance", new Schema(AttendanceType))
module.exports = AttendanceModel