<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="build" @click="buildNewData">
        <span>
          <i class="el-icon-plus" />
        </span>添加
      </div>
      <div class="search m_search">
        <el-input v-model="listQuery.name" maxlength="20" @keyup.native.enter="handleSearch" placeholder="搜索相关关键词" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"  @click="handleSearch" />
        </el-input>
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="tableList"
      highlight-current-row
      style="width: 100%"
      class="table"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column property="framePath" label="缩略图">
        <template slot-scope="{row}">
          <div class="thumbnail">
            <img :src="row.framePath" >
            <div class="edit">
              <i class="iconfont iconfangdachakan" @click="enlargeImage(row.framePath)" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="name" label="背景名称" />
      <el-table-column property="userName" label="创建者" />
      <el-table-column property="updateTime" label="上传时间">
        <template slot-scope="{row}">
          <span>{{ row.updateTime | formatDate(row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i class="iconfont iconbianji" @click="confirmEdit(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="下载" placement="top">
            <a :href="row.framePath" class="iconfont iconxiazai" download />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i class="iconfont iconshanchulanse" @click="editDelete(row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal='false' :visible.sync="isdialog" :title="title" class="dialog" width="500px">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文件名：" prop="name" class="version">
          <el-input
            v-model="ruleForm.name"
            type="text"
            placeholder="仅支持中英文、数字和下划线，不包含特殊字符"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="缩略图：" class="backupload" prop="framePath">
          <div class="file">
            <div v-if="ruleForm.framePath=== ''" class="upfile">
              <input
                ref="framePath"
                type="file"
                accept=".jpg, .png"
                @change="uploadChange($event, 4 ,'framePath',200)"
              >
              <i class="iconfont icontianjiatupian" />
              <p>文件格式jpg、png，文件大小200K</p>
            </div>
            <div v-else class="fileimg">
              <div class="fileimg-delete">
                <i class="iconfont iconshanchulanse" @click="deleteUpload('framePath')" />
              </div>
              <img :src="ruleForm.framePath" >
            </div>
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="addData">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <div v-if="totalnumber > 10" class="pagination-container">
      <el-pagination
        :current-page.sync="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange($event, listQuery)"
        @current-change="handleCurrentChange($event, listQuery)"
      />
    </div>
    <!-- 放大图片 -->
    <el-dialog :visible.sync="isEnlarge" :modal-append-to-body="false" :show-close="false" :width="widthauto" title class="imgdialog">
      <img :src="imgPath" class="magnifier" @load="onLoad">
    </el-dialog>
  </div>
</template>

<script>
import { frameList, frameInsert, frameDelete, frameUpdate } from '@/api/api'
import moment from 'moment'
import { validateName } from '@/utils/validate'
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      ruleForm: {
        id: '',
        name: '',
        framePath: ''
      },
      rules: {
        name: [{ required: true, validator: validateName }],
        framePath: [{ required: true, message: '请上传缩略图' }]
      },
      // 是否编辑
      isedit: false,
      // 弹窗标题
      title: '添加',
      listQuery: { name: '' ,pageNo:1,pageSize:10}
    }
  },
  computed: {},
  created() {
    this.listapi = frameList
    this.getListData(Object.assign({ pageNo: this.currentpage, pageSize: this.pagesize }, this.listQuery), frameList)
  },
  methods: {
    addData() {
      this.title = '添加'
      this.addListData(
        'ruleForm',
        frameInsert,
        frameUpdate,
        this.isedit,
        frameList
      )
    },
    confirmEdit(row) {
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
      this.isedit = true
      this.isdialog = true
      this.title = '编辑'
      this.ruleForm = {
        name: row.name,
        framePath: row.framePath,
        id: row.id
      }

    },
    editDelete(id) {
      this.deleteData(id, frameDelete, frameList, this.listQuery)
    },
    // 添加新数据
    buildNewData() {

      this.ruleForm = {
        id: '',
        name: '',
        framePath: ''
      }
      this.isdialog = true
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.version {
  width: 380px;
}
.ttffile {
  position: relative;
  text-align: center;
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 32px;
    z-index: 9;
    opacity: 0;
  }
  p {
    display: inline-block;
    margin: 0 0 0 16px;
    font-size: 12px;
    color: #c3c3c3;
  }
  span {
    display: inline-block;
    width: 80px;
    height: 32px;
    background: #2274e5;
    border-radius: 4px;
    color: #ffffff;
    font-size: 12px;
  }
}
</style>
