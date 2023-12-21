<template>
 <div class="seat">
    <span class="guodao"
      >过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</span
    >
    <span class="guodaoR"
      >过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</span
    >
    <el-card class="box-cards">
      <div class="jiangtai">讲台</div>
      <ul class="listF">
        <li v-for="item in seat" :key="item.id" @click="handleSeat(item.id)" @contextmenu.prevent.stop="RClick(item)">
          {{ item.name }}
          <span v-show="item.id != item.name"></span>
        </li>
      </ul> 
    </el-card>
    <div class="chatInput">
      <el-input
    v-model="chatText"
    autosize
    type="textarea"
    placeholder="输入内容"
    style="z-index:999"
  /> <span class="TX">{{nameS}} <span @click="nameS = ''" v-show="nameS.length !=0">x</span></span>  <el-button type="primary" class="BBB" @click="send">发送</el-button>
     </div>
    <div class="chat">
       <ul>
        <li v-for="(item,index) in messageList" :key="index"><span style="color:red;">{{item.type}}<span v-show="item.nameS">-{{ item.nameS }}</span></span>&nbsp;&nbsp;<span style="color:skyblue">{{item.user}}</span>&nbsp;:&nbsp;{{item.data}}<span style="float:right;
    cursor: pointer;
        color:#409eff;" @click="sendReply(item.user)">回复</span></li>
       </ul>
    </div>
    <el-dialog
    v-model="dialogVisible"
    width="20%"
  >
      <div class="AA" style="height:180px">
            <h2>{{Myname}}</h2>
            <el-button type="primary" style="margin:25px 0 15px 0" @click="SendS">发送消息</el-button>
            <el-button type="success"  style="margin:0 0 15px 0">评分评价</el-button>
            <el-button type="warning">修改考勤</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { onMounted,reactive,computed,ref,h } from "vue";
import { ElNotification } from 'element-plus'
var storedObj = JSON.parse(localStorage.getItem("user"));
const studentClass = storedObj.studentClass
//弹出框--------------------------------------------------------------start
const dialogVisible = ref(false)
//弹出框名字
const Myname = ref('')
//私聊名字
const nameS = ref('')
//右键弹出
const RClick=(e)=>{
  if(storedObj.vip===0){
    return
  }
  Myname.value = e.name
  dialogVisible.value=true
}
//选择私聊发送按钮
const SendS = ()=>{
   nameS.value = Myname.value
   dialogVisible.value = false
}
//弹出框--------------------------------------------------------------end

//空座位
var seat = reactive([
  {id:1,name:1},
  {id:2,name:2},
  {id:3,name:3},
  {id:4,name:4},
  {id:5,name:5},
  {id:6,name:6},
  {id:7,name:7},
  {id:8,name:8},
  {id:9,name:9},
  {id:10,name:10},
  {id:11,name:11},
  {id:12,name:12},
  {id:13,name:13},
  {id:14,name:14},
  {id:15,name:15},
  {id:16,name:16},
  {id:17,name:17},
  {id:18,name:18},
  {id:19,name:19},
  {id:20,name:20},
  {id:21,name:21}, 
  {id:22,name:22},
  {id:23,name:23},
  {id:24,name:24},
  {id:25,name:25},
  {id:26,name:26},
  {id:27,name:27},
  {id:28,name:28},
  {id:29,name:29},
  {id:30,name:30},
  {id:31,name:31}, 
  {id:32,name:32},
  {id:33,name:33},
  {id:34,name:34},
  {id:35,name:35},
  {id:36,name:36},
  {id:37,name:37},
  {id:38,name:38},
  {id:39,name:39},
  {id:40,name:40},
])

//返回回来的座位
var seatC = reactive([])
//消息列表
const messageList=reactive([])
onMounted(()=>{
  if(storedObj.vip===0){
    ElMessage({
    message: '请选择座位！',
    type: 'warning',
  })
  }
 
})


//状态
const WebSocketType = {
            Error: 0, //错误
            GroupList: 'a',//列表
            GroupChat: 'b',//群聊
            SingleChat: 'c',//私聊
            seatId:'d'//选择座位
        }
//信息        
const createMessage=(data, to)=> {
    return {
        data,
        to
    }
}
//状态加班级  方便分开班级发送消息
function WebSocketTypeXX(x, y) {
            return x + y
        }

import { io } from "socket.io-client";
const token = localStorage.getItem('token')
const socket = io(`/?token=${token}&studentClass=${studentClass}`);

