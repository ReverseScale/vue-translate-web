<template>
  <div>
    <el-menu
      default-active="/home"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b"
    >
      <el-submenu index="8" >
        <template slot="title">
          <i class="el-icon-s-operation"></i>
          <span>语言国际化</span>
        </template>
        <el-menu-item index="/translate/tools">翻译工具下载</el-menu-item>
        <el-menu-item index="/translate/modules">翻译模块配置</el-menu-item>
        <el-menu-item index="/home">国际化翻译系统</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>