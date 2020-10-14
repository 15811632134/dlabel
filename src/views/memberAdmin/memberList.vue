<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="build" @click="openAdd">
        <span>
          <i class="el-icon-plus" />
        </span>新增
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
      <el-table-column property="levelName" label="会员名称" />
      <el-table-column property="levelDesc" label="会员描述" />
      <el-table-column property="optTime" label="操作时间">
        <template slot-scope="{row}">
          <span>{{ row.optTime | formatDate(row.optTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column property="optUser" label="操作人" />
      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i class="iconfont iconbianji" @click="confirmEdit(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i class="iconfont iconshanchulanse" @click="editDelete(row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div v-if="totalnumber > 10" class="pagination-container">
      <el-pagination
        :current-page.sync="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange($event, listQuery)"
        @current-change="handleCurrentChange($event, listQuery)"
      />
    </div> -->
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
  get_vip_list,
  templatebackgroundInsert,
  del_vip_info_by_id,
  templatebackgroundUpdate
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
      listQuery: { name: '', pageNo: 1, pageSize: 10 }
    }
  },
  computed: {},
  created() {
    this.initData()
  },
  methods: {
    initData(){
      get_vip_list().then(res=>{
        this.tableList = res.data
      })
    },
    openAdd() {
      this.$router.push({name:'memberAdd'})
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
        get_vip_list
      )
    },
    confirmEdit(row) {
      this.$router.push({name:'memberAdd',query:{id:row.id}})
    },
    editDelete(id) {
      const h = this.$createElement
      this.$msgbox({
        title: '消息',
        message: h('p', null, [h('span', null, '删除后将无法恢复，是否继续？')]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'

            del_vip_info_by_id({ vip_config_id: id }).then(res => {
              done()
              this.initData()
              this.$message.success('删除成功')
              instance.confirmButtonLoading = false
            }).catch(error => {
              done()
              instance.confirmButtonLoading = false
            })
          } else {
            done()
          }
          console.log(done)
        }
      }).then(action => {
        // this.$message({
        //   type: "info",
        //   message: "action: " + action
        // });
      })
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
