var express = require('express')
const UserController = require('../../controllers/UserController')


var UserRouter = express.Router();
//用户登录注册
UserRouter.post('/admin/user/login', UserController.login)
UserRouter.post('/admin/user/register', UserController.register)

//用户签到
UserRouter.post('/admin/user/sign', UserController.sign)
    //签到列表
UserRouter.get('/admin/user/getlist', UserController.getList)
    //修改考勤
UserRouter.put('/admin/user/update', UserController.update)
    //教师修改考勤
UserRouter.put('/admin/user/update', UserController.updateO)



module.exports = UserRouter