const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseType = {
    Cname: String,
    CID: String,
    gClassT: Number,
    DT: Number,
    GClass: String

}
const CourseModel = mongoose.model("course", new Schema(CourseType))
module.exports = CourseModel