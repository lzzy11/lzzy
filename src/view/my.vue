<template>
  <div class="my">   
        <h1>欢迎 {{ name }} 回来！<a :href="myVIp">点击跳转签到</a></h1>     
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const name = ref("");
import couressStore from '../store/couressStore'
const store = couressStore()
const myVIp = ref('/#/home/class')
onMounted(() => {
  var storedObj = JSON.parse(localStorage.getItem("user"));
  name.value = storedObj.name;
  store.getCouress()
  myVIp.value = storedObj.vip==1?'/#/home/class':storedObj.vip==2?'/#/home/kao':'/#/home/sign'
  });
</script>

<style scoped>
.my {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
