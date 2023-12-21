<template>
  <div class="login w">
    <div class="left"></div>
    <div class="right">
      <h2>Sign in</h2>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="studentID">
          <el-input
            v-model="ruleForm.studentID"
            autocomplete="off"
            :prefix-icon="User"
            class="Iinput"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            :prefix-icon="Lock"
            class="Iinput"
          ></el-input>
        </el-form-item>

        <router-link class="register" to="/register"
          >没有账号？点击注册</router-link
        >
        <el-form-item>
          <el-button
            class="Ibutton"
            type="primary"
            @click="submitForm(ruleFormRef)"
            >login</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import {useRouter} from 'vue-router'
const router = useRouter()

import axios from "../util/axios.config";
const ruleFormRef = ref(null);
const ruleForm = reactive({
  studentID: "",
  password: "",
});

const rules = reactive({
  studentID: [
    { required: "true", message: "账户不能为空", trigger: "blur" },
    { min: 6, max: 12, message: "长度在6~12位", trigger: "blur" },
  ],
  password: [
    { required: "true", message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 12, message: "长度在6~12位", trigger: "blur" },
  ],
});

const submitForm = async () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      axios.post("/admin/user/login", ruleForm).then((res) => {
        if (res.data.code === "1") {
          ElMessage({
            message: res.data.msg,
            type: "success",
          });
          localStorage.setItem("user", JSON.stringify(res.data.data))
          router.push('/#/home')
        } else {
          ElMessage({
            message: res.data.msg,
            type: "warning",
          });
        }
      });
    } else {
      return false;
    }
  });
};
</script>

<style scoped lang="scss">
.login {
  .left,
  .right {
    float: left;
    width: 50%;
    height: 100%;
    background: pink;
  }
  .right {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
.Iinput {
  width: 300px;
  height: 50px;
}
.Ibutton {
  margin-top: 10px;
  width: 300px;
  height: 50px;
}
h2 {
  margin-bottom: 30px;
}
.register {
  margin-left: 180px;
}
</style>
