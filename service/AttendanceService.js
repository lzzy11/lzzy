const { update } = require("../controllers/UserController");
const AttendanceModel = require("../models/AttendanceModel");
const AttendanceService = {
    check: async({ month, day, gClassT, studentClass }) => {
        return AttendanceModel.find({
            month,
            day,
            gClassT,
            studentClass
        })
    },
    getList: async({ studentClass, startTime, endTime, gClassT, studentID }) => {
        if (studentClass.length == 0 && gClassT.length == 0) {
            console.log('时间-学生');
            return AttendanceModel.find({ time: { $gte: new Date(startTime), $lte: new Date(endTime) }, studentID })
        } else if (gClassT.length == 0) {
            console.log('班级-时间-学生');
            return AttendanceModel.find({ time: { $gte: new Date(startTime), $lte: new Date(endTime) }, studentClass, studentID })
        } else if (studentID.length == 0) {
            console.log('班级-时间-第几节课')
            return AttendanceModel.find({ time: { $gte: new Date(startTime), $lte: new Date(endTime) }, gClassT, studentClass })

        } else {
            console.log('全部条件');
            return AttendanceModel.find({ time: { $gte: new Date(startTime), $lte: new Date(endTime) }, gClassT, studentClass, studentID })

        }


    },
    sign: async({ month, day, studentClass, studentID, status, AT }) => {
        return AttendanceModel.updateOne({ month, day, studentClass, studentID }, {
            status,
            AT
        })
    },
    update: async({ _id, status }) => {
        return AttendanceModel.updateOne({ _id }, {
            status
        })
    }

};

module.exports = AttendanceService;