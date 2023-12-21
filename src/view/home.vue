<template>
  <div class="w">
    <div class="left">
      <router-view  v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <meu></meu>
  </div>
</template>

<script setup>
import meu from "../components/meu.vue";
</script>

<style scoped lang="scss">
.left {
  float: left;
  width: 1050px;
  height: 100%;
}
</style>
