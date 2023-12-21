const UserService = require("../service/UserService");
const CourseService = require("../service/CourseService");

const AttendanceService = require('../service/AttendanceService')
const AttendanceModel = require("../models/AttendanceModel");

const JWT = require('../util/JWT')

const UserController = {
    //登录接口
    login: async(req, res) => {
        var result = await UserService.login(req.body);
        if (result.length === 0) {
            return res.send({
                code: '-1',
                msg: '账号密码错误！'
            });
        }
        const token = JWT.generate({
            studentID: result[0].studentID,
            username: result[0].name
        }, "10d")
        res.header("Authorization", token)

        res.send({
            code: '1',
            msg: '登录成功！',
            data: {
                studentID: result[0].studentID,
                name: result[0].name,
                studentClass: result[0].studentClass,
                vip: result[0].vip
            }
        });
    },
    register: async(req, res) => {
        const { studentID } = req.body
        const r = await UserService.check({ studentID })
        if (r.length != 0) return res.send({ code: '0', msg: "账号已被注册！" })
        await UserService.register(req.body);
        res.send({
            code: '1',
            msg: '注册成功'
        })
    },
    //签到接口
    sign: async(req, res) => {
        const { Cname, studentClass, gClassT, studentID, CID, DT } = req.body;
        //查找当天有没有这个课
        const AC = await CourseService.check({
            Cname,
            GClass: studentClass,
            gClassT,
            DT,
        });
        var now = new Date();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hh = now.getHours(); //时
        var mm = now.getMinutes(); //分
        var ss = now.getSeconds();
        if (AC.length != 0) {
            const AB = await AttendanceService.check({ month, day, gClassT, studentClass })
                //第一个打卡，找出这个班级所有学生,并去掉密码，添加上Cname, gClassT, DT, month, day, status作为标记，添加进Attendance
            if (AB.length === 0) {
                //筛选出来学生的
                let vip = '0'
                const data = await UserService.getListE({ studentClass, vip });
                let status = '0'
                let AT = ''
                const updatedData = data.map((obj) => {
                    const { _id, password, __v, ...rest } = obj._doc;
                    return {...rest, Cname, gClassT, DT, month, day, status, AT, time: now };
                });
                console.log("第一次创建");
                await AttendanceModel.insertMany(updatedData)
            }
            let status = mm < 30 ? (mm <= 5 ? 1 : 2) : 0;
            let AT = mm
            const resultEnd = await AttendanceService.sign({ month, day, studentClass, studentID, status, AT })

            res.send({
                code: 1,
                msg: "打卡成功！",
                status
            });

            return;
        }
        res.send({ code: -1, msg: "打卡失败，无该课程！" });
    },
    //获取打卡签到列表接口
    getList: async(req, res) => {
        const { studentClass, startTime, endTime, gClassT, studentID } = req.query
        const result = await AttendanceService.getList({ studentClass, startTime, endTime, gClassT, studentID })
        res.send({
            code: '1',
            result
        })
    },
    update: async(req, res) => {
        const { _id, status } = req.body
        const result = await AttendanceService.update({ _id, status })
        res.send({
            code: '1',
            msg: '修改成功！',
            result
        })
    },
    updateO: async(req, res) => {
        const { _id, status } = req.body
        const result = await AttendanceService.update({ _id, status })
        res.send({
            code: '1',
            msg: '修改成功！',
            result
        })
    }
}
module.exports = UserController;