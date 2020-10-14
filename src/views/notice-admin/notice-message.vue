<template>
  <div class="app-container notice-message">
    <div class="select_box approval_box  m_clearLR">
      <ul class="notice-ul m_clearLR m_floatL" >
        <li :class="listQuery.type==1?'active':''" class="m_floatL li-item" @click="changeType(1)" >启动页</li>
        <li :class="listQuery.type==2?'active':''" class="m_floatL li-item" @click="changeType(2)" >首页</li>
        <li :class="listQuery.type==3?'active':''" class="m_floatL li-item" @click="changeType(3)" >商城链接</li>
        <li :class="listQuery.type==4?'active':''" class="m_floatL li-item" @click="changeType(4)" >个人中心</li>
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
      <el-table-column label="通知内容">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="{row}">
          <span :style="row.status==1?'color:#2274E5':'color:#FF0000'">{{ row.status==1?'启用':'禁用' }}</span>
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
      <el-table-column label="更新时间">
        <template slot-scope="{row}">
          <span>{{ row.updateTime|formatDate() }}</span>
        </template>
      </el-table-column>

      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i

                  class="iconfont iconbianji"
                  @click="confirmEdit(row)"
                />
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
        <el-form-item label="内容：" prop="description">
            <div class="remarks_box">
              <div class="remarks">
                <el-input
                  v-model="ruleForm.description"
                  :rows="5"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="200"
                />
                <span>{{ ruleForm.description.length }}/200</span>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="启用/禁用">
            <el-switch
              v-model="ruleForm.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#2274e5"
              inactive-color="#ddd"
            />
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
  noticeList,
  noticeUpdate
} from '@/api/api-message'
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
        status:0,
        description: ''
      },
      rules: {
        name: [{ required: true, validator: validateName }],
        image: [{ required: true, message: '请上传缩略图' }]
      },
      // 是否编辑
      isedit: false,
      // 弹窗标题
      title: '添加',
      listQuery: { type: 1 }
    }
  },
  computed: {},
  created() {
    this.listapi = noticeList
    this.getListDataMessage(Object.assign({  }, this.listQuery), noticeList)
  },
  methods: {
    async getListDataMessage(data, url) {
      const res = await url(data)
      if (res.code === 100) {
        this.tableList = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    changeType(type) {
      this.listQuery.type = type
      this.listQuery.pageNo = 1
      this.getListDataMessage(Object.assign({  }, this.listQuery), noticeList)
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
      noticeUpdate(this.ruleForm).then(res=>{
        this.isdialog = false
        this.$message.success('修改成功')
        this.getListDataMessage(Object.assign({  }, this.listQuery), noticeList)
      })
    },
    confirmEdit(row) {
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
      this.isedit = true
      this.isdialog = true
      this.title = '编辑'
      this.ruleForm = {
        description: row.description,
        status:row.status,
        id: row.id
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import './index.scss';
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
