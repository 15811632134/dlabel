<template>
  <div class="app-container">
    <div class="filter-container" v-if="permissionData.indexOf('print_manage_image_text_course_add_executable')!=-1">
      <div class="build" @click="openAdd">
        <span>
          <i class="el-icon-plus" />
        </span>添加
      </div>

    </div>
    <el-table
      ref="singleTable"
      :data="tableList"
      highlight-current-row
      style="width: 100%"
      class="table"
    >
      <el-table-column type="index" label="序号" width="80"/>
      <el-table-column property="framePath" label="图文教程">
        <template slot-scope="{row}">
          <div class="thumbnail">
            <img :src="row.url">
            <div class="edit">
              <i class="iconfont iconfangdachakan" @click="enlargeImage(row.url)" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="name" label="名称" />
      <el-table-column property="url" label="图文链接" />
      <el-table-column property="equip" label="平台">
        <template slot-scope="{row}">
          <span>{{ row.equip === 1 ? 'Android': row.equip === 2 ? 'IOS' : 'PC' }}</span>
        </template>
      </el-table-column>
      <el-table-column property="equip" label="语言">
        <template slot-scope="{row}">
          <span>{{ row.languageId === 1 ? '中文': 'English' }}</span>
        </template>
      </el-table-column>
      <el-table-column property="updateTime" label="类目" >
        <template slot-scope="{row}">
          <span>{{ row.courseType === 1 ? '使用指导': '数据库' }}</span>
        </template>
      </el-table-column>

      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i class="iconfont iconbianji" v-if="permissionData.indexOf('print_manage_image_text_course_edit_executable')!=-1" @click="confirmEdit(row)" />
          </el-tooltip>

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i class="iconfont iconshanchulanse"  v-if="permissionData.indexOf('print_manage_image_text_course_delete_executable')!=-1" @click="editDelete(row.id)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog  :close-on-click-modal='false' :visible.sync="isdialog" :title="title" class="dialog" width="500px">
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
            maxlength="50"
            type="text"
            placeholder="仅支持中英文、数字和下划线，不包含特殊字符"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="缩略图：" class="backupload" prop="url">
          <div class="file">
            <div v-if="!ruleForm.url" class="upfile">
              <input type="file" accept=".jpg, .png" @change="uploadChange($event,13,'url')">
              <i class="iconfont icontianjiatupian"/>
              <p>文件格式jpg、png，</p>
              <p>文件大小2M</p>
            </div>
            <div v-else class="fileimg">
              <div class="fileimg-delete">
                <i class="iconfont iconshanchulanse" @click="deleteUploadImg('url')"/>
              </div>
              <img :src="ruleForm.url">
            </div>
          </div>
        </el-form-item>
        <el-form-item label="平台：" prop="fontsCategory" class="version">
          <div class="selectradio">
            <el-radio-group v-model="ruleForm.equip">
              <el-radio :label="1">Android</el-radio>
              <el-radio :label="2">iOS</el-radio>
              <el-radio :label="3">PC</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="语言：" prop="fontsCategory" class="version">
          <div class="selectradio">
            <el-radio-group v-model="ruleForm.languageId">
              <el-radio :label="1">中文</el-radio>
              <el-radio :label="2">English</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="类目：" prop="fontsCategory" class="version">
          <div class="selectradio">
            <el-radio-group v-model="ruleForm.courseType">
              <el-radio :label="1">使用指导</el-radio>
              <el-radio :label="2">数据库</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="addData">确定</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <div v-show="totalnumber > 10" class="pagination-container">
      <el-pagination
        :current-page="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <!-- 放大图片 -->
    <el-dialog :visible.sync="isEnlarge" :show-close="false" title class="imgdialog">
      <img :src="imgPath" class="magnifier" >
    </el-dialog>
  </div>
</template>

<script>
// import { startpageList, startpageUpdate, startpageDelete, startpageInsert } from '@/api/api'
import {mapGetters} from 'vuex'
import {
  courseList,
  courseInsert,
  courseDelete,
  courseUpdate,uploadPic
} from '@/api/api'
import { validateName } from '@/utils/validate'
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
      ruleForm: {
        name: '',
        url: '',
        type:4
      },
      pageSize: 10,
      equip:['Android','IOS','PC'],
      languageId:['中文','English'],
      courseType:['使用指导','数据库'],
      rules: {
        name: [{ required: true, validator: validateName }],
        url: [{ required: true, message: '请上传缩略图' }]
      },
      // 是否编辑
      isedit: false,
      // 弹窗标题
      title: '添加',
      listQuery:{ pageNo: 1, pageSize:10,type:1, }
    }
  },
  computed: {
    ...mapGetters([
      'permissionData'

    ])
  },
  created() {
    this.listapi = courseList
    this.asyGetData = this.getData
    this.getListData(this.listQuery, courseList)
  },
  methods: {
    openAdd(){
      this.isedit = false
      this.resetTemp()
      this.dialogStatus = 'create'
      this.isdialog = true
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },
    getList(){this.getListData(this.listQuery, courseList)},
    addData() {

      console.log(this.ruleForm)
      this.title = '添加'
      this.addListData(
        'ruleForm',
        courseInsert,
        courseUpdate,
        this.isedit,
        courseList,
        this.listQuery
      )
    },
    resetTemp(){
      this.ruleForm = {
        name: '',
        equip: 1,
        type: '1',
        url:'',
        courseType:1,
        languageId:1
        }
    },
    confirmEdit(row) {
      this.isedit = true
      this.isdialog = true
      this.title = '编辑'
      this.ruleForm = Object.assign({}, row); // copy obj

      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },
    editDelete(id) {
      const h = this.$createElement;
      this.$msgbox({
        title: "消息",
        message: h("p", null, [h("span", null, "您确定要删除该数据吗！")]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            courseDelete(id).then(res => {
              done();
              this.getList();
              this.$message.success('删除成功')
              instance.confirmButtonLoading = false;
            }).catch(error=>{
              done();
              instance.confirmButtonLoading = false;
            });
          } else {
            done();
          }
          console.log(done);
        }
      }).then(action => {
        // this.$message({
        //   type: "info",
        //   message: "action: " + action
        // });
      });
      // this.deleteData(id, courseDelete, courseList)
    },
    handleSearch() {
        this.getListData(
         this.listQuery,
          courseList
        )
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
