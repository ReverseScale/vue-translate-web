<template>
  <div class="root_container">
    <el-dialog
      title="查看翻译的修改日志"
      :visible.sync="dialogShow"
      width="30%"
    >
      <el-timeline v-show="activities.length > 0" style="margin: 18px">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
      <div v-show="activities.length == 0" style="padding: 18px">
        暂无更新记录
      </div>
    </el-dialog>
    <div class="header">
      <div class="form_container">
        <el-form :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item>
            <el-select
              v-model="formData.platform"
              placeholder="请选择平台"
              @change="onDoSearch"
              size="small"
              style="width: 125px"
            >
              <el-option label="全部设备平台" value="0"></el-option>
              <el-option label="安卓平台" value="1"></el-option>
              <el-option label="iOS平台" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formData.translate_status"
              placeholder="请选择翻译类型"
              size="small"
              @change="onDoSearch"
              style="width: 130px"
            >
              <el-option label="已翻译/未翻译" value="0"></el-option>
              <el-option label="已翻译" value="1"></el-option>
              <el-option label="未翻译" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formData.merge_status"
              placeholder="请选择冲突类型"
              size="small"
              @change="onDoSearch"
              style="width: 130px"
            >
              <el-option label="已/未合并冲突" value="0"></el-option>
              <el-option label="已合并冲突" value="1"></el-option>
              <el-option label="未合并冲突" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formData.order_status"
              placeholder="请选择排序方式"
              size="small"
              @change="onDoSearch"
              style="width: 125px"
            >
              <el-option label="添加时间倒序" value="2"></el-option>
              <el-option label="添加时间正序" value="3"></el-option>
              <el-option label="更新时间倒序" value="0"></el-option>
              <el-option label="更新时间正序" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formData.module"
              placeholder="请选择模块"
              size="small"
              @change="onDoSearch"
              style="width: 125px"
            >
              <el-option
                v-for="item in moduleList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="formData.search"
              placeholder="请搜索内容"
              @change="onDoSearch"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="margin-left: 10px"
              type="primary"
              @click="onDoSearch"
              size="small"
              >查询</el-button
            >
          </el-form-item>
          <el-form-item>
            精准搜索
            <el-switch style="margin-left: 5px" v-model="formData.searchType">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="table_container">
      <el-table
        :data="tableData"
        :height="tableHeight"
        :row-class-name="tableRowClassName"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="翻译ID" width="70">
          <template slot-scope="scope">
            <div style="cursor: pointer" @dblclick="onDoubleClick(scope.row)">
              {{ scope.row.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="安卓信息">
          <template slot-scope="scope">
            <div class="tag_container">
              <el-tag
                class="tab_tips"
                size="small"
                :type="scope.row.androidKey ? 'success' : 'danger'"
                >key：{{ scope.row.androidKey }}</el-tag
              >
              <el-tag
                class="tab_tips"
                size="small"
                :type="scope.row.androidPackage ? 'success' : 'danger'"
                >path：{{ scope.row.androidPackage }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="path" label="iOS信息">
          <template slot-scope="scope">
            <div class="tag_container">
              <el-tag
                class="tab_tips"
                size="small"
                :type="scope.row.iosKey ? 'success' : 'danger'"
                >key：{{
                  scope.row.iosKey ? scope.row.iosKey : "未上传"
                }}</el-tag
              >
              <el-tag
                class="tab_tips"
                size="small"
                :type="scope.row.iosPackage ? 'success' : 'danger'"
                >path：{{
                  scope.row.iosPackage ? scope.row.iosPackage : "未上传"
                }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="中文内容" width="200">
          <template slot-scope="scope">
            <div style="cursor: pointer">
              {{ scope.row.content }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="translateEn" label="英文内容">
          <template slot-scope="scope">
            <div>
              <el-input
                type="textarea"
                class="hasContent"
                placeholder="请输入翻译后的内容"
                :autosize="{ minRows: 3, maxRows: 10 }"
                resize="none"
                v-model="scope.row.translateEn"
              >
              </el-input>
              <div v-show="scope.row.isConfirm" class="confirm_tips">
                此翻译已被确认无误，请谨慎修改
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="100">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              style="margin-bottom: 6px; margin-right: 6px"
              plain
              v-if="scope.row.originTranslateEn != scope.row.translateEn"
              @click="onEditTranslate(scope.row)"
              >保存翻译</el-button
            >

            <el-popover
              placement="top"
              width="160"
              style="margin-bottom: 6px; margin-right: 6px"
              v-model="scope.row.pop_visable"
              trigger="manual"
            >
              <p>{{ scope.row.translate_temp }}</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  style="margin-right: 10px"
                  type="text"
                  @click="closePop(scope.row)"
                  >取消</el-button
                >
                <el-button type="primary" size="mini" @click="okPop(scope.row)"
                  >确定</el-button
                >
              </div>

              <el-button
                type="warning"
                slot="reference"
                size="mini"
                plain
                @click="onAutoTranslate(scope.row)"
                >智能翻译</el-button
              >
            </el-popover>

            <el-button
              type="info"
              size="mini"
              plain
              @click="onLog(scope.row)"
              style="
                margin-bottom: 6px;
                margin-right: 6px;
                display: inline-block;
              "
              >修改记录</el-button
            >

            <el-button
              type="danger"
              size="mini"
              v-show="!scope.row.isMerged"
              plain
              @click="onMerge(scope.row)"
              style="margin-bottom: 6px; margin-right: 6px"
              >合并内容</el-button
            >

            <el-button
              type="danger"
              size="mini"
              v-show="scope.row.iosKey && scope.row.androidKey"
              plain
              @click="onSplit(scope.row)"
              style="margin-bottom: 6px; margin-right: 6px"
              >翻译拆分</el-button
            >

            <el-button
              type="info"
              size="mini"
              plain
              @click="onDoConfirm(scope.row)"
              style="margin-bottom: 6px; margin-right: 6px"
              >{{ scope.row.isConfirm ? "取消确认" : "确认翻译" }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pager">
      <span style="color: #999999; display: inline-block; padding-top: 9px"
        >共 {{ totalCount }} 条数据，每页 {{ pageSize }} 条</span
      >
      <div class="pager_item" style="display: inline-block">
        <el-pagination
          background
          :page-size="pageSize"
          @current-change="pageChange"
          layout="prev, pager, next"
          :pager-count="5"
          :total="totalCount"
          :current-page="currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  translateList,
  translateContent,
  translateEdit,
  translateLog,
  translateMerge,
  translateSplit,
  translateDelete,
  translateModules,
  translateConfirm,
} from "../../api/log/translate";
import { Message } from "element-ui";
export default {
  data() {
    return {
      activities: [],
      //记录高度
      tableHeight: -1,

      translate_temp: "",
      visible_temp: false,

      //模块数据
      moduleList: [
        {
          key: "",
          value: "所有模块",
        },
      ],

      formData: {
        search: "",
        platform: "0",
        translate_status: "0",
        merge_status: "0",
        order_status: "2",
        module: "",
        searchType: false,
      },

      dialogShow: false,
      formLabelWidth: "100px",

      //分页数据
      totalCount: 0,
      currentPage: 1,
      pageSize: 20,
      pagerCount: 3,

      tableData: [],

      dataPlaceHolder: '{"name":"穆仙念"}',

      //当前的数据
      currentData: {
        dialogTitle: "",
        title: "",
        path: "",
        request_url: "",
        response: "",
        type: -1, // 1 新增 2 修改
        id: -1,
      },
    };
  },
  watch: {
    "$store.state.screenHeight": function (val) {
      this.tableHeight = val - 98 - 50;
    },
  },
  mounted: function () {
    this.tableHeight = this.$store.state.screenHeight - 98 - 30 - 32;

    this.currentPage = 1;
    this.onObtainTranslateModules();
    this.onObtainData();
  },
  methods: {
    //页面发生变化
    pageChange(page) {
      this.currentPage = page;

      this.onObtainData();
    },
    //获取module列表
    onObtainTranslateModules() {
      translateModules()
        .then((result) => {
          if (result.data.code == 200) {
            this.moduleList = result.data.data;
          }
        })
        .catch((err) => {});
    },
    //双击事件
    onDoubleClick(item) {
      var that = this;
      this.$confirm(
        "是否要删除ID为" + item.id + "，内容为【" + item.content + "】的记录",
        "删除翻译【慎重】",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          translateDelete(item.id)
            .then((result) => {
              if (result.data.code == 200) {
                Message.success("删除成功");

                that.currentPage = 1;
                that.onObtainData();
              }
            })
            .catch((err) => {});
        })
        .catch(() => {});
    },
    //关闭pop
    closePop(item) {
      item.pop_visable = false;
    },
    //点击查看日志
    onLog(item) {
      translateLog(item.id)
        .then((result) => {
          if (result.data.code == 200) {
            this.activities = [];
            result.data.data.forEach((item) => {
              this.activities.push({
                content: item.log,
                timestamp: item.time,
              });
            });
            this.dialogShow = true;
          }
        })
        .catch((err) => {});
    },
    //点击 merge
    onMerge(item) {
      var that = this;
      this.$prompt("请输入你希望与之合并的翻译ID", "合并内容", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if (!parseInt(value)) {
            Message.warning("请输入数字");
            return;
          }
          translateMerge(item.id, value)
            .then((result) => {
              if (result.data.code == 200) {
                Message.success("合并成功");
                that.currentPage = 1;
                that.onObtainData();
              }
            })
            .catch((err) => {});
        })
        .catch(() => {});
    },
    onDoConfirm(item) {
      this.$confirm(
        "确定将该翻译标记为【" +
          (item.isConfirm ? "取消确认翻译" : "确认翻译") +
          "】",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          translateConfirm(item.id, !item.isConfirm)
            .then((result) => {
              if (result.data.code == 200) {
                Message.success("操作成功");
                this.onObtainData();
              }
            })
            .catch((err) => {});
        })
        .catch(() => {});
    },
    //点击翻译拆分
    onSplit(item) {
      var that = this;
      this.$confirm(
        "是否需要将该条翻译拆分成两条独立的未合并的翻译记录，拆分之后如果需要合并需要手动再次合并",
        "翻译拆分",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          translateSplit(item.id)
            .then((result) => {
              if (result.data.code == 200) {
                Message.success("拆分成功");

                that.currentPage = 1;
                that.onObtainData();
              }
            })
            .catch((err) => {});
        })
        .catch(() => {});
    },
    //pop点击确定
    okPop(item) {
      item.pop_visable = false;
      if (!item.translate_temp) return;
      translateEdit(item.id, item.translate_temp)
        .then((res) => {
          if (res.data.code == 200) {
            item.originTranslateEn = res.data.data.translate;
            item.translateEn = res.data.data.translate;
            item.updateTime = res.data.data.update_time;
            Message.success("保存成功");
          }
        })
        .catch((e) => {});
    },
    //智能翻译
    onAutoTranslate(item) {
      if (!item.content) return;
      translateContent(item.content)
        .then((res) => {
          item.translate_temp = res.data.data.result;
          item.pop_visable = true;
        })
        .catch((e) => {});
    },
    //保存翻译
    onEditTranslate(item) {
      if (!item.translateEn) return;
      translateEdit(item.id, item.translateEn)
        .then((res) => {
          if (res.data.code == 200) {
            item.originTranslateEn = res.data.data.translate;
            item.updateTime = res.data.data.update_time;
            Message.success("保存成功");
          }
        })
        .catch((e) => {});
    },
    //动态设置表格背景色
    tableRowClassName({ row, rowIndex }) {
      if (!row.isMerged) {
        return "warning-row";
      }
      return "";
    },
    //获取数据
    onObtainData() {
      //clientType,translateState,searchKey,mergeStatus,page
      translateList(
        this.formData.module,
        this.formData.platform,
        this.formData.translate_status,
        this.formData.order_status,
        this.formData.search,
        this.formData.merge_status,
        this.currentPage,
        this.pageSize,
        this.formData.searchType
      )
        .then((result) => {
          var list = [];
          result.data.data.list.forEach((res) => {
            res.pop_visable = false;
            res.originTranslateEn = res.translateEn;
            list.push(res);
          });
          this.tableData = list;

          this.totalCount = result.data.data.total;
          this.currentPage = result.data.data.currentPage;
          this.pageSize = result.data.data.pageSize;
        })
        .catch((err) => {});
    },
    //点击搜索
    onDoSearch() {
      this.currentPage = 1;
      this.onObtainData();
    },
    //点击添加用户
    addUserBtn() {
      this.currentData.dialogTitle = "新增接口";
      this.currentData.title = "";
      this.currentData.path = "";
      this.currentData.request_url = "";
      this.currentData.response = "";
      this.currentData.okBtn = "添 加";
      this.currentData.id = -1;
      this.currentData.type = 1;
      this.dialogShow = true;
    },
    //查看详情
    onDetails(item) {
      mockDetails(item.id)
        .then((result) => {
          var data = result.data.data;
          this.currentData.dialogTitle = "接口详情";
          this.dialogShow = true;
          this.currentData.title = data.title;
          this.currentData.path = data.path;
          this.currentData.id = data.id;
          this.currentData.request_url = data.request_url;
          this.currentData.response = data.response;
          this.currentData.okBtn = "确 定";
          this.currentData.type = 2;
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
.table_container {
  padding-left: 18px;
  padding-right: 18px;
}
.pager {
  padding-left: 18px;
  padding-top: 10px;
  bottom: -50px;
  position: absolute;
  right: 0;
  padding-right: 10px;
  padding-bottom: 10px;
  display: flex;
}
.confirm_tips {
  color: #67c23a;
  padding-left: 10px;
  font-size: 12px;
}
.header {
  padding-top: 10px;
  padding-left: 18px;
}
.tab_tips {
  word-break: break-all;
  width: auto;
  display: block;
  margin-bottom: 6px;
  white-space: pre-wrap;
  word-wrap: break-word;
  height: auto;
}

.el-form-item {
  margin-bottom: 10px;
}

.el-table .warning-row {
  background: oldlace !important;
}

.el-button + .el-button {
  margin-left: 0;
}
</style>