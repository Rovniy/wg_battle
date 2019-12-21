<template>
  <el-container>
    <el-header>
      <header-component />
    </el-header>
    <el-main class="main">
      <nuxt />
    </el-main>
  </el-container>
</template>

<script>
import HeaderComponent from '@/components/header'

export default {
  components: {
    HeaderComponent
  }
}
</script>

<style lang="sass" scoped>
.main
  height: calc(100vh - 60px)
</style>
