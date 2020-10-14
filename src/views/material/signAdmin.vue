<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="build" @click="addparent">
        <span>
        <i class="el-icon-plus" /> </span
        >新增父类
      </div>
      <div class="search">
        <el-input
          v-model="keyWords"
          placeholder="搜索相关关键字"
          class="input-with-select"
          maxlength="20"
          @keyup.native.enter="getIconList"
        >
          <el-button slot="append" icon="el-icon-search" @click="getIconList" />
        </el-input>
      </div>
    </div>
    <div class="signadmin">
      <div class="signnav">
        <h3>标志类别({{ navList.size }})</h3>
        <ol class="signavlist">
          <li
            v-for="(element, index) in navList.list"
            :key="index"
            @click="selectParent(index)"
          >
            <div class="button">
              <em
                :class="
                  element.checked ? 'el-icon-arrow-down' : 'el-icon-arrow-right'
                "
              />
              {{ element.name }}（{{ element.size }}）
              <div class="edit">
                <i class="iconfont icontianjia" @click.stop="addNav(element)" />
                <i
                  class="iconfont iconbianji"
                  @click.stop="editParent(element)"
                />
                <i
                  class="iconfont iconshanchulanse"
                  @click.stop="deleteChild(element.id)"
                />
              </div>
            </div>
            <ul v-show="element.checked">
              <li
                v-for="(item, cindex) in element.child"
                :key="item.id"
                :class="index === pIndex && cindex === currentI ? 'active' : ''"
                @click.stop="showtable(item, index, cindex)"
              >
                {{ item.name }}（{{ item.size }}）
                <div class="edit">
                  <i
                    class="iconfont iconbianji"
                    @click.stop="editChild(item)"
                  />
                  <i
                    class="iconfont iconshanchulanse"
                    @click.stop="deleteChild(item.id)"
                  />
                </div>
              </li>
            </ul>
          </li>
        </ol>
      </div>
      <div class="signtable">
        <h3>{{ cType }}（{{ sizenum }}）</h3>
        <div class="signedit">
          <span @click="deleteAll">
            <i class="iconfont iconshanchulanse" />批量删除
          </span>
          <span v-show="openFlag" class="m_search" @click="newincreased">新增</span>
        </div>
        <el-table
          ref="singleTable"
          :data="tableData"
          tooltip-effect="dark"
          highlight-current-row
          style="width: 100%"
          class="table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="84" />
          <el-table-column type="index" label="序号" />
          <el-table-column property="iconPath" label="缩略图">
            <template slot-scope="{ row }">
              <div class="thumbnail">
                <img :src="row.iconPath" >
                <div class="edit">
                  <i
                    class="iconfont iconfangdachakan"
                    @click="enlargeImage(row.iconPath)"
                  />
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="name" label="图标名称" />
          <el-table-column property="updateTime" label="上传时间">
            <template slot-scope="{ row }">
              <span>{{ row.createTime | formatDate(row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{ row }">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="top"
              >
                <i class="iconfont iconbianji" @click="confirmEdit(row)" />
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="下载"
                placement="top"
              >
                <a
                  :href="row.iconPath"
                  class="iconfont iconxiazai"
                  target="_blank"
                />
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
                <i
                  class="iconfont iconshanchulanse"
                  @click="editDelete(row.id)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div v-if="totalnumber > 10" class="pagination-container">
          <el-pagination
            :current-page.sync="currentpage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            :total="totalnumber"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSize"
            @current-change="handleCurrent"
          />
        </div>
      </div>
    </div>
    <!-- 新增标志缩略图 -->
    <el-dialog
      :visible.sync="isalldialog"
      :close-on-click-modal="false"
      class="dialog multiplefiles"
      title="新增标志缩略图"
      width="797px"
    >
      <el-form
        ref="signForm"
        :model="signForm"
        :rules="signrules"
        class="demo-ruleForm"
      >
        <p>
          <span>所属类别：{{ fType }}——{{ cType }}</span
          >(一次最多添加50张图标，仅支持jpg、png、svg格式，单个标志最大200k）
        </p>
        <p class="warning"><em>*</em>标志名称可保存后单独修改</p>
        <el-form-item
          ref="auditOpinion"
          prop="auditOpinion"
          class="auditOpinion"
        >
          <div class="multiple">
            <input
              type="file"
              multiple="multiple"
              accept=".jpg, .svg, .png"
              title
              @change="uploadfile($event)"
            >
            <span>上传文件</span>
          </div>
          <ul>
            <li v-for="(item, index) in fileList" :key="index">
              <img :src="item.iconPath" >
              <div class="uploadfile">
                <i
                  class="iconfont iconshanchulanse"
                  @click="deleteUploadItemImg(index)"
                />
              </div>
              <input
                :value="item.name"
                placeholder="上传文件"
                type="text"
                @input="changeName($event, index)"
              >
              <!-- <p>命名不合乎规范</p> -->
            </li>
          </ul>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="isalldialog = fasle">取消</el-button>
          <el-button type="primary" @click="addsubData">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增标志分类 -->
    <el-dialog
      :visible.sync="visibile"
      :title="title"
      :close-on-click-modal="false"
      class="dialog classifydialog"
      width="500px"
    >
      <el-form
        ref="ruleClassifyForm"
        :model="ruleClassifyForm"
        :rules="classifyrules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="subtitle" prop="name" style="width:400px;">
          <el-input
            v-model="ruleClassifyForm.name"
            placeholder="限制10个字符"
            maxlength="10"
          />
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="visibile = false">取消</el-button>
          <el-button type="primary" @click="classifySubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑标志分类 -->
    <el-dialog
      :visible.sync="isdialog"
      :close-on-click-modal="false"
      title="编辑"
      class="dialog"
      width="500px"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标志名称：" prop="name" class="version">
          <el-input
            v-model="ruleForm.name"
            :rules="rules"
            type="text"
            placeholder="仅支持中英文、数字和下划线，不包含特殊字符"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="标志图：" class="backupload" prop="iconPath">
          <div class="file">
            <div v-if="ruleForm.iconPath === ''" class="upfile">
              <input
                type="file"
                accept=".png, .jpg, .svg"
                @change="uploadChange($event, 5, 'iconPath')"
              >
              <i class="iconfont icontianjiatupian" />
              <p>文件格式jpg、png，</p>
              <p>文件大小200K</p>
            </div>
            <div v-else class="fileimg">
              <div class="fileimg-delete">
                <i
                  class="iconfont iconshanchulanse"
                  @click="deleteUpload('iconPath')"
                />
              </div>
              <img :src="ruleForm.iconPath" >
            </div>
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="isdialog = false">取消</el-button>
          <el-button type="primary" @click="addData">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 放大图片 -->
    <el-dialog
      :visible.sync="isEnlarge"
      :show-close="false"
      :width="widthauto"
      title
      class="imgdialog"
    >
      <img :src="imgPath" class="magnifier" @load="onLoad" >
    </el-dialog>
  </div>
</template>

<script>
import {
  iconList,
  iconDelete,
  iconDeletes,
  iconInserts,
  iconUpdate,
  uploadPics,
  icontypeList,
  icontypeInsert,
  icontypeDelete,
  icontypeUpdate
} from '@/api/api'
import qs from 'qs'
import moment from 'moment'
// import { validateName } from '@/utils/validate'
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      tableData: [],
      // 删除id集合
      multipleSelection: [],
      fType: '',
      cType: '',
      subtitle: '',
      title: '',
      pIndex: 0,
      currentI: 0,
      signForm: {
        name: '',
        fontsCategory: 1,
        imgPath: '',
        fontsPath: ''
      },
      signrules: {
        name: [{ required: true, message: '请输入版本号' }],
        imgPath: [
          { required: true, message: '请上传缩略图', trigger: 'change' }
        ],
        fontsPath: [
          { required: true, message: '请上传字体', trigger: 'change' }
        ]
      },
      rules: {
        name: [{ required: true, message: '请输入文件名' }],
        iconPath: [
          { required: true, message: '请上传缩略图', trigger: 'change' }
        ]
      },
      ruleForm: {
        id: '',
        name: '',
        iconPath: ''
      },
      ruleClassifyForm: {
        name: '',
        parentId: ''
      },
      classifyrules: {
        name: [{ required: true, message: '文件名不能为空', trigger: 'blur' }]
      },
      // 多文件上传文件列表
      fileList: [],
      navList: [],
      // 标志分类字段
      name: '',
      // 选择的id
      selectid: '',
      visibile: false,
      // 是否是编辑
      hasedit: false,
      // 选择的二级分类id
      subid: '',
      // 是否有新增
      openFlag: true,
      editVisible: false,
      currentindex: -1,
      isalldialog: false,
      keyWords: '',
      // 是否点击子类编辑
      ischild: false,
      sizenum: 0,
      islimit: false
    }
  },
  computed: {},
  async created() {
    await this.geticontypeList()
    this.getIconList()
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      const newval = val.map(element => ({
        id: element.id
      }))
      const newarr = []
      for (var i = 0; i < newval.length; i++) {
        newarr.push(newval[i].id)
      }
      this.multipleSelection = newarr
    },
    // 批量上传
    async uploadfile(event) {
      const file = [...event.target.files]
      let limitlength
      const stilllength = 50 - this.fileList.length
      if (this.fileList.length === 0) {
        limitlength = file.length
        this.islimit = false
      } else {
        limitlength = this.fileList.length + file.length
        this.islimit = true
      }
      if (limitlength > 50) {
        this.$message({
          showClose: true,
          message: this.islimit
            ? `最多添加50张图标，还能上传${stilllength}张图标`
            : `最多添加50张图标`,
          type: 'error'
        })
      } else {
        const form = new FormData()
        file.forEach(value => {
          form.append('fileData', value)
          form.append('type', '11')
        })
        try {
          const res = await uploadPics(form)
          const arr = res.data.map(element => ({
            name: element.oldName,
            iconPath: element.sourceUrl,
            iconType: this.subid
          }))
          this.fileList = [...this.fileList, ...arr]
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          })
          event.target.value = ''
        } catch (e) {
          event.target.value = ''
        }
      }
    },
    addData() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          await iconUpdate(this.ruleForm)
          this.currentpage = 1
          this.getIconList()
          this.isdialog = false
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
        } else {
          return false
        }
      })
    },
    // 获取系统标志列表信息
    async geticontypeList() {
      const res = await icontypeList()
      const arr = res.data
      if (res.data.list.length !== 0) {
        const index = arr.list.findIndex(e => e.child.length !== 0)
        if (index !== -1) {
          arr.list.forEach((value, key, newarr) => {
            this.$set(value, 'checked', false)
            this.$set(newarr[this.pIndex || index], 'checked', true)
          })
          this.openFlag = true
          // this.pIndex = index
          this.subid = arr.list[this.pIndex || index].child[this.currentI].id
          this.fType = arr.list[this.pIndex || index].name
          this.cType = arr.list[this.pIndex || index].child[this.currentI].name
          this.sizenum = arr.list[this.pIndex || index].child[this.currentI].size
        } else {
          this.cType = ''
          this.sizenum = 0
          this.openFlag = false
        }
      } else {
        this.cType = ''
        this.sizenum = 0
        this.openFlag = false
      }
      this.navList = arr
    },
    // 增加标志
    addNav(element) {
      this.title = '新增子类'
      this.subtitle = '子类名称'
      this.visibile = true
      this.selectid = element.id
      this.name = element.name
      this.ruleClassifyForm.parentId = element.id
      this.hasedit = false
      this.$nextTick(() => {
        this.$refs.ruleClassifyForm.resetFields()
      })
    },
    // 新增标志分类信息
    async addicontypeInfo() {
      const res = await icontypeInsert({
        name: this.name,
        parentId: this.selectid
      })
      if (res.code === 100) {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 删除二级分类
    deleteChild(id) {
      this.$confirm('删除后将无法恢复，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: async(action, instance, done) => {
          if (action === 'confirm') {
            this.pIndex = 0
            this.currentI = 0
            const res = await icontypeDelete({
              id
            })
            if (res) {
              await this.geticontypeList()
              this.getIconList()
            }
            done()
          } else {
            done()
          }
        }
      }).then(() => {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      })
    },
    // 确认新增修改
    classifySubmit() {
      this.$refs['ruleClassifyForm'].validate(async valid => {
        if (valid) {
          const apiurl = this.hasedit ? icontypeUpdate : icontypeInsert
          const res = await apiurl(this.ruleClassifyForm)
          if (res) {
            this.visibile = false
            this.$message({
              showClose: true,
              message: !this.hasedit ? '添加成功' : '编辑成功',
              type: 'success'
            })
            await this.geticontypeList()
            this.getIconList()
          }
        } else {
          return false
        }
      })
    },
    deleteUploadItemImg(index) {
      this.fileList.splice(index, 1)
    },
    // 新增父类
    addparent() {
      this.visibile = true
      this.hasedit = false
      this.$nextTick(() => {
        this.$refs.ruleClassifyForm.resetFields()
        this.title = '新增父类'
        this.subtitle = '父类名称'
        this.ruleClassifyForm.name = ''
        this.ruleClassifyForm.parentId = ''
      })
    },
    // 编辑父类
    editParent(element) {
      this.visibile = true
      this.hasedit = true
      this.$nextTick(() => {
        this.$refs.ruleClassifyForm.resetFields()
        this.title = '编辑父类'
        this.subtitle = '父类名称'
        this.ruleClassifyForm.name = element.name
        this.ruleClassifyForm.id = element.id
        this.ruleClassifyForm.parentId = ''
      })
    },
    // 编辑子类
    editChild(element) {
      this.visibile = true
      this.hasedit = true
      this.$nextTick(() => {
        this.$refs.ruleClassifyForm.resetFields()
        this.title = '编辑子类'
        this.subtitle = '子类名称'
        this.ruleClassifyForm.name = element.name
        this.ruleClassifyForm.id = element.id
        this.ruleClassifyForm.parentId = element.parentId
      })
    },
    // 编辑分类接口
    async icontypeUpdate(element) {
      const res = await icontypeUpdate({
        id: element.id,
        name: element.name,
        parentId: element.parentId
      })
      if (res) {
        this.$message({
          showClose: true,
          message: status === 0 ? '添加成功' : '编辑成功',
          type: 'success'
        })
      }
    },
    // 表格展示
    async showtable(item, pindex, cindex) {
      this.currentpage = 1
      this.fType = this.navList.list[pindex].name
      this.cType = this.navList.list[pindex].child[cindex].name
      this.pIndex = pindex
      this.currentI = cindex
      this.subid = item.id
      this.sizenum = item.size
      this.getIconList()
    },
    async editDelete(id) {
      this.$confirm('删除后将无法恢复，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await iconDelete({ id })
        if (res.code === 100) {
          const totalpage = Math.ceil((this.totalnumber - 1) / this.pagesize)
          const currentpage =
            this.currentpage > totalpage ? totalpage : this.currentpage
          this.currentpage = currentpage < 1 ? 1 : currentpage
          this.geticontypeList(1)
          this.getIconList()
          this.$message({
            showClose: true,
            message: '删除成功',
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
    async getIconList() {
      const res = await iconList({
        pageNo: this.currentpage,
        pageSize: this.pagesize,
        iconType: this.subid,
        keyWords: this.keyWords
      })
      this.tableData = res.data.list
      this.totalnumber = res.data.total
    },
    // 批量新增标志分类
    newincreased() {
      this.fileList = []
      this.isalldialog = true
    },
    // 改变名称
    changeName(e, index) {
      this.fileList[index].name = e.target.value
    },
    // 新增二级分类上传文件
    async addsubData() {
      // console.log('3333', this.fileList)
      // const regName = /[^\s\\/:\*\?\"<>\|](\x20|[^\s\\/:\*\?\"<>\|])*[^\s\\/:\*\?\"<>\|\.]{1,50}$/
      // this.fileList.forEach(e => e.name)
      if (this.fileList.length === 0) {
        this.$message({
          showClose: true,
          message: '请上传文件',
          type: 'error'
        })
      } else {
        const res = await iconInserts(
          qs.stringify({ json: JSON.stringify(this.fileList) })
        )
        if (res.code === 100) {
          this.getIconList()
          this.geticontypeList(1)
          this.isdialog = false
          this.isalldialog = false
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
      }
    },
    confirmEdit(row) {
      this.ruleForm.name = row.name
      this.ruleForm.id = row.id
      this.ruleForm.iconPath = row.iconPath
      this.ruleForm.iconType = this.subid
      this.isdialog = true
      this.isedit = true
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
    },
    // 批量删除
    async deleteAll() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '请勾选需要删除数据',
          type: 'error'
        })
      } else {
        this.$confirm('删除后将无法恢复，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await iconDeletes({
            ids: this.multipleSelection.join(',')
          })
          if (res.code === 100) {
            this.geticontypeList(1)
            const totalpage = Math.ceil(
              (this.totalnumber - this.multipleSelection.length) / this.pagesize
            )
            const currentpage =
              this.currentpage > totalpage ? totalpage : this.currentpage
            this.currentpage = currentpage < 1 ? 1 : currentpage
            this.getIconList()
            this.$message({
              showClose: true,
              message: '删除成功',
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
      }
    },
    // pageSize 改变时会触发
    handleSize(val) {
      this.pagesize = val
      this.getIconList()
      window.scrollTo(0, 0)
    },
    // currentPage 改变时会触发
    handleCurrent(val) {
      this.currentpage = val
      this.getIconList()
      window.scrollTo(0, 0)
    },
    selectParent(index) {
      this.navList.list[index].checked = !this.navList.list[index].checked
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.signadmin {
  width: 100%;
  display: flex;
  .signnav {
    min-width: 360px;
    background: #fff;
    margin-right: 30px;
    padding: 0 16px;
    box-sizing: border-box;
    h3 {
      color: #333333;
      font-size: 16px;
      padding: 17px 0;
      border-bottom: 1px solid #e5e5e5;
      margin: 0;
      font-weight: normal;
    }
    .signavlist {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        font-size: 14px;
        .button {
          position: relative;
          height: 36px;
          line-height: 36px;
          border-radius: 4px;
          em {
            margin: 0 14px;
            color: #2274e5;
          }
          &:hover {
            background: #f5f5f5;
          }
        }
        ul {
          margin: 0;
          padding: 0;
          li {
            position: relative;
            color: #666666;
            height: 36px;
            line-height: 36px;
            padding-left: 64px;
            // &:hover {
            //   background: #f5f5f5;
            //   color: #2274e5;
            // }
            &.active {
              background: #f5f5f5;
              color: #2274e5;
            }
          }
        }
      }
      .edit {
        display: flex;
        justify-content: flex-end;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        i {
          margin-right: 26px;
          color: #2274e5;
          font-size: 16px;
          cursor: pointer;
          &:last-child {
            margin-right: 8px;
          }
        }
        &:hover {
          opacity: 1;
        }
      }
    }
    .editinput {
      height: 36px;
      background: #f5f5f5;
      border: none;
      outline: none;
      padding-left: 10px;
      width: 100%;
      margin-top: 20px;
      font-size: 14px;
      border-radius: 4px;
    }
  }
  .signtable {
    flex: 1;
    overflow: hidden;
    background: #fff;
    h3 {
      color: #333333;
      font-size: 16px;
      font-weight: normal;
      text-indent: 11px;
      padding: 16px 0;
      margin: 0 24px;
      border-bottom: 1px solid #e5e5e5;
    }
    .signedit {
      background: #fff;
      display: flex;
      justify-content: space-between;
      height: 70px;
      align-items: center;
      span {
        &:first-child {
          color: #666666;
          font-size: 14px;
          margin-left: 35px;
          cursor: pointer;
          i {
            margin-right: 20px;
            color: #2274e5;
          }
        }
        &:last-child {
          display: inline-block;
          width: 80px;
          height: 36px;
          line-height: 36px;
          background: rgba(34, 116, 229, 1);
          border-radius: 4px;
          text-align: center;
          font-size: 14px;
          color: #fff;
          margin-right: 24px;
        }
      }
    }
    /deep/ .el-table__header-wrapper {
      th {
        background: #f2faff;
      }
    }
  }
}
.multiplefiles {
  /deep/ .el-form-item__content {
    display: block !important;
  }
  /deep/ .el-dialog__body {
    padding: 15px 40px 32px 40px !important;
  }
  .submit {
    margin-top: 16px;
  }
  .file {
    width: 100%;
    overflow: hidden;
  }
  p {
    margin: 0;
    font-size: 14px;
    line-height: 24px;
    color: #2274e5;
    span {
      color: #3c3c3c;
      margin-right: 16px;
    }
  }
  .warning {
    display: flex;
    align-items: center;
    color: #999999;
    em {
      color: #ff0000;
      margin-right: 5px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    li {
      position: relative;
      float: left;
      list-style: none;
      margin-right: 24px;
      margin-bottom: 32px;
      &:nth-child(4n) {
        margin-right: 0;
      }
      img {
        display: block;
        width: 160px;
        height: 160px;
        border: 1px solid #c3c3c3;
        margin-bottom: 8px;
      }
      input {
        width: 160px;
        height: 32px;
        line-height: 32px;
        font-size: 12px;
        text-align: center;
        border: 1px solid #c3c3c3;
        outline: none;
        resize: none;
      }
      .uploadfile {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 40px;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        &:hover {
          opacity: 1;
        }
        i {
          margin-bottom: 0;
          color: #fff;
          font-size: 30px;
        }
      }
    }
  }
  .multiple {
    position: relative;
    margin: 20px 0;
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 80px;
      height: 32px;
      z-index: 9;
      opacity: 0;
    }
    span {
      display: inline-block;
      width: 80px;
      height: 32px;
      background: #2274e5;
      border-radius: 4px;
      color: #ffffff;
      font-size: 12px;
      text-align: center;
    }
  }
}
.thumbnail {
  width: 50px;
  height: 50px;
  img {
    max-width: 50px;
    max-height: 50px;
  }
  .edit {
    width: 50px;
    height: 50px;
  }
}
</style>
