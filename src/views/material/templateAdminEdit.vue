<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <ProgressBar/> -->
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="template-editor"
      >
        <el-form-item label="文件名：" prop="name">
          <div style="width:364px;">
            <el-input v-model="ruleForm.name" placeholder="仅支持中英文、数字和下划线，不包含特殊字符" maxlength="20" />
          </div>
        </el-form-item>
        <el-form-item label="缩略图：" prop="img" class="backupload">
          <div class="file">
            <input type="file" accept=".jpg, .png" @change="uploadChange($event,1,'img')" >
            <i class="iconfont icontianjiatupian" />
            <p>文件格式jpg、png，文件大小200K</p>
            <div v-if="ruleForm.img" class="fileimg">
              <div class="fileimg-delete">
                <i class="iconfont iconshanchulanse" @click="deleteUpload('img')" />
              </div>
              <img :src="ruleForm.img" >
            </div>
          </div>
        </el-form-item>
        <el-form-item label="模板文件：" prop="file" class="fileprogress">
          <div class="ttffile">
            <input type="file" accept=".ddl" @change="uploadChange($event,2, 'file', true)" >
            <span>选择文件</span>
            <p>仅支持ddl格式，文件大小2MB</p>
          </div>
          <div v-if="ruleForm.file && !ispercent" class="progress">
            <span>{{ oldName }}</span>
            <i class="iconfont iconshanchuhuise" @click="deleteUpload('file')" />
          </div>
          <ProgressBar v-if="ruleForm.file === '' && ispercent" />
        </el-form-item>
        <el-form-item label="分类：" prop="templateTypeId">
          <el-select
            v-model="ruleForm.templateTypeId"
            filterable
            placeholder="请选择"
            style="width:320px"
            @change="changeType"
          >
            <el-option
              v-for="item in roleoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="尺寸：" required>
          <div class="template-size">
            <el-form-item prop="fileWidth">
              <el-input
                v-model="ruleForm.fileWidth"
                placeholder="宽"
                prop="fileWidth"
                maxlength="5"
                @keyup.native="number('fileWidth')"
              />
            </el-form-item>
            <span>*</span>
            <el-form-item prop="fileWidth">
              <el-input
                v-model="ruleForm.fileHeight"
                placeholder="高"
                prop="fileHeight"
                maxlength="5"
                @keyup.native="number('fileHeight')"
              />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="背景：" prop="templateBackgroundId">
          <div class="templateback">
            <div v-if="ruleForm.templateBackgroundId" class="selectback">
              <div class="edit">
                <i class="iconfont iconshanchulanse" @click="deleteBack" />
              </div>
              <img :src="selectimg" >
            </div>
            <div v-else class="noback">
              <img src="@/assets/img/icon_img.png" >
              <span class="backspan" @click="selectBack">选择背景</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item class="saveback">
          <span @click="addTemplateList">保存</span>
          <span @click="goback">取消</span>
        </el-form-item>
      </el-form>
      <!--  选择背景 -->
      <el-dialog
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        class="dialog backlist"
        title="选择背景"
        width="810px"
      >
        <div class="backdrop">
          <div class="type-box">
            <div class="li-type textLine" :class="{active:index==currentIndex}" v-for="(item,index) in backTypes" :key="index" @click="changeBackType(item.id,index)">{{item.name}}</div>
          </div>
          <p v-if="tableList.length===0">没有背景图片</p>
          <ul v-else>
            <li
              v-for="(item,index) in tableList"
              :key="index"
              :class="{'active':index === selectindex}"
              @click="selectListBack(index,item.id,item.image)"
            >
              <img :src="item.image" >
            </li>
          </ul>
        </div>
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
        <div class="backsubmit">
          <span @click="dialogVisible = false">取消</span>
          <span @click="confirmBack">确定</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  templatetypeAllList,
  templateInsert,
  templateUpdate,
  templatebackgroundList,
  templatebackgroundTotal,
  templatesystemSelect,
  templatebackgroundTypeList
} from '@/api/api'
import { validateName } from '@/utils/validate'
import ProgressBar from '@/components/ProgressBar'
export default {
  components: {
    ProgressBar
  },
  data() {
    return {
      ruleForm: {
        id: '',
        name: '',
        img: '',
        file: '',
        fileWidth: '',
        fileHeight: '',
        templateTypeId: '',
        templateBackgroundId: ''
      },
      rules: {
        name: [{ required: true, validator: validateName }],
        img: [{ required: true, message: '请上传缩略图' }],
        file: [{ required: true, message: '请上传模板文件' }],
        templateTypeId: [{ required: true, message: '请选择分类' }],
        fileWidth: [{ required: true, message: '请填写尺寸' }],
        fileHeight: [{ required: true, message: '请填写尺寸' }]
      },
      currentIndex:0,
      dialogVisible: false,
      roleoptions: [],
      value: '',
      fileList: [],
      // 背景信息列表
      tableList: [],
      selectindex: -1,
      status: false,
      selectimg: '',
      singleimg: '',
      singleid: '',
      isselect: false, // 是否已经选中背景图
      listQuery: {pageNo:1,pageSize:10,type:''},
      backTypes:[]
    }
  },
  async created() {
    this.listapi = templatebackgroundList
    this.getDlabelSysRoleList()
    if (this.$route.query.id) {
      this.ruleForm.id = this.$route.query.id
      this.status = true
      this.templatesystemSelect()
    }
    const res = await templatebackgroundTypeList()
      if (res.code === 100) {
        res.data.unshift({
          id: '',
          name: '全部',
          type:''
        })
        this.backTypes = res.data
        this.templatebackgroundList()
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }

  },
  methods: {
    changeBackType(val,index) {
      this.listQuery.type = val
      this.currentIndex = index
      this.templatebackgroundList()
    },
    // 查询模板分类
    async getDlabelSysRoleList() {
      const res = await templatetypeAllList()
      if (res.code === 100) {
        this.roleoptions = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 查询系统模板信息
    async templatesystemSelect() {
      const res = await templatesystemSelect({
        id: this.$route.query.id
      })
      const response = await templatebackgroundTotal()
      if (res.code === 100) {
        this.ruleForm = {
          name: res.data.name,
          img: res.data.img,
          file: res.data.file,
          fileWidth: res.data.fileWidth,
          fileHeight: res.data.fileHeight,
          templateTypeId: res.data.templateTypeId,
          templateBackgroundId: res.data.templateBackgroundId
        }
        this.oldName = res.data.file
        this.isselect = true
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
      if (response.code === 100) {
        this.selectimg = this.ruleForm.templateBackgroundId
          ? response.data.filter(
            e => e.id === this.ruleForm.templateBackgroundId
          )[0].image
          : ''
        this.templatebackgroundList()
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 获取背景分页信息
    async templatebackgroundList() {
      const res = await templatebackgroundList(this.listQuery)
      if (res.code === 100) {
        this.tableList = res.data.list
        this.totalnumber = res.data.total
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 选择背景
    selectBack() {
      this.dialogVisible = true
    },
    // 选择单个背景色
    selectListBack(index, id, img) {
      this.selectindex = index
      this.singleid = id
      this.singleimg = img
      this.$refs.ruleForm.clearValidate(['templateBackgroundId'])
    },
    confirmBack() {
      if (this.tableList.length !== 0) {
        if (this.selectindex === -1) {
          this.$message({
            showClose: true,
            message: '请选择背景',
            type: 'error'
          })
        } else {
          this.ruleForm.templateBackgroundId = this.singleid
          this.selectimg = this.singleimg
          this.dialogVisible = false
          this.isselect = true
        }
      } else {
        this.dialogVisible = false
      }
    },
    async addTemplateList() {
      const $this = this
      this.ruleForm.id = this.$route.query.id ? this.$route.query.id : ''
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const url = this.$route.query.id ? templateUpdate : templateInsert
          const res = await url(this.ruleForm)
          if (res.code === 100) {
            this.$message({
              showClose: true,
              message: this.status ? '修改数据成功' : '新增数据成功',
              type: 'success'
            })
            $this.$router.push('/material/templateAdmin')
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
    changeType() {
      this.$refs.ruleForm.clearValidate(['templateTypeId'])
    },
    deleteBack() {
      this.ruleForm.templateBackgroundId = ''
      this.selectindex = -1
    },
    number(str) {
      this.ruleForm[str] = this.ruleForm[str].replace(/^(0+)|[^\d]+/g, '')
    },
    goback() {
      this.$router.back()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  background: #fff;
  padding: 40px 30px;
  /deep/ label {
    color: #666;
    font-size: 14px;
  }
}
.templateEdit {
  .el-upload {
    img {
      width: 146px;
      height: 146px;
    }
  }
  .uploadI {
    overflow: hidden;
    position: relative;
    padding-top: 50px;
    font-size: 24px;
  }
  .template-editor {
    input {
      width: 400px;
      height: 32px !important;
      line-height: 32px !important;
    }
  }
  .template-file {
    display: flex;
    align-items: center;
    button {
      width: 80px;
      height: 32px;
      line-height: 32px;
      background: #2274e5;
      padding: 0;
      margin-right: 16px;
      &:hover {
        background: #2274e5;
      }
    }
    p {
      color: #c3c3c3;
      font-size: 12px;
      margin: 0;
    }
  }
  .el-form-item__label {
    height: 32px;
  }
}
.backlist {
  /deep/ .el-dialog__body {
    padding: 0;
  }
  .backdrop {
    max-height: 526px;
    overflow-x: hidden;
    overflow-y: scroll;
    .type-box{
      display: flex;
      height:60px;
      margin-left:40px;
      white-space: nowrap;
      overflow-x: auto;
      .li-type{
        margin-right: 10px;
        max-width: 200px;
        line-height: 60px;
        cursor: pointer;
        &.active{
          color:#2274e5;
        }
      }
    }
    p {
      text-align: center;
      margin: 40px 0;
    }
    ul {
      padding: 10px 40px;
      margin: 0;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      overflow: hidden;
      li {
        display:flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        float: left;
        list-style: none;
        width: 160px;
        height: 160px;
        border-radius: 4px;
        margin-bottom: 24px;
        margin-right: 24px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 158px;
          height: 158px;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
        &.active {
          border: 2px solid #108ee9;
          // img {
          //   border: 1px solid rgba(16, 142, 233, 0.2);
          // }
        }
      }
    }
  }
}
.template-size {
  display: flex;
  width: 500px;
  align-items: center;
  /deep/ .el-input {
    width: 160px;
    height: 32px;
    input {
      width: 160px;
    }
  }
  span {
    width: 43px;
    text-align: center;
    font-size: 20px;
    height: 32px;
    line-height: 32px;
    color: #666;
  }
}
.backsubmit {
  text-align: right;
  padding: 32px 40px;
  span {
    display: inline-block;
    width: 80px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    color: #666666;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    &:last-child {
      margin-left: 18px;
      background: rgba(34, 116, 229, 1);
      box-shadow: 0px 10px 20px 0px rgba(0, 134, 255, 0.21);
      color: #fff;
      border: none;
    }
  }
}
.templateback {
  width: 160px;
  height: 160px;
  border: 1px dashed #999999;
  border-radius: 5px;
  .noback {
    display: flex;
    align-items: center;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    img {
      width: 50px;
    }
  }
  .selectback {
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width: 160px;
    height: 160px;
    img {
      max-width: 100%;
      max-height: 100%;
      position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    }
    .edit {
      position: absolute;
      top: 0;
      left: 0;
      width: 160px;
      height: 160px;
      background: rgba(0, 0, 0, 0.3);
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      z-index: 1;
      i {
        color: #fff;
        font-size: 30px;
      }
    }
    &:hover {
      .edit {
        opacity: 1;
      }
    }
  }
  .backspan {
    display: inline-block;
    width: 80px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: #fff;
    background: rgba(34, 116, 229, 1);
    border-radius: 4px;
    text-align: center;
    margin-top: 25px;
    cursor: pointer;
  }
}
.saveback {
  span {
    display: inline-block;
    width: 160px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    padding: 0;
    border: 1px solid #999999;
    cursor: pointer;
    &:first-child {
      border: none;
      background: #2274e5;
      box-shadow: 0px 10px 20px 0px rgba(0, 134, 255, 0.21);
      margin-right: 32px;
      color: #fff;
    }
  }
}
.pagination-container {
  margin: 17px 0 0 40px;
}
</style>
