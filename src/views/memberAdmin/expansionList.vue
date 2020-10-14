<template>
  <div class="app-container">
    <div class="app-menu" style="margin-top:0px">
      <div class="type_title">
        <div class="title">扩容分类</div>
        <div class="addTitle" @click="buildNewData"><i class="iconfont icontianjia"/>新增分类</div>
      </div>
      <ul>
        <li v-for="(item,index) in roleoptions" :class="listQuery.parentId==item.id?'active':''" :key="index" class="textLine tempType" @click="changeType(item.id)">
          {{ item.count }}
          <div class="edit">
            <i class="iconfont iconbianji" @click="confirmEdit(item)" />
            <i class="iconfont iconshanchulanse" @click="editTypeDelete(item.id)" />
          </div>
        </li>
      </ul>
    </div>
    <div class="app-content">
      <div class="build" style="width:90px" @click="buildNew">
        <span>
          <i class="el-icon-plus" />
        </span>
        <div>新增</div>
      </div>
      <el-table
        ref="singleTable"
        :data="tableList"
        highlight-current-row
        style="width: 100%"
        class="table"
      >
        <el-table-column type="index" label="序号" width="80"/>
        <el-table-column label="订购时长">
          <template slot-scope="{row}">{{ row.expirationDate }}个月</template>
        </el-table-column>
        <el-table-column label="原价（元）">
          <template slot-scope="{row}">{{ row.originalPrice }}</template>
        </el-table-column>
        <el-table-column label="现价">
          <template slot-scope="{row}">{{ row.salePrice }}</template>
        </el-table-column>
        <el-table-column label="操作时间">
          <template slot-scope="{row}">{{ row.optTime|formatDate('') }}</template>
        </el-table-column>
        <el-table-column label="操作人">
          <template slot-scope="{row}">{{ row.optName }}</template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="{row}">{{ row.description }}</template>
        </el-table-column>
        <el-table-column label="是否显示">
          <template slot-scope="{row}">{{ row.enable==1?'显示':'隐藏' }}</template>
        </el-table-column>
        <el-table-column property="address" label="操作" width="200">
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <i class="iconfont iconbianji" @click="confirmEditItem(row)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <i class="iconfont iconshanchulanse" @click="editDelete(row.id)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :visible.sync="showDialog"
        :title="title"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        class="m_dialog"
        width="560px"
      >
        <el-form
          ref="ruleFormItem"
          :model="ruleFormItem"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原价：" prop="originalPrice" >
            <div class="textareaUrl">
              <el-input
                v-model="ruleFormItem.originalPrice"
                type="text"
                placeholder="请输入原价"
                maxlength="10"
                autocomplete="off"
                @input="numberOriginalPrice($event)"
              />
            <!-- <textarea v-model="ruleForm.url" placeholder="请输入商城链接"  maxlength="200"/> -->
            </div>
          </el-form-item>
          <el-form-item label="现价：" prop="salePrice" >
            <div class="textareaUrl">
              <el-input
                v-model="ruleFormItem.salePrice"
                type="text"
                placeholder="请输入现价"
                maxlength="10"
                autocomplete="off"
                @input="numberSalePrice($event)"
              />
            <!-- <textarea v-model="ruleForm.url" placeholder="请输入商城链接"  maxlength="200"/> -->
            </div>
          </el-form-item>
          <el-form-item label="订购时长：" prop="expirationDate" >
            <div class="textareaUrl">
              <el-input
                v-model="ruleFormItem.expirationDate"
                type="text"
                placeholder="请输入订购时长"
                maxlength="4"
                autocomplete="off"
                oninput="value=value.replace(/[^\d]/g,'')"
              />
            <!-- <textarea v-model="ruleForm.url" placeholder="请输入商城链接"  maxlength="200"/> -->
            </div>
          </el-form-item>
          <el-form-item label="备注：" prop="description">
            <div class="remarks_box">
              <div class="remarks">
                <el-input
                  v-model="ruleFormItem.description"
                  :rows="5"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="200"
                />
                <span>{{ ruleFormItem.description.length }}/200</span>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="启用/禁用">
            <el-switch
              v-model="ruleFormItem.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#2274e5"
              inactive-color="#ddd"
            />
          </el-form-item>
          <el-form-item class="submit ">
            <div class="m_floatR">
              <el-button @click="showDialog=false">取消</el-button>
              <el-button type="primary" @click="!isedit? createData(): updateData()">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 新增分类 -->
      <el-dialog :close-on-click-modal="false" :visible.sync="isdialog" :title="title" class="dialog" width="500px">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="扩容数量：" prop="count">
            <el-input
              v-model="ruleForm.count"
              type="text"
              placeholder="请输入扩容数量："
              maxlength="4"
              autocomplete="off"
              @keyup.native="ruleForm.count=ruleForm.count.replace(/[^0-9]/g,'')"
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
  </div>
