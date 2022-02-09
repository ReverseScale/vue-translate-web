<template>
  <div id="login" @keyup.enter="submitForm('ruleForm')">
    <h1 class="title">电点翻译系统</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          placeholder="请输入账号..."
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          placeholder="请输入密码..."
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click="submitForm('ruleForm')"
          class="block"
          >{{ loginStatus }}</el-button
        >
      </el-form-item>
      <div class="tips">未注册账号会自动注册</div>
    </el-form>
  </div>
</template>
<script>
import { stripscript } from "@/utils/validate.js";
import { adminLogin } from "@/api/log/login.js";
import localStore from "@/utils/localstorage.js";
import md5 from "js-md5";
import GlobalConstants from "@/utils/constants.js";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      this.ruleForm.username = stripscript(value);
      value = this.ruleForm.username;
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      this.ruleForm.checkPass = stripscript(value);
      value = this.ruleForm.checkPass;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      loginStatus: "登  录",
      ruleForm: {
        username: "",
        checkPass: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  mounted: function () {
    this.chekcLogin();
  },
  methods: {
    chekcLogin() {
      var token = localStore.getStorage(GlobalConstants.LOCAL_KEY_TOKEN);
      if (token) {
        this.$router.push({
          path: "/home",
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.loginStatus = "登录中...";
          adminLogin(this.ruleForm.username, md5(this.ruleForm.checkPass))
            .then((res) => {
              this.$message({
                message: "登录成功",
                type: "success",
              });
              //存储数据
              localStore.saveStorage(
                GlobalConstants.LOCAL_KEY_TOKEN,
                res.data.data.token
              );
              localStore.saveStorage(
                GlobalConstants.LOCAL_KEY_NICKNAME,
                res.data.data.nickname
              );
              let that = this;
              setTimeout(function () {
                //登录成功
                that.$router.push({
                  path: "/home",
                });
              }, 1000);
              this.loading = false;
              this.loginStatus = "登录成功";
            })
            .catch((e) => {
              //登录失败
              this.loading = false;
              this.loginStatus = "登  录";
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#login {
  min-height: 100%;
  height: 100vh;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
}
.title {
  margin: 0;
  padding: 0;
  display: block;
  padding-bottom: 25px;
  text-align: center;
  font-size: 24px;
  color: white;
  padding-top: 300px;
  font-weight: normal;
}
.tips {
  text-align: center;
  width: 400px;
  font-size: 14px;
  color: red;
}
.demo-ruleForm {
  width: 400px;
  margin: 0 auto;
}
.el-form-item {
  padding-top: 10px;
}
.block {
  width: 100%;
  display: block;
}
</style>