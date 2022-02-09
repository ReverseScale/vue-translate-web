<template>
  <div class="root">
    <div class="left">
      <Nav />
    </div>
    <div class="top">
      <Title :routeList="routeList"/>
    </div>
    <div class="content">
      <Content />
    </div>
  </div>
</template>
<script>
import Nav from "./root/Nav.vue";
import Title from "./root/Title.vue";
import Content from "./root/Content.vue";
export default {
  components: {
    Nav,
    Title,
    Content,
  },
  data() {
    return {
      routeList: [],
    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.routeList = val.meta.paths;
      },
    },
  },
  mounted: function () {
    var _this = this;
    window.onresize = () => {
      return (() => {
        _this.$store.state.screenWidth = document.documentElement.clientWidth; //窗口宽度
        _this.$store.state.screenHeight = document.documentElement.clientHeight; //屏幕高度
      })();
    };
  },
};
</script>
<style lang="scss" scoped>
.root {
  position: relative;
}
.left {
  width: 201px;
  top: 0;
  left: 0;
  overflow: auto;
  min-height: 100vh;
  bottom: 0;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
  position: absolute;
  background-color: rgb(50, 64, 87);
}

.top {
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  z-index: 1000;
  background-color: white;
  border: 1px solid #eeeeee;
  left: 200px;
}

.content {
  top: 0px;
  left: 200px;
  overflow: auto;
  right: 0;
  min-height: 100vh;
  bottom: 0;
  border-right: solid 1px #e6e6e6;
  position: absolute;
}
</style>