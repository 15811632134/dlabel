<template>
  <div class="app-container">
    <div
      v-if="permissionData.indexOf('app_version_manage_add_executable')!=-1"
      class="filter-container"
    >
      <div class="build" @click="openAdd">
        <span>
          <i class="el-icon-plus" />
        </span>新增
      </div>
    </div>
    <div class="versionBox">
      <div class="signnav">
        <h3>版本管理</h3>
        <ol class="signavlist">
          <li>
            <div class="button" @click="addOpenArr(0)">
              <span>
                <em
                  :class="openArr.indexOf(0)!=-1?'iconRectangleCopybeifen1':'iconRectangleCopybeifen'"
                  class="iconfont"
                />
              </span>
              Android({{ navList.Android&&navList.Android.length }})
            </div>
            <ul v-if="openArr.indexOf(0)!=-1">
              <li
                v-for="(item,index) in navList.Android"
                :class="pIndex==0&&cIndex==index?'active':''"
                :key="item.id"
                v-show="index<10"
                @click.stop="showtable(item,0,index)"
              >
                {{ item.version }}
                <div class="edit">
                  <i
                    v-if="permissionData.indexOf('app_version_manage_edit_executable')!=-1"
                    class="iconfont iconbianji"
                    @click="editChild(item)"
                  />
                  <i
                    v-if="permissionData.indexOf('app_version_manage_delete_executable')!=-1"
                    class="iconfont iconshanchulanse"
                    @click="deleteChild(item.id)"
                  />
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div class="button" @click="addOpenArr(1)">
              <span>
                <em
                  :class="openArr.indexOf(1)!=-1?'iconRectangleCopybeifen1':'iconRectangleCopybeifen'"
                  class="iconfont"
                />
              </span>
              iOS({{ navList.iOS&&navList.iOS.length }})
            </div>
            <ul v-if="openArr.indexOf(1)!=-1">
              <li
                v-for="(item,index) in navList.iOS"
                :class="pIndex==1&&cIndex==index?'active':''"
                :key="item.id"
                @click.stop="showtable(item,1,index)"
                v-show="index<10"
              >
                {{ item.version }}
                <div class="edit">
                  <i
                    v-if="permissionData.indexOf('app_version_manage_edit_executable')!=-1"
                    class="iconfont iconbianji"
                    @click="editChild(item)"
                  />
                  <i
                    v-if="permissionData.indexOf('app_version_manage_delete_executable')!=-1"
                    class="iconfont iconshanchulanse"
                    @click="deleteChild(item.id)"
                  />
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div class="button" @click="addOpenArr(2)">
              <span>
                <em
                  :class="openArr.indexOf(2)!=-1?'iconRectangleCopybeifen1':'iconRectangleCopybeifen'"
                  class="iconfont"
                />
              </span>
              PC({{ navList.PC&&navList.PC.length }})
            </div>
            <ul v-if="openArr.indexOf(2)!=-1">
              <li
                v-for="(item,index) in navList.PC"
                :class="pIndex==2&&cIndex==index?'active':''"
                :key="item.id"
                v-show="index<10"
                @click.stop="showtable(item,2,index)"
              >
                {{ item.version }}
                <div class="edit">
                  <i
                    v-if="permissionData.indexOf('app_version_manage_edit_executable')!=-1"
                    class="iconfont iconbianji"
                    @click="editChild(item)"
                  />
                  <i
                    v-if="permissionData.indexOf('app_version_manage_delete_executable')!=-1"
                    class="iconfont iconshanchulanse"
                    @click="deleteChild(item.id)"
                  />
                </div>
              </li>
            </ul>
          </li>
        </ol>
      </div>
      <div v-if="!showOpen&&dataInfo.version" class="signtable">
        <div class="header_title">查看</div>
        <div class="header">
          <div >版本号：</div>
          <div>{{ dataInfo.version }}</div>
        </div>
        <div class="header">
          <div >更新平台：</div>
          <div>{{ dataInfo.equip==1?'安卓端':dataInfo.equip==2?'IOS端':'PC端' }}</div>
        </div>
        <div class="header">
          <div >更新方式：</div>
          <div>{{ points[parseInt(dataInfo.updateType)-1] }}</div>
        </div>
        <div class="header">
          <div >用户选择：</div>
          <div>{{ getCompany(dataInfo.userChoose) }}</div>
        </div>
        <div class="header">
          <div >更新说明：</div>
          <!-- <div contenteditable="true">{{dataInfo.description}}</div> -->
          <textarea
            :rows="getRows()"
            v-model="dataInfo.description"
            disabled
            autoHeight="true"
            readonly="readonly"
          />
        </div>
        <div class="header">
          <div >更新时间：</div>
          <div>{{ dataInfo.timing|formatDate('') }}</div>
        </div>
      </div>
      <div v-else-if="showOpen" class="signtableAdd">
        <div class="header">{{ isEdit?'编辑':'添加' }}</div>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="template-editor"
        >
          <el-form-item label="版本号：" prop="version">
            <el-input v-model="ruleForm.version" style="width:485px" placeholder maxlength="50" />
          </el-form-item>

          <el-form-item label="更新平台：" prop="templateTypeId">
            <el-select v-model="ruleForm.equip" filterable placeholder="请选择" style="width:485px">
              <el-option
                v-for="item in partnerList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="更新方式：" prop="templateTypeId">
            <el-select
              v-model="ruleForm.updateType"
              filterable
              placeholder="请选择"
              style="width:485px"
            >
              <el-option
                v-for="(item,index) in points"
                :key="index+1"
                :label="item"
                :value="index+1"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用户选择：" prop="templateTypeId">
            <el-select
              v-model="ruleForm.userChoose"
              filterable
              placeholder="请选择"
              style="width:485px"
            >
              <el-option
                v-for="item in companys"
                :key="item.id"
                :label="item.shortName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-show="ruleForm.equip!=2"
            label="版本文件："
            prop="filePath"
            class="fileprogress"
          >
            <div class="ttffile">
              <input
                :accept="ruleForm.equip==1?'.apk':ruleForm.equip==3?'.exe':''"
                type="file"
                @change="uploadChange($event,14, 'filePath', true)"
              >
              <span>选择文件</span>
              <p>仅支持{{ ruleForm.equip==1?'.apk':'.exe' }}格式，文件大小100MB</p>
            </div>
            <div v-if="ruleForm.filePath && !ispercent" class="progress">
              <span>{{ oldName }}</span>
              <i class="iconfont iconshanchuhuise" @click="deleteUpload('filePath')" />
            </div>
            <ProgressBar v-if="ruleForm.filePath === '' && ispercent" />
          </el-form-item>
          <!-- <el-form-item
            label="版本文件："
            v-show="ruleForm.equip!=2"
            prop="filePath"
            class="fileprogress"
          >
            <div class="ttffile">
              <input
                type="file"
                :accept="ruleForm.equip==1?'.apk':ruleForm.equip==3?'.exe':''"
                @change="uploadChange($event,14, 'filePath', 2048)"
              />
              <span>选择文件</span>
              <p>仅支持{{ruleForm.equip==1?'.apk':'.exe' }}格式，文件大小100MB</p>
            </div>
            <div v-if="ruleForm.filePath" class="progress">
              <span v-if="percent===0">{{ ruleForm.filePath }}</span>
              <el-progress
                v-if="percent!==0"
                :percentage="percent"
                :show-text="false"
                :stroke-width="4"
                color="#2274E5"
              />
              <i class="iconfont iconshanchuhuise" @click="deleteUpload('filePath')" />
            </div>
          </el-form-item>-->
          <el-form-item label="更新说明：" prop="description" class="fileprogress">
            <div class="textareaUrl">
              <el-input
                v-model="ruleForm.description"
                maxlength="150"
                rows="6"
                type="textarea"
                class="updateTextArea"
                style="width:485px"
                placeholder="请输入更新说明"
              />
            </div>
          </el-form-item>
          <el-form-item label="更新时间：" prop="timing" class="fileprogress">
            <div class="echarts-time">
              <div class="echarts-date">
                <el-date-picker
                  v-model="ruleForm.timing"
                  :picker-options="pickerOptions"
                  type="datetime"
                  style="width:485px"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期时间"
                />
                <em class="iconfont iconrilix" />
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="saveback">
              <span @click="isEdit?updateVersion():saveVersion()">保存</span>
              <span @click="showOpen=false">取消</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 放大图片 -->
    <el-dialog :visible.sync="isEnlarge" :show-close="false" title class="imgdialog">
      <img :src="imgPath" class="magnifier" >
    </el-dialog>
  </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar'
