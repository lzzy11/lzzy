const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserType = {
    studentID: String,
    password: String,
    name: String,
    studentClass: String,
    vip: Number
}

const UserModel = mongoose.model("student", new Schema(UserType))
module.exports = UserModel