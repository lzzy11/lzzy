const JWT = require('../util/JWT')




function start(server) {
    const io = require('socket.io')(server);
    io.on('connection', (socket, req) => {



        // console.log(socket.handshake.query.token);//获取token
        const payload = JWT.verify(socket.handshake.query.token)


        const InFo = {
            name: payload.username,
            studentClass: socket.handshake.query.studentClass,
            id: ''
        }
        const WebSocketType = {
            Error: 0, //错误
            GroupList: 'a', //列表
            GroupChat: 'b', //群聊
            SingleChat: 'c', //私聊
            seatId: 'd' //选择座位
        }

        function WebSocketTypeXX(x, y) {
            return x + y
        }
        if (payload) {
            socket.user = InFo
                //进发送信息
            sendAll(io, WebSocketTypeXX(InFo.studentClass, WebSocketType.GroupList))
            socket.emit('welcome', '欢迎来到课堂！')
        } else {
            socket.emit(WebSocketType.Error, createMessage(null, "token过期"))

        }
        //座位
        socket.on(WebSocketTypeXX(InFo.studentClass, WebSocketType.seatId), (msg) => {
            socket.user.id = msg.data
            sendAll(io, WebSocketTypeXX(InFo.studentClass, WebSocketType.GroupList))
        })

        //列表
        socket.on(WebSocketType.GroupList, () => {
                console.log(Array.from(io.sockets.sockets).map(item => item[1].user))
                    // socket.emit(WebSocketType.GroupList)
            })
            //群聊       
        socket.on(WebSocketTypeXX(InFo.studentClass, WebSocketType.GroupChat), (msg) => {
                //给所有人发
                // io.sockets.emit(WebSocketTypeXX(InFo.studentClass, WebSocketType.GroupChat), createMessage(socket.user.name, msg.data))

                //除了自己不发，其他人发
                socket.broadcast.emit(WebSocketTypeXX(InFo.studentClass, WebSocketType.GroupChat), createMessage(socket.user.name, msg.data))
            })
            //私聊
        socket.on(WebSocketTypeXX(InFo.studentClass, WebSocketType.SingleChat), (msgObj) => {
            Array.from(io.sockets.sockets).forEach(item => {
                if (item[1].user.name === msgObj.to) {
                    item[1].emit(WebSocketTypeXX(InFo.studentClass, WebSocketType.SingleChat), createMessage(socket.user.name, msgObj.data))
                }
            })
        })

        socket.on("disconnect", () => {
            sendAll(io)
        })
    })
}



const WebSocketType = {
    Error: 0, //错误
    GroupList: 1, //获取列表
    GroupChat: 2, //群聊
    SingleChat: 3, //私聊
    seatId: 4 //选择座位
}

function createMessage(user, data) {
    return {
        user,
        data
    }
}




//群发
function sendAll(io, e) {
    io.sockets.emit(e, createMessage(null, Array.from(io.sockets.sockets).map(item => item[1].user).filter(item => item)))
}
module.exports = start