import { mapGetters } from 'vuex'
import {
  version_list,
  iconUpdate,
  uploadPics,
  icontypeInsert,
  versionSave,
  icontypeUpdate,
  open_company_list,
  versionDelete
} from '@/api/api'
import qs from 'qs'
import moment from 'moment'
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      if (!time) { return }
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  components: {
    ProgressBar
  },
  data() {
    return {
      tableData: [],
      // 删除id集合
      multipleSelection: [],
      fType: '',
      cType: '',
      subtitle: '',
      openArr: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
        }
      },
      isEdit: false,
      dataInfo: {},
      title: '',
      pIndex: 0,
      cIndex: -1,
      deviceArr: ['PC端', 'IOS端', '安卓端', '其他'],
      points: ['每次提醒', '每日提醒', '强制更新', '提醒一次'],
      currentI: 0,
      signForm: {
        name: '',
        fontsCategory: 1,
        imgPath:
          'https://dudian-oss-test.oss-cn-shenzhen.aliyuncs.com/dlabel/1/printer/2bf62294-a8fe-4c8a-b6f8-47c64bced967.png',
        fontsPath:
          'https://dudian-oss-test.oss-cn-shenzhen.aliyuncs.com/dlabel/1/fonts/1c6f629b-4f28-4d4f-a72e-87b423186beb.ttf'
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
        timing: [
          { required: true, message: '请选择触发时间', trigger: 'blur' },
          { required: true, message: '请选择触发时间', trigger: 'change' }
        ],
        version: [{ required: true, message: '请输入版本号', trigger: 'blur' }],
        description: [
          { required: true, message: '请输入版本描述', trigger: 'blur' }
        ],

        // description: [{ required: true, message: "请输入版本号" }],
        iconPath: [
          { required: true, message: '请上传缩略图', trigger: 'change' }
        ]
      },
      ruleForm: {
        description: '',
        version: '',
        filePath: '',
        equip: 1,
        updateType: 1,
        timing: '',
        userChoose: ''
      },
      ruleClassifyForm: {
        name: '',
        parentId: ''
      },
      classifyrules: {
        name: [{ required: true, message: '限制10个字符', trigger: 'blur' }]
      },
      // 多文件上传文件列表
      fileList: [],
      navList: [],
      // 标志分类字段
      name: '',
      // 选择的id
      selectid: '',

      visibile: false,
      showOpen: false,
      // 是否是编辑
      hasedit: false,
      // 选择的二级分类id
      subid: '',
      editVisible: false,
      currentindex: -1,
      isalldialog: false,
      companys: []
    }
  },
  computed: {
    ...mapGetters(['permissionData']),
    partnerList() {
      return [
        { id: 1, name: 'Android端' },
        { id: 2, name: 'IOS端' },
        { id: 3, name: 'PC端' }
      ]
    },
    getCompany() {
      return function(comId) {
        console.log(comId)
        for (var i = 0; i < this.companys.length; i++) {
          if (this.companys[i].id == comId) {
            return this.companys[i].shortName
          }
        }
        return '未知'
      }
    }
  },
  async created() {
    this.getList()
  },
  methods: {
    getRows() {
      if (
        this.dataInfo.description &&
        this.dataInfo.description.split('\n')[0].length > 100
      ) {
        return this.dataInfo.description.split('\n')[0].length / 35 + 1
      }
      return (
        this.dataInfo.description &&
        this.dataInfo.description.split('\n').length + 3
      )
    },
    openAdd() {
      this.showOpen = true
      this.resetF()
      this.isEdit = false
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    getList() {
      this.resetF()
      open_company_list().then(respone => {
        this.companys = respone.data
        this.companys.splice(0, 0, { id: 0, shortName: '全部' })
        version_list().then(res => {
          this.navList = res.data
          if(res.data.Android.length>0)
          this.showtable(res.data.Android[0],0,0)
          this.addOpenArr(0)

          // showtable(this.navList,0,index)
        })
      })
    },
    resetF() {
      this.ruleForm = {
        description: '',
        version: '',
        filePath: '',
        equip: 1,
        updateType: 1,
        timing: '',
        userChoose:
          this.companys && this.companys.length > 0 ? this.companys[0].id : ''
      }
    },

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
    async uploadfile() {
      const file = [...event.target.files]
      const form = new FormData()
      file.forEach(value => {
        form.append('fileData', value)
        form.append('type', '11')
      })
      const res = await uploadPics(form)
      if (res.code === 100) {
        this.fileList = res.data.map(element => ({
          name: element.oldName,
          iconPath: element.sourceUrl,
          iconType: this.subid
        }))
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    async addData() {
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          this.ruleClassifyForm.framePath = this.title = '添加'
          this.isedit = true
          await this.addListData(
            'ruleForm',
            iconUpdate,
            iconUpdate,
            this.isedit,
            version_list,
            'icon'
          )
        }
      })
    },
    // 获取系统标志列表信息

    // 增加标志
    addNav(element) {
      this.title = '新增子类'
      this.subtitle = '子类名称'
      this.visibile = true
      this.selectid = element.id
      this.name = element.name
      this.ruleClassifyForm.parentId = element.id
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
          message: '添加数据成功',
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
    async(id) {
      versionDelete({ id: id }).then
    },
    deleteChild(id, val) {
      const h = this.$createElement
      this.$msgbox({
        title: '消息',
        message: h('p', null, [h('span', null, '您确定要删除该数据吗！')]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'

            versionDelete({ id: id })
              .then(res => {
                done()
                if (id == this.ruleForm.id) {
                  this.resetF()
                  this.showOpen = false
                }
                this.getList()
                this.$message.success('删除成功')
                instance.confirmButtonLoading = false
              })
              .catch(error => {
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
    },
    deleteUploadItemImg(index) {
      this.fileList.splice(index, 1)
    },
    saveVersion() {
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          var temp = {
            description: this.ruleForm.description,
            version: this.ruleForm.version,
            filePath: this.ruleForm.filePath,
            equip: this.ruleForm.equip,
            updateType: this.ruleForm.updateType,
            timing: this.ruleForm.timing,
            userChoose: this.ruleForm.userChoose
          }
          if (this.ruleForm.equip == 2) {
            temp.filePath = ''
          } else {
            temp.filePath = this.ruleForm.filePath
          }
          versionSave(temp).then(res => {
            if (res.code == 100) {
              this.getList()
              this.showOpen = false
              this.$message.success('新增成功')
            }
          })
        }
      })
    },
    updateVersion() {
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          var temp = {
            description: this.ruleForm.description,
            version: this.ruleForm.version,
            filePath: this.ruleForm.filePath,
            equip: this.ruleForm.equip,
            updateType: this.ruleForm.updateType,
            timing: this.ruleForm.timing,
            userChoose: this.ruleForm.userChoose,
            id: this.ruleForm.id
          }
          if (this.ruleForm.equip == 2) {
            temp.filePath = ''
          } else {
            temp.filePath = this.ruleForm.filePath
            if (!temp.filePath) {
              this.$message.error('版本文件不能为空')
              return
            } else {
            }
          }
          versionSave(temp).then(res => {
            if (res.code == 100) {
              this.getList()
              this.isEdit = false
              this.showOpen = false
              this.$message.success('修改成功')
            }
          })
        }
      })
    },
    // 新增父类
    addparent() {
      this.visibile = true
      this.title = '新增父类'
      this.subtitle = '父类名称'
      this.ruleClassifyForm.name = ''
    },
    // 编辑父类
    editParent(element) {
      this.visibile = true
      this.hasedit = true
      this.title = '编辑父类'
      this.subtitle = '父类名称'
      this.ruleClassifyForm.name = element.name
      this.ruleClassifyForm.id = element.id
      // this.icontypeUpdate(element)
    },
    // 编辑子类
    editChild(element) {
      console.log(element)
      this.showOpen = true
      this.isEdit = true
      this.percent = 0
      element.timing = moment(element.timing).format('YYYY-MM-DD HH:mm:ss')
      this.ruleForm = element
      this.oldName = element.filePath
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
      // this.icontypeUpdate(element)
    },
    // 编辑分类接口
    async icontypeUpdate(element) {
      const res = await icontypeUpdate({
        id: element.id,
        name: element.name,
        parentId: element.parentId
      })
      if (res.code === 100) {
        this.$message({
          showClose: true,
          message: status === 0 ? '添加数据成功' : '修改数据成功',
          type: 'success'
        })
      }
    },
    addOpenArr(pindex) {
      if (this.openArr.indexOf(pindex) === -1) {
        this.openArr.push(pindex)
      } else {
        this.openArr.splice(this.openArr.indexOf(pindex), 1)
      }
      console.log(this.openArr)
    },
    // 表格展示
    async showtable(item, pindex, cindex) {
      this.pIndex = pindex
      this.cIndex = cindex
      this.dataInfo = item
      this.ruleForm = item
      // this.fType = this.navList.list[pindex].name
      // this.cType = this.navList.list[pindex].child[cindex].name
      // this.pIndex = pindex
      // this.currentI = cindex
      // this.subid = item.id
      // this.getIconList()
    },
    async getIconList(pageNo, pageSize = 10) {
      const res = await version_list({
        pageNo: this.currentpage,
        pageSize: pageSize,
        equip: 1
      })
      if (res.code === 100) {
        this.tableData = res.data.list
        this.totalnumber = res.data.total
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 批量新增标志分类
    newincreased() {
      this.isalldialog = true
    },
    // 改变名称
    changeName(e, index) {
      this.fileList[index].name = e.target.value
    },
    childEdit(row) {
      this.isdialog = true
      this.ruleForm.name = row.name
      this.ruleForm.id = row.id
      this.ruleForm.framePath = row.iconPath
      this.ruleForm.iconType = this.subid
      this.ruleClassifyForm.image = row.iconPath
      this.sourceUrl = row.iconPath
    },
    // pageSize 改变时会触发
    handleSize(val) {
      this.getIconList(this.currentpage, val)
    },
    // currentPage 改变时会触发
    handleCurrent(val) {
      this.currentpage = val
      this.getIconList(val, 10)
    },
    selectParent(index) {
      this.navList.list[index].checked = !this.navList.list[index].checked
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.versionBox {
  width: 100%;
  display: flex;

  .echarts-time {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0px;
    ul {
      border-radius: 4px;
      border: 1px solid #c3c3c3;
      margin: 0 32px 0 0;
      padding: 0;
      height: 40px;
      line-height: 40px;
      background: #fff;
      li {
        list-style: none;
        float: left;
        font-size: 14px;
        color: #c3c3c3;
        height: 40px;
        text-align: center;
        width: 75px;
        border-right: 1px solid #c3c3c3;

        cursor: pointer;
        &:last-child {
          border-right: 0;
        }
      }
      li.active {
        background-color: #2274e5;
        color: #fff;
      }
    }
    .selectPartner {
      position: relative;
      margin-right: 32px;
      .el-input--medium .el-input__inner {
        height: 40px;
        line-height: 40px;
      }
    }
    .echarts-date {
      position: relative;
      .el-date-editor {
        width: 485px;
        height: 40px;
        max-width: 485px;
        /deep/ i {
          display: none;
        }
      }
      em {
        position: absolute;
        font-size: 18px;
        color: #2274e5;
        right: 24px;
        top: 2px;
      }
    }
  }
  .dialog {
    .updateTextArea {
      width: 485px;
      height: 240px;
      padding: 8px 16px;
    }
  }
  .signnav {
    min-width: 320px;
    background: #fff;
    border: 1px solid #ebeef5;
    margin-right: 30px;
    border-radius: 8px;
    padding: 0 16px;
    box-sizing: border-box;
    h3 {
      color: #333333;
      font-size: 16px;
      padding: 17px 0;
      border-bottom: 1px solid #e5e5e5;
      margin: 0;
    }
    .signavlist {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        font-size: 14px;
        .button {
          cursor: pointer;
          position: relative;
          height: 36px;
          line-height: 36px;
          border-radius: 4px;

          em {
            color: #2274e5;
            margin: 0 14px;
            font-size: 12px;
            transition: all 0.5s linear;
            -webkit-transition: all 0.5s linear;
          }
          span.active {
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
          }
          &:hover {
            background: #f5f5f5;
          }
        }
        ul {
          margin: 0;
          padding: 0;
          li {
            cursor: pointer;
            position: relative;
            color: #666666;
            height: 36px;
            line-height: 36px;
            padding-left: 64px;
            &:hover {
              background: #f5f5f5;
              color: #2274e5;
            }
            &.active {
              background: #f5f5f5;
              .edit {
                opacity: 1;
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
            }
            &:hover .edit {
              opacity: 1;
            }
          }
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
    border-radius: 8px;
    border: 1px solid #ebeef5;
    flex: 1;
    padding: 0px 0;
    background-color: #fff;
    .header_title {
      padding-left: 32px;
      height: 55px;
      line-height: 55px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: #666;
      margin-bottom: 23px;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
    .header {
      // width: 64px;
      display: flex;
      margin-left:42px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      margin-bottom: 24px;
      color: rgba(51, 51, 51, 1);
      &>div:nth-child(1){
        width:100px;
        text-align: right;
      }
      &>div:nth-child(2){
        margin-left:15px;
      }
    }
    textarea {
      border: 0px;
      outline: none;
      resize: none;
      background-color: #fff;
      margin-left: 15px;
      width: 500px;
      height: auto !important;
      margin-bottom: 48px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333;
      line-height: 20px;
    }
    p {
      margin-left: 33px;
      margin-bottom: 48px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
    }
  }
  .signtableAdd {
    flex: 1;
    padding: 0px 0px;
    background-color: #fff;
    .header {
      padding-left: 32px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: #666;
      margin-bottom: 23px;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
    form {
      padding: 0px 62px;
    }
    textarea {
      width: 485px;
      height: 240px;
      border-radius: 4px;
      border: 1px solid rgba(195, 195, 195, 1);
      resize: none;
      padding: 8px 16px;
      background-color: #fff;
      margin-bottom: 48px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
    }
    .updateTextArea {
      margin-bottom: 0px;
    }
    /deep/.textareaUrl {
      .el-textarea {
        border: 0px;
        outline: none;

        background-color: #fff;
        width: 500px;

        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }
    }
    .saveback {
      width: 485px;
      // float: right;
      span {
        display: block;
        float: right;
        width: 80px;
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        text-align: center;
        font-size: 14px;
        padding: 0;
        border: 1px solid #999999;
        cursor: pointer;
        &:nth-child(1) {
          border: none;
          background: #2274e5;
          box-shadow: 0px 10px 20px 0px rgba(0, 134, 255, 0.21);
          margin-left: 32px;
          color: #fff;
        }
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
    color: #999999;
    em {
      color: #ff0000;
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
}
</style>
