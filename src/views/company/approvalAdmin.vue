<template>
  <div class="app-container">
    <div class="select_box approval_box  m_clearLR">
      <ul class="m_data_ul m_clearLR m_floatL" >
        <li :class="listQuery.type==1?'active':''" class="m_floatL" @click="changeType(1)" >启动页</li>
        <li :class="listQuery.type==2?'active':''" class="m_floatL" @click="changeType(2)" >首页</li>
        <li :class="listQuery.type==3?'active':''" class="m_floatL" @click="changeType(3)" >商城链接</li>
        <li :class="listQuery.type==4?'active':''" class="m_floatL" @click="changeType(4)" >个人中心</li>
      </ul>
    </div>
    <el-table
      ref="singleTable"
      :data="tableList"
      highlight-current-row
      style="width: 100%"
      class="table"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="公司简称">
        <template slot-scope="{row}">
          <span>{{ row.companyName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="平台">
        <template slot-scope="{row}">
          <span>{{ row.equip==1?'Android端':row.equip==2?'IOS端':'PC端' }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="主分类">
        <template slot-scope="{row}">
          <span>{{ row.mainType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="次分类">
        <template slot-scope="{row}">
          <span>{{ row.secondType }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作类型">
        <template slot-scope="{row}">
          <span>{{ row.operateType==1?'新增':'编辑' }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="listQuery.type!=3" property="imgPath" label="缩略图">
        <template slot-scope="{row}">
          <div class="thumbnail">
            <img :src="row.imgPath" >
            <div class="edit">
              <i class="iconfont iconfangdachakan" @click="enlargeImage(row.imgPath)" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="updateTime" label="链接">
        <template slot-scope="{row}">
          <a :href="row.linkPath" target="_blank" style="font-size:14px;color:#2274e5;">{{ row.linkPath }}</a>
        </template>
      </el-table-column>

      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="审核" placement="top">
            <i class="iconfont iconshenhe" @click="approval(row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
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
            placeholder="仅支持中英文、数字和下划线，不包含特殊字符"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="缩略图：" class="backupload" prop="image">
          <div class="file">
            <div v-if="ruleForm.image=== ''" class="upfile">
              <input
                type="file"
                accept=".png, .jpg"
                @change="uploadChange($event, 3 ,'image',200)"
              >
              <i class="iconfont icontianjiatupian" />
              <p>文件格式jpg、png，</p>
              <p>文件大小200K</p>
            </div>
            <div v-else class="fileimg">
              <div class="fileimg-delete">
                <i class="iconfont iconshanchulanse" @click="deleteUpload('image')" />
              </div>
              <img :src="ruleForm.image" >
            </div>
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
  </div>
</template>

<script>
import {
  ad_list,
  templatebackgroundInsert,
  templatebackgroundDelete,
  templatebackgroundUpdate,
  ad_update
} from '@/api/api'
import moment from 'moment'
import { validateName } from '@/utils/validate'
export default {
  name: 'TagBackGround',
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        image: ''
      },
      rules: {
        name: [{ required: true, validator: validateName }],
        image: [{ required: true, message: '请上传缩略图' }]
      },
      // 是否编辑
      isedit: false,
      // 弹窗标题
      title: '添加',
      listQuery: { type: 1, pageNo: 1, pageSize: 10 }
    }
  },
  computed: {},
  created() {
    this.listapi = ad_list
    this.getListData(Object.assign({ pageNo: this.currentpage, pageSize: this.pagesize }, this.listQuery), ad_list)
  },
  methods: {
    changeType(type) {
      this.listQuery.type = type
      this.listQuery.pageNo = 1
      this.getListData(Object.assign({ pageNo: this.currentpage, pageSize: this.pagesize }, this.listQuery), ad_list)
    },
    approval(item) {
      ad_update({ id: item.id, type: this.listQuery.type }).then(res => {
        this.getListData(Object.assign({ pageNo: this.currentpage, pageSize: this.pagesize }, this.listQuery), ad_list)
        this.$message.success('审批成功')
      })
    },
    openAdd() {
      this.resetTemp()
      this.isEdit = false
      this.isdialog = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    resetTemp() {
      this.ruleForm = {
        name: '',
        image: ''

      }
    },
    addData() {
      this.title = '添加'
      this.addListData(
        'ruleForm',
        templatebackgroundInsert,
        templatebackgroundUpdate,
        this.isedit,
        ad_list
      )
    },
    confirmEdit(row) {
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
      this.isedit = true
      this.isdialog = true
      this.title = '编辑'
      this.ruleForm = {
        name: row.name,
        image: row.image,
        id: row.id
      }
    },
    editDelete(id) {
      this.deleteData(id, templatebackgroundDelete, ad_list, this.listQuery)
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
