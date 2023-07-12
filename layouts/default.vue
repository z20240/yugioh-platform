<script lang="ts" setup>
const active = ref('home');
</script>

<template>
  <div>
    Layout: default
    {{ active }}
    <slot />
    <van-tabbar route>
      <van-tabbar-item name="home" icon="home-o" to="/">主頁</van-tabbar-item>
      <van-tabbar-item name="search" icon="newspaper-o" to="/deck">我的牌組</van-tabbar-item>
      <van-tabbar-item name="setting" icon="friends-o" to="settings">登入</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped></style>
