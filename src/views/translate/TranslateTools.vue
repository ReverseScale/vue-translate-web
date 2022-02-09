<template>
  <div class="root_container">
    <div class="header">
      <div class="title_tips">下载Java运行环境</div>
      <el-link
        target="_blank"
        :href="jdk_path_maxos"
        :underline="false"
        style="margin-top: 15px; mrigin-bottom: 15px; margin-right: 15px"
      >
        <el-button type="info">下载 Macos JDK1.8</el-button>
      </el-link>
      <el-link
        target="_blank"
        :href="jdk_path_windows"
        :underline="false"
        style="margin-top: 15px; mrigin-bottom: 15px; margin-right: 15px"
      >
        <el-button type="info">下载 Windows JDK1.8</el-button>
      </el-link>
      <el-link
        target="_blank"
        :href="jdk_path_linux"
        :underline="false"
        style="margin-top: 15px; mrigin-bottom: 15px; margin-right: 15px"
      >
        <el-button type="info">下载 Linux JDK1.8</el-button>
      </el-link>
      <div class="title_tips">下载翻译工具</div>
      <el-link
        target="_blank"
        :href="info.translate_tools_path"
        :underline="false"
        style="margin-top: 15px; mrigin-bottom: 15px"
      >
        <el-button type="info">下载翻译同步助手</el-button>
      </el-link>
    </div>
  </div>
</template>
<script>
import Editor from "vue2-ace-editor";
import { translateDownloadTools } from "../../api/log/translate";
import { Message } from "element-ui";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      info: {
        jdk_path: "http://mobile.bcmcdn.com/android_tools/jdk-8u241-macosx-x64.dmg",
        translate_tools_path: "http://www.cretinzp.com:8029/file/2022/02/09/阿念翻译同步助手.jar",
      },
      jdk_path_maxos: "http://www.cretinzp.com:8029/file/2020/03/19/jdk-8u241-macosx-x64.dmg",
      jdk_path_windows: "http://www.cretinzp.com:8029/file/2020/03/19/jdk-8u241-windows-x64.exe",
      jdk_path_linux: "http://www.cretinzp.com:8029/file/2020/03/19/jdk-8u241-linux-x64.tar.zip"
    };
  },
  watch: {},
  mounted: function () {
    this.getData()
  },
  methods: {
    getData() {
      translateDownloadTools()
        .then((result) => {
          console.log(result);
          if(result.data.code == 200){
            this.info = result.data.data
          }
        })
        .catch((err) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.title_tips {
  padding-top: 15px;
}
.header {
  padding-left: 20px;
}
</style>