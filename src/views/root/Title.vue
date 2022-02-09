<template>
  <div class="root_container">
    <div class="indocator">
      <el-breadcrumb separator="/">
        <template v-for="item in titleList">
          <template v-if="item.path">
            <el-breadcrumb-item :to="{ path: item.path }" :key="item.id">{{
              item.title
            }}</el-breadcrumb-item>
          </template>
          <template v-else>
            <el-breadcrumb-item :key="item.id">{{
              item.title
            }}</el-breadcrumb-item>
          </template>
        </template>
      </el-breadcrumb>
    </div>
    <el-dropdown class="user" @command="handleCommand">
      <div class="el-dropdown-link">
        {{ nickname }} <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="0" icon="el-icon-data-line"
          >获取token</el-dropdown-item
        >
        <el-dropdown-item command="1" icon="el-icon-data-board"
          >重置token</el-dropdown-item
        >
        <el-dropdown-item command="2" icon="el-icon-unlock"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item command="3" icon="el-icon-thumb"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import localStore from "@/utils/localstorage.js";
import GlobalConstants from "@/utils/constants.js";
import md5 from "js-md5";
import { resetToken, changePsw } from "../../api/log/translate";
export default {
  props: ["routeList"],
  data() {
    return {
      nickname: "",
      titleList: [
        {
          title: "首页",
          path: "/",
        },
      ],
    };
  },
  mounted: function () {
    var token = localStore.getStorage(GlobalConstants.LOCAL_KEY_TOKEN);
    if (!token) {
      this.$router.push({
        path: "/login",
      });
    }

    this.nickname = localStore.getStorage(GlobalConstants.LOCAL_KEY_NICKNAME);
  },
  watch: {
    routeList: {
      handler: function (val, oldVal) {
        this.titleList = val;
      },
    },
  },
  methods: {
    handleCommand(command) {
      if (command == "0") {
        this.getToken();
      } else if (command == "1") {
        this.doResetToken();
      } else if (command == "2") {
        this.doChangePsw()
      } else {
        this.exit();
      }
    },
    doChangePsw() {
      this.$prompt("请输入新密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          changePsw(md5(value))
            .then((result) => {})
            .catch((err) => {});
        })
        .catch(() => {});
    },
    doResetToken() {
      var that = this;
      this.$confirm(
        "token重置之后，之前的token将无法继续使用，确定要重置吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          console.log("sss");
          resetToken()
            .then((result) => {})
            .catch((err) => {});
        })
        .catch(() => {});
    },
    getToken() {
      this.$confirm(
        "您的token为：" +
          localStore.getStorage(GlobalConstants.LOCAL_KEY_TOKEN) +
          "，此token可用于客户端上传翻译和拉取翻译，请妥善保管",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {})
        .catch(() => {});
    },
    exit() {
      this.$confirm("确定退出登录吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("sss");
          localStore.saveStorage(GlobalConstants.LOCAL_KEY_NICKNAME, "");
          localStore.saveStorage(GlobalConstants.LOCAL_KEY_TOKEN, "");
          this.$router.push({
            path: "/login",
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.root_container {
  position: relative;
}
.indocator {
  position: absolute;
  top: 0;
  height: 50px;
  bottom: 0;
  padding-left: 18px;
  padding-top: 18px;
  left: 0;
}
.user {
  position: absolute;
  height: 50px;
  right: 0;
  top: 0;
  padding-right: 18px;
  color: #999999;
  bottom: 0;
  line-height: 50px;
  cursor: pointer;
}
</style>