</template>

<script>
import { extend_insert, extend_list, extend_lists, extend_update, extend_delete, extend_inserts, extend_updates } from '@/api/api'
import moment from 'moment'
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      roleoptions: [],
      showDialog: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      title: '新增',
      rules: {
        count: [
          { required: true, message: '此处不能为空', trigger: 'blur' },
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        expirationDate: [
          { required: true, message: '此处不能为空', trigger: 'blur' },
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        salePrice: [
          { required: true, message: '此处不能为空', trigger: 'blur' },
          { required: true, message: '此处不能为空', trigger: 'change' }
        ],
        originalPrice: [
          { required: true, message: '此处不能为空', trigger: 'blur' },
          { required: true, message: '此处不能为空', trigger: 'change' }
        ]
      },
      ruleForm: {
        count: ''
      },
      ruleFormItem: {
        parentId: '',
        expirationDate: '',
        originalPrice: '',
        salePrice: '',
        description: '',
        enable: 1
      },
      listQuery: { parentId: '' }
    }
  },
  created() {
    this.listapi = extend_lists
    this.getList()
    document.body.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.searchTemp()
      }
    })
  },
  methods: {
    changeCount(event) {
      event.target.value = (event.target.value.match(/^([0]|[1-9][0-9]*)$/g)) || null
    },
    number(e) {
      console.log(e.target.value)

      const  flag = new RegExp('^[1-9]([0-9])*$').test(e.target.value)

      console.log(flag)

      if (!flag) {
        this.$message({

          showClose: true,

          message: '请输入正整数',

          type: 'warning'

        })
      }
    },
    numberOriginalPrice(value) {
      setTimeout(() => {
        this.ruleFormItem.originalPrice = (value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      }, 0)
    },
    numberSalePrice(value) {
      setTimeout(() => {
        this.ruleFormItem.salePrice = (value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      }, 0)
    },
    deleteDataType(id, url, apiname, data) {
      this.$confirm('删除后将无法恢复，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await url({ id })
        if (res.code === 100) {
          this.listQuery.parentId = ''
          this.getList()
          this.$message({
            showClose: true,
            message: '删除数据成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      })
    },

    createData() {
      this.$refs.ruleFormItem.validate(async valid => {
        if (valid) {
          var tempData = this.roleoptions.filter(element => {
            return element.id === this.listQuery.parentId
          })
          if (tempData.length > 0) {
            this.ruleFormItem.count = tempData[0].count
          }
          extend_inserts(this.ruleFormItem).then(res => {
            this.showDialog = false
            this.getDataList(Object.assign({}, this.listQuery), extend_lists)
            this.$message.success('添加成功')
          })
        } else {
          return false
        }
      })
    },
    // 编辑
    confirmEdit(row) {
      this.title = '编辑'
      this.isedit = true
      this.isdialog = true
      this.ruleForm = {
        count: row.count,
        id: row.id
      }
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    confirmEditItem(row) {
      this.title = '编辑'
      this.isedit = true
      this.showDialog = true

      this.ruleFormItem = {
        id: row.id,
        parentId: row.parentId,
        expirationDate: row.expirationDate,
        originalPrice: row.originalPrice,
        salePrice: row.salePrice,
        description: row.description ? row.description : '',
        enable: row.enable
      }
      this.$nextTick(() => {
        this.$refs['ruleFormItem'].clearValidate()
      })
    },
    updateData() {
      this.$refs.ruleFormItem.validate(async valid => {
        if (valid) {
          var tempData = this.roleoptions.filter(element => {
            return element.id === this.listQuery.parentId
          })
          if (tempData.length > 0) {
            this.ruleFormItem.count = tempData[0].count
          }
          extend_updates(this.ruleFormItem).then(res => {
            this.showDialog = false
            this.getDataList(Object.assign({}, this.listQuery), extend_lists)
            this.$message.success('修改成功')
          })
        } else {
          return false
        }
      })
    },
    editTypeDelete(id) {
      this.deleteDataType(id, extend_delete, extend_list, this.listQuery)
    },
    addData() {
      this.addListDataType('ruleForm', extend_insert, extend_update, this.isedit, extend_list)
    },
    async addListDataType(formName, url, editurl, status, apiname, queryData, name) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const apiurl = status ? editurl : url
          const res = await apiurl(this.ruleForm)
          if (res.code === 100) {
            this.isdialog = false
            this.getList()
            this.$message({
              showClose: true,
              message: status ? '修改数据成功' : '新增数据成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    },
    buildNewData() {
      this.title = '新增'
      this.isedit = false
      this.ruleForm = {
        count: ''
      }
      this.isdialog = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    buildNew() {
      this.title = '新增'
      this.isedit = false
      this.dialogStatus = 'create'
      this.ruleFormItem = {
        parentId: this.listQuery.parentId,
        expirationDate: '',
        originalPrice: '',
        salePrice: '',
        description: '',
        enable: 1
      }
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['ruleFormItem'].clearValidate()
      })
    },
    // 编辑模板管理
    editBack(id) {
      this.$router.push({
        path: '/material/templateAdminEdit',
        query: {
          id
        }
      })
    },
    async getDataList(data, url) {
      const res = await url(data)
      if (res.code === 100) {
        this.tableList = res.data
        if (res.data.length <= 0) {
          this.ruleFormItem = {
            parentId: this.listQuery.parentId,
            expirationDate: 12,
            originalPrice: 100,
            salePrice: 89,
            description: '',
            enable: 1
          }
          var tempData = this.roleoptions.filter(element => {
            return element.id === this.listQuery.parentId
          })
          if (tempData.length > 0) {
            this.ruleFormItem.count = tempData[0].count
          }

          extend_inserts(this.ruleFormItem).then(res => {
            this.getDataList(Object.assign({}, this.listQuery), extend_lists)
          })
        }
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 查询分类
    async getList() {
      const res = await extend_list()
      if (res.code === 100) {
        this.roleoptions = res.data
        if (res.data.length > 0) {
          if (!this.listQuery.parentId) { this.listQuery.parentId = res.data[0].id }
          this.getDataList(Object.assign({ pageNo: this.currentpage, pageSize: this.pagesize }, this.listQuery), extend_lists)
        }
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    searchTemp() {
      this.getDataList(this.listQuery,
        extend_lists
      )
    },
    resetTemp() {
      this.listQuery.name = ''
      this.listQuery.fileWidth = ''
      this.listQuery.fileHeight = ''
      this.listQuery.templateTypeId = ''
      this.searchTemp()
    },
    changeType(val) {
      this.listQuery.parentId = val
      this.searchTemp()
    },
    editDelete(id) {
      this.deleteDataType(id, extend_delete, extend_lists, this.listQuery)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.search-list {
  /deep/ .el-input__suffix {
    width: auto !important;
  }
}
.build {
  font-size: 16px;
  div{
    margin-top:2px;
  }
}
</style>
