<template>
  <div>
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
      <div>修改为：</div><el-button type="primary">正常</el-button>
    <el-button type="warning">迟到</el-button>
    <el-button type="danger">旷课</el-button></div>
    </div>
  </el-dialog></div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
const dialogVisible = ref(false)
const dialog = ref({})

const porps =  defineProps(['dialog','open'])
dialogVisible.value=porps.open
onMounted(()=>{
console.log(porps.open);
console.log(porps.dialog);

})
</script>

<style>

</style>