//获取座位列表
socket.on(WebSocketTypeXX(studentClass, WebSocketType.GroupList), (msgObj) => {
            seatC = msgObj.data
            seatC.forEach(replaceObj => {
        const index = seat.findIndex(seatObj => seatObj.id === replaceObj.id);
       if(index !== -1) {
       seat.splice(index, 1, replaceObj);
}

});
        })
//接收群聊信息
socket.on(WebSocketTypeXX(studentClass, WebSocketType.GroupChat),(msg)=>{
  var msgObj = msg
  msgObj.type = '全'
messageList.unshift(msgObj)
ElNotification({
    title: `${msgObj.type}-${msgObj.user}`,
    message: h('i', { style: 'color: teal' }, msgObj.data),
  })
})
//发送群聊信息
const chatText = ref("")
const send = ()=>{
  if(chatText.value.length === 0 ){
    return  ElMessage({
    message: '不能为空！',
    type: 'warning',
  })
  }
  
   if(nameS.value.length ===0){
    messageList.unshift({type:'全',user:storedObj.name,data:chatText.value})
  socket.emit(WebSocketTypeXX(studentClass, WebSocketType.GroupChat),createMessage(chatText.value))
   } else {
    console.log(nameS);
    messageList.unshift({type:'私',nameS:nameS.value,user:storedObj.name,data:chatText.value})
    socket.emit(WebSocketTypeXX(studentClass, WebSocketType.SingleChat),createMessage(chatText.value,nameS.value))//e需要

   }
  chatText.value=''
}


//回复老师私聊
const sendSingle = (e)=>{
socket.emit(WebSocketTypeXX(studentClass, WebSocketType.SingleChat),createMessage(chatText.value,e))//e需要
}

//接收私聊消息
socket.on(WebSocketTypeXX(studentClass, WebSocketType.SingleChat),(msg)=>{
  var msgObj = msg
  msgObj.type = '私'
  msgObj.nameS = storedObj.name
messageList.unshift(msgObj)
ElNotification({
    title: `${msgObj.type}-${msgObj.user}`,
    message: h('i', { style: 'color: teal' }, msgObj.data),
  })
})

//回复
const sendReply=(e)=>{
  nameS.value =e
}


//选择座位
const TT = ref(true)
const handleSeat=(e)=>{
  if(storedObj.vip===0){
  if(!TT.value){return  ElMessage({
    message: '已选座位',
    type: 'warning',
  })};
  if(!seat.find((item) => item.name === e)){return  ElMessage({
    message: '座位已被占领',
    type: 'warning',
  })};;
 
  socket.emit(WebSocketTypeXX(studentClass, WebSocketType.seatId),createMessage(e))
  TT.value=false
}}
</script>

<style scoped lang="scss">//scss是css的预处理器
li {
  list-style: none;
}
.seat {
  position: relative;
  height: 100%;
  width: 100%;
  .box-cards {
    width: 900px;
    height: 425px;
    margin-left: 70px;
    .listF {
      list-style-type: none;
      padding: 0;
      margin: 0;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        position: relative;
        width: calc(12.5% - 10px);
        height: 50;
        border: 1px solid black;
        text-align: center;
        line-height: 50px;
        margin-bottom: 10px;
        span{
         position: absolute;
         left: 5px;
          top: 5px;
          display: block;
          width: 5px;
          height: 5px;
          background: rgb(17, 226, 10);
          border-radius: 5px ;
        }
      }
    }
  }
}
.listF li:nth-child(8n + 2),
.listF li:nth-child(8n + 6) {
  margin-right: 15px;
}
.guodao {
  position: absolute;
  left: 296px;
  top: 180px;

  writing-mode: vertical-lr;
}
.guodaoR {
  position: absolute;
  left: 728px;
  top: 180px;

  writing-mode: vertical-lr;
}
.jiangtai {
  margin: 0 auto;
  width: 160px;
  text-align: center;
  border: 1px solid #000;
  height: 30px;
  margin-bottom: 10px;
}
.el-button + .el-button {
  margin-left: 0;
}
.chat{
  position: absolute;
  bottom: 5px;
  left: 65px;
  width: 910px;
  height: 210px;
  overflow: auto;
}
.chatInput{
  position: relative;
  padding-top: 10px;
  margin: 0 auto;
  width: 910px;
  
  .BBB{
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
.el-textarea{
  width: 770px;
}
.AA{
  display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
}
.TX{
  display: inline-block;
  width: 60px;
  position: relative;
  span{
    position: absolute;
    top: -14px;
    right: 0;
    cursor: pointer;
  }
}
</style>

