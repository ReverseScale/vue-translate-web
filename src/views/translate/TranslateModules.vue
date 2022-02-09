<template>
  <div class="root_container">
    <div class="header">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="onUpdateModulesList"
            >更新模块列表</el-button
          >
        </el-form-item>
        <el-form-item>
          <span style="color: #606266; font-size: 12px"
            >共 {{ formData.length }} 条数据</span
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        :data="tableDatas"
        :style="{ height: tableHeight, width: '100%' }"
        border
      >
        <el-table-column prop="id" label="ID" width="50"> </el-table-column>
        <el-table-column prop="key" label="模块路径"> </el-table-column>
        <el-table-column prop="value" label="模块名称"> </el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="180">
        </el-table-column>
        <el-table-column prop="add_time" label="操作" width="110">
          <template slot-scope="scope">
            <div>
              <el-button
                size="small"
                type="primary"
                plain
                @click="onChangeContent(scope.row.id)"
                >修改名称</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  translateUpdateModulesList,
  translateUpdateModules,
  translateModules,
} from "../../api/log/translate";
import { Message } from "element-ui";
export default {
  data() {
    return {
      formData: {
        length: "0",
      },
      tableDatas: [],

      //记录高度
      tableHeight: "0px",
    };
  },
  watch: {
    "$store.state.screenHeight": function (val) {
      this.tableHeight = val - 98 - 50 + "px";
    },
  },
  mounted: function () {
    this.tableHeight = this.$store.state.screenHeight - 98 - 50 + "px";
    //获取数据
    this.obtainList();
  },
  methods: {
    //获取app列表
    obtainList() {
      translateModules()
        .then((result) => {
          console.log(result);
          var list = [];
          result.data.data.forEach((res) => {
            if (res.id != -1) {
              list.push(res);
            }
          });
          this.tableDatas = list;
          this.formData.length = list.length;
        })
        .catch((err) => {});
    },
    //更新远程列表
    onUpdateModulesList() {
      console.log("sssss");
      var that = this;
      translateUpdateModulesList()
        .then((result) => {
          if (result.data.code == 200) {
            that.obtainList();
            Message.success("更新成功");
          }
        })
        .catch((err) => {});
    },
    //修改名称
    onChangeContent(id) {
      console.log(id);
      var that = this;
      this.$prompt("请输入模块名称", "修改名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if (!value) {
            Message.warning("请输入内容")
            return;
          }
          translateUpdateModules(id, value)
            .then((result) => {
              if (result.data.code == 200) {
                Message.success("修改成功");
                that.obtainList();
              }
            })
            .catch((err) => {});
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
.header {
  margin-left: 18px;
  margin-top: 18px;
}
.table_container {
  margin-left: 18px;
  margin-right: 18px;
}
</style>