<template>
  <!-- 一级路由规则对象组件的挂载点 -->
  <router-view></router-view>
</template>

<script>
import { registerAPI } from './api'
export default {
  async created () {
    await registerAPI()
    // console.log(res)
  }
}
</script>

<style></style>
