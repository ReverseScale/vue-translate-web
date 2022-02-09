<template>
  <div class="root_container">

    <el-dialog
      title="添加用户"
      :close-on-click-modal="!showAddUserDialog"
      :close-on-press-escape="!showAddUserDialog"
      :destroy-on-close="destroyOnClose"
      :visible.sync="showAddUserDialog"
    >
      <div class="dialog_container">
        <el-form
          ref="form"
          :model="formData"
          label-width="140px"
        >
          <el-form-item label="用户ID">
            <el-input
              clearable="true"
              placeholder="请输入用户ID"
              v-model="formData.add_user_id"
              style="width:195px"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input
              clearable="true"
              placeholder="请输入备注信息"
              v-model="formData.add_backup"
              style="width:195px"
            ></el-input>
          </el-form-item>
          <el-form-item label="日志保存时长(天)">
            <el-select v-model="formData.log_cache_day">
              <el-option
                label="3"
                value="3"
              ></el-option>
              <el-option
                label="7"
                value="7"
              ></el-option>
              <el-option
                label="15"
                value="15"
              ></el-option>
              <el-option
                label="30"
                value="30"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="异常预警上限(次)">
            <el-input
              v-model="formData.add_exception_count_limit"
              style="width:195px"
            ></el-input>
          </el-form-item>
          <el-form-item label="页面访问统计">
            <el-switch v-model="formData.add_page_statistics"></el-switch> <span class="switch_tips">启动次数统计</span>
            <el-switch v-model="formData.add_launch_statistics"></el-switch> <span class="switch_tips">设备信息统计</span>
            <el-switch v-model="formData.add_device_statistics"></el-switch>
          </el-form-item>
          <el-form-item label="日志立即上报">
            <el-switch v-model="formData.add_upload"></el-switch>
            <span class="switch_tips">实时上报</span>
            <el-switch v-model="formData.add_online_debug"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <footer class="dialog_footer">
        <div class="dialog_footer_item">
          <el-button
            type="primary"
            @click="onAddUser"
          >添加用户</el-button>
          <el-button @click="showAddUserDialog = false" >取消</el-button>
        </div>
      </footer>
    </el-dialog>

    <div class="header">
      <div class="form_container">
        <el-form
          :inline="true"
          :model="formData"
          class="demo-form-inline"
        >
          <el-form-item label="筛选条件">
            <el-input
              v-model="formData.backup"
              placeholder="请输入备注"
              @input="onContentChange(1)"
              @change="onDoSearch"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input
              v-model="formData.userId"
              @input="onContentChange(2)"
              @change="onDoSearch"
              placeholder="请输入用户ID"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onDoSearch"
            >查询</el-button>
          </el-form-item>

          <el-button
            type="success"
            plain
            @click="addUserBtn"
          >添加用户</el-button>
        </el-form>
      </div>
      <div class="pager">
        <span style="color:#999999;display:inline-block;padding-top:9px">共 {{totalCount}} 条数据，每页 {{pageSize}} 条</span>
        <div
          class="pager_item"
          style="display:inline-block"
        >
          <el-pagination
            background
            :page-size="pageSize"
            @current-change="pageChange"
            layout="prev, pager, next"
            :total="totalCount"
            :current-page="currentPage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="table_container">
      <el-table
        :data="tableData"
        :height="tableHeight"
        border
      >
        <el-table-column
          prop="index"
          label=""
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="user_id"
          label="用户ID"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="backup"
          label="备注"
          width="140"
        >
        </el-table-column>
        <!-- 1 需改launch 2 page 3 device 4 upload 5 online_debug 6 timeLimit 7 days -->
        <el-table-column
          prop="launch_statistics"
          label="启动统计"
          width="110"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.launch_statistics"
              @change="onEditConfig(scope.row,1)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="page_statistics"
          label="页面统计"
          width="110"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.page_statistics"
              @change="onEditConfig(scope.row,2)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="device_statistics"
          label="设备统计"
          width="110"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.device_statistics"
              @change="onEditConfig(scope.row,3)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="upload_immediately"
          label="日志立即上报"
          width="110"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.upload_immediately"
              @change="onEditConfig(scope.row,4)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="backup"
          label="实时上报"
          width="120"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.online_debug"
              @change="onEditConfig(scope.row,5)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="exception_count_limit"
          label="异常预警上限(次)"
          width="130"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.exception_count_limit"
              @change="onEditConfig(scope.row,6)"
              placeholder="请输入次数"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="log_cache_day"
          width="130"
          label="日志保存时长(天)"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.log_cache_day"
              @change="onEditConfig(scope.row,7)"
            >
              <el-option
                label="3"
                value="3"
              ></el-option>
              <el-option
                label="7"
                value="7"
              ></el-option>
              <el-option
                label="15"
                value="15"
              ></el-option>
              <el-option
                label="30"
                value="30"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="添加时间"
          width="180"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              plain
              @click="onDeleteConfig(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  getUserList,
  editUserConfig,
  deleteUserConfig,
  addUserConfig,
} from "./../../api/log/user";
import { Message } from "element-ui";
export default {
  data() {
    return {
      formData: {
        backup: "",
        userId: "",

        //添加用户参数
        log_cache_day: "7",
        add_exception_count_limit: 50,
        add_page_statistics: true,
        add_user_id: "",
        add_backup: "",
        add_launch_statistics: true,
        add_online_debug: false,
        add_device_statistics: true,
        add_upload: false,
      },
      tableData: [],

      //记录高度
      tableHeight: "",

      //分页数据
      totalCount: 0,
      currentPage: 1,
      pageSize: 20,

      //新增用户
      showAddUserDialog: false,

      destroyOnClose: true,
    };
  },
  watch: {
    "$store.state.screenHeight": function (val) {
      this.tableHeight = val - 98 - 50;
    },
  },
  mounted: function () {
    //获取数据
    this.obtainUserList();

    this.tableHeight = this.$store.state.screenHeight - 98 - 50;
  },
  methods: {
    // proId, userId, backup, page, size
    //获取列表信息
    obtainUserList() {
      getUserList(
        this.$route.query.pro_id,
        this.formData.userId,
        this.formData.backup,
        this.currentPage,
        this.pageSize
      )
        .then((result) => {
          this.tableData = result.data.data.list;

          this.totalCount = result.data.data.total;
          this.currentPage = result.data.data.currentPage;
          console.log(result);
        })
        .catch((err) => {});
    },
    //点击页面切换
    pageChange(page) {
      this.currentPage = page;
      this.obtainUserList();
    },
    //搜索数据
    onDoSearch() {
      this.currentPage = 1;
      this.obtainUserList();
    },
    //内容改变
    onContentChange(type) {
      console.log(type);
      if (type == 2 && !this.formData.userId) {
        this.onDoSearch();
      }

      if (type == 1 && !this.formData.backup) {
        this.onDoSearch();
      }
    },
    //更新配置
    onEditConfig(data, type) {
      // appId, userId, content, type
      //1 需改launch 2 page 3 device 4 upload 5 online_debug 6 timeLimit 7 days
      var content = "";
      if (type == 1) {
        content = data.launch_statistics ? "1" : "0";
      } else if (type == 2) {
        content = data.page_statistics ? "1" : "0";
      } else if (type == 3) {
        content = data.device_statistics ? "1" : "0";
      } else if (type == 4) {
        content = data.upload_immediately ? "1" : "0";
      } else if (type == 5) {
        content = data.online_debug ? "1" : "0";
      } else if (type == 6) {
        content = data.exception_count_limit;
      } else if (type == 7) {
        content = data.log_cache_day;
      }
      editUserConfig(data.app_id, data.user_id, content, type)
        .then((result) => {
          Message.success("修改成功");
        })
        .catch((err) => {});
    },
    //删除用户
    onDeleteConfig(data) {
      this.$confirm("此操作将删除已配置的用户，且不可逆?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUserConfig(data.app_id, data.user_id)
            .then((result) => {
              Message.success("删除成功");

              this.obtainUserList();
            })
            .catch((err) => {});
        })
        .catch(() => {});
    },
    //点击添加
    addUserBtn() {
      this.showAddUserDialog = true;
    },
    //真正的添加用户
    onAddUser() {
      if (!this.formData.add_user_id) {
        Message.warning("请输入用户ID");
        return;
      }
      addUserConfig(
        this.$route.query.pro_id,
        this.formData.add_user_id,
        this.formData.add_backup,
        this.formData.log_cache_day,
        this.formData.add_exception_count_limit,
        this.formData.add_page_statistics ? "1" : "0",
        this.formData.add_launch_statistics ? "1" : "0",
        this.formData.add_device_statistics ? "1" : "0",
        this.formData.add_upload ? "1" : "0",
        this.formData.add_online_debug ? "1" : "0"
      )
        .then((result) => {
          Message.success("添加成功");
          this.showAddUserDialog = false;

          this.formData.add_user_id = "";
          this.formData.add_backup = "";

          //重新拉取列表数据
          this.obtainUserList();
        })
        .catch((err) => {});
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
  position: relative;
}
.table_container {
  margin-left: 18px;
  margin-right: 18px;
}
.header_contianer {
  top: 0;
  position: absolute;
  right: 18px;
}
.pager {
  position: absolute;
  top: 6px;
  right: 18px;
  display: flex;
}
.dialog_container {
}

.dialog_footer {
  display: flex;
  text-align: right;
  padding-bottom: 18px;
}

.dialog_footer .dialog_footer_item {
  margin-left: auto;
  padding-right: 18px;
}

.switch_tips {
  padding-left: 18px;
  padding-right: 10px;
  display: inline-block;
}
</style>