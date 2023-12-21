<template>
  <div class="login w">
     
     <div class="right">
      <h2>Sign up</h2>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
       
        class="demo-ruleForm"
      >
        <el-form-item  prop="name">
          <el-input
            v-model="ruleForm.name"
            autocomplete="off"
            :prefix-icon="Avatar"
            placeholder="姓名"
            class="Iinput"
          ></el-input>
        </el-form-item>
        <el-form-item prop="studentID">
          <el-input
            v-model="ruleForm.studentID"
            autocomplete="off"
            :prefix-icon="User"
            placeholder="学号"
            class="Iinput"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            placeholder="密码"
            autocomplete="off"
            :prefix-icon="Lock"
            class="Iinput"
          ></el-input>
        </el-form-item>
        <el-form-item prop="studentClass">
          <el-input
            v-model="ruleForm.studentClass"
            placeholder="例：21计算机网络二班"
            autocomplete="off"
            :prefix-icon="Grid"
            class="Iinput"
          ></el-input>
        </el-form-item>
       
        <el-form-item>
          <el-button class="Ibutton" type="primary" @click="submitForm(ruleFormRef)"
            >register</el-button
          >
        </el-form-item>
      </el-form>
     </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { User, Lock ,Avatar,Grid} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
const router = useRouter()
import axios from "axios";
const ruleFormRef = ref(null)
const ruleForm = reactive({
  name:"",
  studentID: "",
  password: "",
  studentClass:"",
  vip:0
});
 
const rules = reactive({
   studentID: [
      { required: 'true', message: '学生ID不能为空', trigger: 'blur' },
      { min: 6, max: 12, message: '长度在6~12位', trigger: 'blur' },
      { pattern: /^[0-9]+$/, message: '只能输入数字', trigger: 'blur' }
    ],
    name: [
      { required: 'true', message: '名字不能为空', trigger: 'blur' },
    ],
    password: [
      { required: 'true', message: '密码不能为空', trigger: 'blur' },
      { min: 6, max: 12, message: '长度在6~12位', trigger: 'blur' }
    ],
    studentClass:[
      { required: 'true', message: '班级不能为空', trigger: 'blur' }
    ]
});
 
const submitForm = async () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      axios.post('/admin/user/register',ruleForm).then((res)=>{
        console.log(res.data.code)
        if(res.data.code==='1'){
          ElMessage({
            message: res.data.msg,
            type: "success",
          });
         router.push('/login')
        }else{
          ElMessage({
            message: res.data.msg,
            type: "warning",
          });
        }
      })


    } else {
      return false;
    }
  });
};
 
</script>

<style scoped lang="scss"> 
.login{
    width: 600px;
    display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column
  .left,.right{
    float:left;
    height: 100%;
    background: pink;
  }
  .right{
    background: #fff;
    display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column
 
  }
}
.Iinput{
  width: 300px;
  height: 50px;
}
.Ibutton{
  margin-top: 10px;
 width: 300px;
 height: 50px;
}
h2{
margin-bottom: 30px;
}
.register{
  margin-left: 180px;
}
</style>