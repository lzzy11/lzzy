<template>
  <div class="meu">
    <div class="name">
      <div>姓名：{{ user.name }}</div>
      <div>班级：{{ user.studentClass }}</div>
    </div>
    <ul>
      <RouterLink custom to="/home/sign" v-slot="{ isActive, navigate }" v-if="mshow=='0'">
        <li @click="navigate" :class="isActive ? 'item current' : 'item'">
          签到
        </li> 
      </RouterLink>
     

      <RouterLink custom to="/home/kao" v-slot="{ isActive, navigate }" v-if="mshow=='2'">
        <li @click="navigate" :class="isActive ? 'item current' : 'item'">
          考勤
        </li>
      </RouterLink>

      <RouterLink custom to="/home/class" v-slot="{ isActive, navigate }" v-if="mshow=='0' || mshow=='1'">
        <li @click="navigate" :class="isActive ? 'item current' : 'item'">
          课堂
        </li>
      </RouterLink>

      <RouterLink custom to="/home/user" v-slot="{ isActive, navigate }">
        <li @click="navigate" :class="isActive ? 'item current' : 'item'">
          个人
        </li>
      </RouterLink>
    </ul>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
const user = reactive({
  name:'',
  studentClass:''
});
const mshow = ref()
onMounted(() => {
  var storedObj = JSON.parse(localStorage.getItem("user"));
  user.name=storedObj.name
  user.studentClass= storedObj.studentClass
  mshow.value = storedObj.vip==1?'1':storedObj.vip==2?'2':'0'
  console.log(mshow.value);
});
</script>

<style scoped lang="scss">
.meu {
  position: relative;
  float: right;
  width: 150px;
  height: 100%;
  background: #1e303a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .name{
    position: absolute;
    bottom: 15px;
    left: 15px;
    color: #fff;
  }
}
.item {
  font-size: 30px;
  margin: 75px 0;
  color: #fff;
  padding-right: 10px;
  cursor: pointer;
}
.current {
  border-right: 5px solid skyblue;
  color: skyblue;
}
</style>
