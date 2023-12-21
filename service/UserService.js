const UserModel = require('../models/UserModel')

const UserService = {
    login: async({ studentID, password }) => {
        return UserModel.find({
            studentID,
            password

        })
    },
    register: async({ password, name, studentClass, studentID, vip }) => {
        return UserModel.create({
            password,
            name,
            studentClass,
            studentID,
            vip
        })
    },
    check: async({ studentID }) => {
        return UserModel.find({
            studentID
        })
    },
    getListE: async({ studentClass, vip }) => {
        return UserModel.find({ studentClass, vip })
    }

}
module.exports = UserService