<template>
  <div class="user">
    <el-card class="userC" shadow="hover"> 
      <template #header>
      <div class="card-header">
        <span>个人信息</span>
        <el-button class="button" type="primary" @click="submit">确定修改</el-button>
      </div>
    </template>
     <el-input v-model="user.name" placeholder="姓名" style="margin:20px 0 10px 0"/> 
     <el-input v-model="user.password" placeholder="原始密码" style="margin:0px 0 10px 0 "  />
     <el-input v-model="user.password" placeholder="密码" />  
     <el-input v-model="user.studentClass" placeholder="班级" style="margin:10px 0 10px 0 "/>  
     <el-input v-model="user.introduce" placeholder="个性签名" />  
    </el-card>
  </div>
</template>

<script setup>
import {reactive,onMounted} from 'vue'
import { ElMessage } from 'element-plus'

const user = reactive({
  name:'',
  studentClass:'',
  password:'',
  introduce:''//介绍
})
onMounted(()=>{
  const localstorageUser= JSON.parse(localStorage.getItem('user'))
  user.name=localstorageUser.name;
  user.studentClass=localstorageUser.studentClass;
})
const submit=()=>{
  ElMessage({
    message: '修改成功！',
    type: 'success',
  })
}
</script>

<style scoped lang='scss'>
.user{
  width: 100%;
  height: 100%;
  display: flex;
    align-items: center;
    justify-content: center;
    .userC{
      position: relative;
      width: 50%;
      height: 50%;
     
    }
}
.but{
  position: absolute;
  bottom: 15px;
  right: 15px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>