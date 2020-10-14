<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="build" @click="buildNewData">
        <span>
          <i class="el-icon-plus" />
        </span>添加
      </div>
      <div class="search m_search">
        <el-input v-model="listQuery.name" placeholder="搜索相关关键词" maxlength="20" class="input-with-select" @keyup.native.enter="handleSearch">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
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
      <el-table-column property="imgPath" label="缩略图">
        <template slot-scope="{row}">
          <div class="thumbnail">
            <img :src="row.imgPath" >
            <div class="edit">
              <i class="iconfont iconfangdachakan" @click="enlargeImage(row.imgPath)" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="name" label="字体名称" />
      <el-table-column property="fontsCategory" label="语言">
        <template slot-scope="{row}">
          <span>{{ row.fontsCategory === 1 ? '中文': 'English' }}</span>
        </template>
      </el-table-column>
      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i class="iconfont iconbianji" @click="confirmEdit(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="下载" placement="top">
            <a :href="row.fontsPath" class="iconfont iconxiazai" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i class="iconfont iconshanchulanse" @click="editDelete(row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :close-on-click-modal="false" :visible.sync="isdialog" :title="title" class="dialog" width="500px">
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
            placeholder="请输入文件名"
            maxlength="50"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="缩略图：" class="backupload" prop="imgPath">
          <div class="file">
            <div v-if="ruleForm.imgPath === ''" class="upfile">
              <input type="file" accept=".jpg, .png" @change="uploadChange($event,15,'imgPath')">
              <i class="iconfont icontianjiatupian" />
              <p>文件格式jpg、png，</p>
              <p>文件大小200K</p>
            </div>
            <div v-else class="fileimg">
              <div class="fileimg-delete">
                <i class="iconfont iconshanchulanse" @click="deleteUpload('imgPath')" />
              </div>
              <img :src="ruleForm.imgPath" >
            </div>
          </div>
        </el-form-item>

        <!-- <el-form-item label="字体文件：" prop="fontsPath" class="fileprogress">
          <div class="ttffile">
            <input type="file" accept=".ttf" @change="uploadChange($event,6,'fontsPath', 20480)">
            <span>选择文件</span>
            <p>文件格式ttf，文件大小20mb</p>
          </div>
          <div v-if="percent && fileUrl" class="progress">
            <el-progress
              v-show="percent && fileUrl"
              :percentage="percent"
              :show-text="false"
              :stroke-width="4"
              color="#2274E5"
            />
            <i
              v-if="percent === 100 && ruleForm.fontsPath"
              class="iconfont iconshanchuhuise"
              @click="deleteUpload"
            />
          </div>
        </el-form-item> -->
        <!-- <el-form-item label="模板文件：" prop="file" class="fileprogress">
          <div class="ttffile">
            <input type="file" accept=".ttf" @change="uploadChange($event,6, 'fontsPath', 2048)" >
            <span>选择文件</span>
            <p>仅支持ddl格式，文件大小2MB</p>
          </div>
          <div v-if="ruleForm.fontsPath" class="progress">
            <span v-if="percent===0">{{ ruleForm.fontsPath }}</span>
            <el-progress
              v-if="percent!==0"
              :percentage="percent"
              :show-text="false"
              :stroke-width="4"
              color="#2274E5"
            />
            <i
              class="iconfont iconshanchuhuise"
              @click="deleteUpload('file')"
            />
          </div>
        </el-form-item> -->

        <el-form-item label="字体文件：" prop="fontsPath" class="fileprogress">
          <div class="ttffile">
            <input type="file" accept=".ttf" @change="uploadChange($event,6,'fontsPath', true)" >
            <span>选择文件</span>
            <p>文件格式ttf，文件大小20mb</p>
          </div>
          <ProgressBar v-if="ispercent && ruleForm.fontsPath === ''" />
          <div v-if="ruleForm.fontsPath && !ispercent" class="progress">
            <span>{{ oldName }}</span>
            <i class="iconfont iconshanchuhuise" @click="deleteUpload('fontsPath')" />
          </div>
        </el-form-item>
        <el-form-item label="语言：" prop="fontsCategory" class="version">
          <div class="selectradio">
            <el-radio-group v-model="ruleForm.fontsCategory">
              <el-radio :label="1">中文</el-radio>
              <el-radio :label="2">English</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="resetForm">取消</el-button>
          <el-button type="primary" @click="addData">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 放大图片 -->
    <el-dialog :visible.sync="isEnlarge" :modal-append-to-body="false" :show-close="false" :width="widthauto" title class="imgdialog">
      <img :src="imgPath" class="magnifier" @load="onLoad">
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
        @current-change="handleCurrentChange($event, listQuery)"/>
    </div>
  </div>
</template>

<script>
import { fontsList, fontsInsert, fontsDelete, fontsUpdate } from '@/api/api'
import ProgressBar from '@/components/ProgressBar'
import { validateName } from '@/utils/validate'
export default {
  name: 'ComplexTable',
  filters: {},
  components: { ProgressBar },
  data() {
    return {
      ruleForm: {
        id: '',
        name: '',
        fontsCategory: 1,
        imgPath: '',
        fontsPath: ''
      },
      rules: {
        name: [{ required: true, validator: validateName }],
        imgPath: [{ required: true, message: '请上传缩略图' }],
        fontsPath: [{ required: true, message: '请上传字体文件' }]
      },
      title: '添加',
      // 是否编辑
      isedit: false,
      listQuery: { name: '', pageSize: 10, pageNo: 1 }
    }
  },
  created() {
    this.listapi = fontsList
    this.getListData(Object.assign({ pageNo: this.currentpage, pageSize: this.pagesize }, this.listQuery), fontsList)
  },
  methods: {
    addData() {
      this.addListData(
        'ruleForm',
        fontsInsert,
        fontsUpdate,
        this.isedit,
        fontsList,
      )
    },
    confirmEdit(row) {
      this.isdialog = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
      this.isedit = true
      this.ruleForm.id = row.id
      this.ruleForm.name = row.name
      this.ruleForm.fontsPath = row.fontsPath
      this.ruleForm.imgPath = row.imgPath
      this.ruleForm.fontsCategory = row.fontsCategory
      this.oldName = row.fontsPath
      this.isdialog = true
    },
    editDelete(id) {
      this.deleteData(id, fontsDelete, fontsList, this.listQuery)
    },
    handleSearch() {
      this.listQuery.pageNo = 1
      this.currentpage = 1
      this.getListData(
        this.listQuery,
        fontsList
      )
    },
    buildNewData() {
      this.ruleForm.imgPath = ''
      this.ruleForm.fontsPath = ''
      this.ruleForm.name = ''
      this.ruleForm.id = ''
      this.isdialog = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.version {
  width: 380px;
}
</style>
