<template>
  <div class="sign">
    <div class="left">
      <div class="line"></div>
      <ul>
        <li
          v-for="(item, index) in course"
          :key="item"
          :class="index == current ? 'current' : ''"
          @click="handlClick(index)"
        >
          <div>{{ item.Cname }}</div>

          <span style="font-size: 16px">{{ item.gClassT }}点</span>
        </li>
      </ul>
    </div>
    <div class="right">
      <div
        class="cutton"
        :style="{ background: signBColor }"
        @click="signClick"
      >
        <div class="cutton-s" :style="{ background: signSColor }">
          <div class="cutton-m">
            <div class="time">
            {{ Time }}
              <span>点击签到</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 时间获取
const Time = ref("");
const getTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  Time.value = `${hours}:${minutes}:${seconds}`;
};


import { reactive, ref, onMounted } from "vue";
import couressStore from "../store/couressStore";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter()
const store = couressStore();
const current = ref();
const course = ref([]);
const handlClick = (i) => {
  data.Cname = course.value[i].Cname;
  data.DT = course.value[i].DT;
  data.studentClass = course.value[i].GClass;
  data.gClassT = course.value[i].gClassT;
  data.CID = course.value[i].CID;
  current.value = i;
  if(signArr.value.includes(current.value)) {
    signBColor.value = "#f0f9eb";
    signSColor.value = "#67c23a";
    return
  } 
    signBColor.value = "";
    signSColor.value = "";

};
onMounted(() => {
  setInterval(() => {
    getTime();
  }, 1000);
  course.value = store.couress;
  var storedObj = JSON.parse(localStorage.getItem("user"));
  if(storedObj.studentID){
    data.studentID = storedObj.studentID;

  }
});

//打卡按钮
const signBColor = ref("");
const signSColor = ref("");
const signArr = ref([]);
const data = reactive({
  Cname: "",
  studentClass: "",
  gClassT: "",
  studentID: "",
  DT: "",
  CID: "",
});
import { ElMessage } from "element-plus";
const signClick = async () => {
  if (data.Cname === "") {
    return ElMessage({
      message: "请选择签到的课！",
      type: "warning",
    });
  }
  signArr.value.push(current.value);
  const res = await axios.post("/admin/user/sign", data);
  if (res.data.code == 1) {
    ElMessage({
      message: res.data.msg,
      type: "success",
    });
    signBColor.value = "#f0f9eb";
    signSColor.value = "#67c23a";
    router.push('/home/class')
  }
};
</script>

<style lang="scss" scoped>
.sign {
  width: 100%;
  height: 100%;
  .left {
    float: left;
    width: 200px;
    height: 100%;
    .line {
      float: left;
      margin-left: 25px;
      margin-top: 25px;
      width: 10px;
      height: 650px;
      border-radius: 8px;
      background: #1e303a;
    }
    ul {
      float: left;
      width: 140px;
      height: 700px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      li {
        padding: 10px 0;
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-weight: 600;
        color: #000;
        cursor: pointer;
        span {
          font-size: 16px;
        }
      }
    }
  }
  .right {
    float: left;
    width: 700px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .cutton {
      cursor: pointer;
      width: 360px;
      height: 360px;
      background: skyblue;
      border-radius: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      .cutton-s {
        width: 330px;
        height: 330px;
        background: pink;
        border-radius: 165px;
        display: flex;
        align-items: center;
        justify-content: center;
        .cutton-m {
          width: 315px;
          height: 315px;
          border-radius: 160px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;

          .time {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            font-size: 70px;
            span {
              font-size: 40px;
            }
          }
        }
      }
    }
  }
}
.current {
  color: skyblue !important;
  font-size: 40px !important;
}
</style>
