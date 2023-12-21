<template>
  <div class="kao">
    <el-button
    @click="clear"
    class="clear"
      type="primary"
      link
      >清空</el-button
    >
    <div class="left">
      <div class="header">
        <div class="m-4">
          <el-cascader
            v-model="myClass"
            :options="options"
            @change="handleChange"
            :show-all-levels="false"
            placeholder="选择班级"
            style="width: 180px; height: 32px; margin: 0 5px 0 0"
          />
        </div>
        <el-config-provider :locale="locale"  >
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            :shortcuts="shortcuts"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-config-provider>
        <el-select v-model="dijijieke" placeholder="选择第几节课" style="width: 250px;margin: 0 0 0 5px" >
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select> 
        
        <el-button type="primary" style="margin: 0 0 0 5px" @click="check('11')">对比</el-button>

        
        <el-input
          v-model="seach"
          style="width: 180px; height: 32px; margin: 0 0 0 5px"
          class="input"
          placeholder="输入学生ID"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
       
        <el-button type="primary" style="margin: 0 0 0 5px" @click="check(false)">查找</el-button>
      </div>
      <div class="l">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="studentClass" label="班级" width="180"/>
          <el-table-column prop="name" label="姓名"/>
          <el-table-column prop="Cname" label="科目"/>
          <el-table-column label="类型">
            <template #default="scope">
              <el-tag class="ml-2" type="success" v-if="scope.row.status=='1'">正常</el-tag>
              <el-tag class="ml-2" type="danger" v-if="scope.row.status=='0'">旷课</el-tag>
              <el-tag class="ml-2" type="warning" v-if="scope.row.status=='2'">迟到</el-tag>
            </template>
          </el-table-column>
   

          <el-table-column fixed="right" label="操作" >
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleClickX(scope.$index)"
                >修改</el-button
              >
             
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="rigth">
        <el-card class="box-card">
          <el-card v-if="ratioClass.length != 0" class="box-cards" style="margin:0 0 10px 0" v-for="(item,index) in ratioClass" :key="index">
            <span class="xx" @click="shut(index)">x</span>
            <div>时间：{{item.time}}</div>
            <div>班级：{{item.studentClass}}</div>
            <div>课目：{{item.Cname}}</div>
            <div>节课：{{item.gClassT}}点</div>
            <div>迟到节数：<span style="color:#eebe77">{{item.statusC}}</span></div>
            <div>旷课节数：<span style="color:#f56c6c">{{item.statusK}}</span></div>
          </el-card>
          <div style="text-align:center" v-else>无</div>
        </el-card>
      </div>
    </div>
    <el-dialog
    v-model="dialogVisible"
    title="修改考勤"
    width="20%"
  >
    <div class="dialog">
     <div>姓名：{{dialog.name}}</div>
     <div>学号：{{dialog.studentID}}</div>
     <div>考勤：{{dialog.status=='0'?'旷课':dialog.status=='2'?'迟到':'正常'}}</div>
     <div style="margin:18px 0 0 0 ">
      <div>修改为：</div>
    <el-button type="primary" @click="handleX('1')">正常</el-button>
    <el-button type="warning" @click="handleX('2')">迟到</el-button>
    <el-button type="danger" @click="handleX('0')">旷课</el-button></div>
    </div>
  </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from 'element-plus'
const myClass = ref("");
const options = [
  {
    value: "guide",
    label: "21级",
    children: [
      {
        value: "disciplines",
        label: "信息工程系",
        children: [
          {
            value: "21计算机网络2班",
            label: "计算机网络二班",
          },
          {
            value: "21计算机网络一班",
            label: "计算机网络一班",
          },
        ],
      },
    ],
  },
];
//获取当前选择的班级
const handleChange = (value) => {
  myClass.value = value[2];
};

//搜索
import { Calendar, Search } from "@element-plus/icons-vue";
//学生ID
const seach = ref("");

//第几节课
const options1 = [
  {
    value: "8",
    label: "8点",
  },
  {
    value: "9",
    label: "9点",
  },
  {
    value: "10",
    label: "10点",
  },
  {
    value: "12",
    label: "12点",
  },
  {
    value: "14",
    label: "14点",
  },
];
const dijijieke = ref("");

//选择时间
import zhCn from "element-plus/es/locale/lang/zh-cn";
import axios from "../util/axios.config";
const value2 = ref("");
const locale = zhCn;
const shortcuts = [
  {
    text: "上一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "上一个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
];

//展示数据
var tableData = ref([])

//对比数据
const ratioClass = ref([])
 

//查找
const check =async (e)=>{
  
  var Info = {
    studentClass:myClass.value,
    startTime:Array.from(value2.value)[0],
    endTime:Array.from(value2.value)[1],
    gClassT:dijijieke.value,
    studentID:seach.value
  }
  if(Info.startTime == undefined &&Info.endTime==undefined){
   return  ElMessage({
    message: '时间不能为空！',
    type: 'warning',
  })
  }
  const res = await axios.get(`/admin/user/getlist?studentClass=${Info.studentClass}&startTime=${Info.startTime}&endTime=${Info.endTime}&gClassT=${Info.gClassT}&studentID=${Info.studentID}`)
  tableData.value = (res.data.result.filter(item=>item.status != '1'))
  console.log(tableData.value );
  if(e=='11'){
    if(tableData.value.length ==0){
      return ElMessage({
    message: '暂无数据！',
    type: 'warning',
  })
    }
  if (seach.value.length!=0) {
    clear()
    return ElMessage({
    message: '只支持班级对比！',
    type: 'warning',
  })
  }
    let demo = {
      time:Info.startTime + '至' + Info.endTime ,
      studentClass:tableData.value[0].studentClass,
      Cname:tableData.value[0].Cname,
      gClassT:tableData.value[0].gClassT,
      ClassNum:tableData.value.length,
      statusC:tableData.value.filter(obj => obj.status==='2').length,
      statusK:tableData.value.filter(obj => obj.status==='0').length,
     }
     ratioClass.value.unshift(demo)
  }
}

//清空
const clear = ()=>{
  seach.value=''
  myClass.value=''
  value2.value='' 
  dijijieke.value=''
}

const dialogVisible = ref(false)

//操作
const handleClickX=(e)=>{
  dialogVisible.value=true
  dialog.value=tableData.value[e]
}
//修改考勤
const handleX=async (e)=>{
console.log(e);
const res = await axios.put('/admin/user/update',{_id:dialog.value._id,status:e})
dialogVisible.value=false
check()
}

//dialog
const dialog = ref({})
//对比关闭
const shut = (e)=>{
  ratioClass.value.splice(e,1)
}
</script>

<style scoped lang="scss">
.clear{
  position: absolute;
  top: 5px;
  right: 25px;
}
.kao {
  position: relative;
  width: 100%;
  height: 100%;
  .left {
    float: left;
    width: 1000px;
    height: 100%;
    padding: 25px;
    .header {
      display: flex;
      width: 1000px;
      height: 50px;
    }
    .l {
      float: left;
      width: 680px;
      height: 600px;
    }
    .rigth {
      float: right;
      width: 300px;
      height: 600px;
    }
  }
}
.box-card {
  height: 600px;
  position: relative;
}
.box-cards {
  position: relative;
}
.xx{
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 15px;
}
.dialog{
  width: 100%;
  height: 120px;
}
</style>
