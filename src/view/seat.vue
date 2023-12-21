<template>
  <div class="seat" @click="stopL">
    <span class="guodao"
      >过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</span
    >
    <span class="guodaoR"
      >过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</span
    >
    <el-card class="box-cards">
      <div class="jiangtai">讲台</div>
      <ul class="listF">
        <li v-for="i in 40" @contextmenu.prevent.stop="RClick(i)">
          {{ i }}
          <span v-show="currentLi === i">
            <el-button type="primary">发送消息</el-button>
            <el-button type="success">评分评价</el-button>
            <el-button type="warning">修改考勤</el-button>
          </span>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
//弹出框LI
const currentLi = ref('');
//右键
const RClick = (e) => {
  currentLi.value = e;
};
//关闭弹窗
const stopL = ()=>{
  currentLi.value=99
}
</script>

<style scoped lang="scss">
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

        span {
          all: initial;
          width: 100px;
          height: 110px;
          background: #fff;
          border: 1px solid #eee;
          position: absolute;
          top: 0;
          left: -1px;
          z-index: 999;
          .el-rate{
            width: 100px;
          }
          .el-button {
            margin: 2px 0 3px 5px;
          }
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
</style>
