<template>
  <div class="app-container notice-message">
    <!-- <div class="fileBar_box">
      <div
        v-for="(item,index) in fileTexts"
        :class="barIndex==index?'active':''"
        :key="index"
        class="fileBar_div"
        @click="selectBarIndex(index)"
      >{{ item }}</div>
    </div> -->
    <div class="select_box approval_box  m_clearLR">
      <ul class="notice-ul m_clearLR m_floatL" >
        <li :class="barIndex==index?'active':''" class="m_floatL li-item"
        v-for="(item,index) in fileTexts" @click="selectBarIndex(index)"
        :key="index"
         >{{ item }}</li>
      </ul>
    </div>
    <div class="filter-container_02 posab_box">
      <div class="search m_floatR" >
        <div class="build" @click="openAdd()" >
          <span>
            <i class="el-icon-plus" />
          </span>添加
        </div>
      </div>
    </div>
    <div class="signadmin">
      <div class="app-menu">
        <div class="type_title">
          <div class="title">打印机品牌</div>
          <!-- <div class="addTitle" @click="openAdd">
            <i class="iconfont icontianjia" />新增品牌
          </div> -->
        </div>
        <ul>
          <li
            v-for="(item,index) in companys"
            :class="currentIndex==index?'active':''"
            :key="index"
            class="textLine"
            @click="selectCompany(item.id,index)"
          >{{ item.brandName }}</li>
        </ul>
      </div>
      <div class="app-content">
        <!-- <div class="filter-container filesearch"  v-if="permissionData.indexOf('user_manage_search_executable')!=-1">
          <div class="search">
            <el-input v-model="listQuery.keyword" placeholder="根据手机号搜索" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
            </el-input>
          </div>
        </div>-->
        <el-table ref="singleTable" :data="tableList" highlight-current-row class="table">
          <el-table-column type="index" label="序号" width="80" />
          <el-table-column property="name" label="打印机型号">
            <template slot-scope="{row}">
              <span>{{ row.model }}</span>
            </template>
          </el-table-column>
          <el-table-column property="name" label="版本号">
            <template slot-scope="{row}">
              <span>{{ row.version }}</span>
            </template>
          </el-table-column>
          <el-table-column property="tips_cn" label="中文提示语">
            <template slot-scope="{row}">
              <span>{{ row.tipsCn }}</span>
            </template>
          </el-table-column>
          <el-table-column property="tips_en" label="英文提示语">
            <template slot-scope="{row}">
              <span>{{ row.tipsEn }}</span>
            </template>
          </el-table-column>

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

        <el-dialog
          :close-on-click-modal="false"
          :visible.sync="showDialog"
          :title="textMap[dialogStatus]"
          class="dialog"
          width="560px"
        >
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            :modal-append-to-body="false"
            label-width="110px"
            class="demo-ruleForm"
          >
            <el-form-item label="打印机型号：" prop="model" class="version">
              <el-input
                v-model="ruleForm.model"
                type="text"
                maxlength="50"
                placeholder="仅支持中英文、数字和下划线，不包含特殊字符"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="版本号：" prop="version" class="version">
              <el-input
                v-model="ruleForm.version"
                type="text"
                maxlength="50"
                placeholder="仅支持中英文、数字和下划线，不包含特殊字符"
                autocomplete="off"
              />
            </el-form-item>

            <el-form-item label="中文提示语：" prop="tips_cn" class="version">
              <div class="remarks">
                <el-input
                  v-model="ruleForm.tips_cn"
                  :rows="5"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="500"
                />
                <span>{{ ruleForm.tips_cn.length }}/500</span>
              </div>
            </el-form-item>

            <el-form-item label="英文提示语：" prop="tips_en" class="version">
              <div class="remarks">
                <el-input
                  v-model="ruleForm.tips_en"
                  :rows="5"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="500"
                />
                <span>{{ ruleForm.tips_en.length }}/500</span>
              </div>
            </el-form-item>

            <el-form-item label="指导图：" class="backupload" prop="imgPath">
              <div class="file">
                <div v-if="!ruleForm.imgPath" class="upfile">
                  <input type="file" accept=".jpg, .jpeg, .png" @change="changeImg" >
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

            <el-form-item label="选择固件：" prop="fontsPath" class="fileprogress">
              <div class="ttffile">
                <input
                  type="file"
                  accept=".bin"
                  @change="uploadChange_LX($event,6,'fontsPath', true)"
                >
                <span>选择文件</span>
                <p>文件格式bin，文件大小20mb</p>
              </div>
              <ProgressBar v-if="ispercent && ruleForm.fontsPath === ''" />
              <div v-if="ruleForm.fontsPath && !ispercent" class="progress">
                <span>{{ oldName }}</span>
                <i class="iconfont iconshanchuhuise" @click="deleteUpload('fontsPath')" />
              </div>
            </el-form-item>

            <el-form-item class="submit">
              <el-button @click="showDialog=false">取消</el-button>
              <el-button
                type="primary"
                @click="dialogStatus==='create'?createData():updateData()"
              >确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
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
      </div>
    </div>
    <!-- 放大图片 -->
    <el-dialog
      :visible.sync="isEnlarge"
      :modal-append-to-body="false"
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
import ProgressBar from '@/components/ProgressBar'
import { mapGetters } from 'vuex'
import {
  upload_firmware_image,
  printer_brand_firmware_list,
  add_or_update_firmware,
  printer_brand_firmware_delete,
  printer_brand_firmware_brand_list
} from '@/api/api'
import moment from 'moment'
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  components: {
    ProgressBar
  },
  data() {
    return {
      fileTexts: ['Android端', 'IOS端'],
      eqList: [
        { id: 1, name: 'Android端' },
        { id: 2, name: 'IOS端' },
        { id: 3, name: 'PC端' }
      ],
      showDialog: false,
      dialogStatus: '',
      barIndex: 0,
      textMap: {
        update: '编辑',
        create: '添加'
      },
      ruleForm: {
        model: '',
        version: '',
        tips_en: '',
        tips_cn: '',
        imgPath: '',
        fontsPath: ''
      },
      rules: {
        version: [{ required: true, message: '此处不能为空' }],
        model: [{ required: true, message: '此处不能为空' }],
        tips_cn: [{ required: true, message: '此处不能为空' }],
        tips_en: [{ required: true, message: '此处不能为空' }],
        imgPath: [{ required: true, message: '请上传广告图' }],
        fontsPath: [{ required: true, message: '请上传固件' }]
      },
      // 是否编辑
      isedit: false,
      currentIndex: 0,
      selectId: 0,
      typeQuery: { equip_type: 1 },
      companys: [],
      listQuery: { page_no: 1, page_size: 10, brand_id: -1 }
    }
  },
  computed: {
    ...mapGetters(['permissionData'])
  },
  created() {
    this.selectBarIndex(0)
  },
  methods: {
    selectBarIndex(index) {
      this.barIndex = index
      if (index === 0) {
        this.typeQuery.equip_type = 1
        this.initData(1)
      } else {
        this.typeQuery.equip_type = 2
        this.initData(2)
      }
    },
    initData(equip) {
      printer_brand_firmware_brand_list({ equip_type: equip }).then(res => {
        this.companys = res.data
        this.listapi = printer_brand_firmware_list

        // this.companys.splice(0,0,{id:0,shortName:'默认'})

        if (this.companys.length > 0) {
          this.listQuery.brand_id = this.companys[0].id
          this.getListDataLx(
            { page_no: 1, page_size: 10, brand_id: this.companys[0].id },
            printer_brand_firmware_list
          )
        }
      })
    },
    selectCompany(id, index) {
      this.listQuery.page_no = 1
      this.currentIndex = index
      this.listQuery.brand_id = id
      this.getListDataLx(this.listQuery, printer_brand_firmware_list)
    },
    getList() {
      printer_brand_firmware_list(this.listQuery).then(res => {
        this.tableList = res.data.records
        this.totalnumber = res.data.total
      })
    },
    changeImg(val) {
      console.log(val)
      // const isLt2M = val.size / 1024 < 200;
      // if (!isLt2M) {
      //   this.$message.error("上传图片大小不能超过 200kb !");
      //   return;
      // }
      var form = new FormData()
      form.append('fileData', event.target.files[0])
      upload_firmware_image(form).then(res => {
        this.ruleForm.firmware_image_id = res.data.id
        this.ruleForm.firmwareImageId = res.data.id
        this.ruleForm.imgPath = res.data.sourceUrl
        this.$refs['ruleForm'].clearValidate('imgPath')
      })
    },
    openAdd() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    createData() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.ruleForm.printer_brand_id = this.listQuery.brand_id
          this.ruleForm.firmware_file_id = this.uploadid
          add_or_update_firmware(this.ruleForm).then(res => {
            this.showDialog = false
            this.getList()
            this.$message.success('添加成功')
          })
        }
      })
    },
    updateData() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          var ruleForm = {
            id: this.ruleForm.id,
            model: this.ruleForm.model,
            version: this.ruleForm.version,
            tips_en: this.ruleForm.tips_en,
            tips_cn: this.ruleForm.tips_cn,
            firmware_file_id: this.uploadid,
            firmware_image_id: this.ruleForm.firmwareImageId
          }
          ruleForm.printer_brand_id = this.listQuery.brand_id
          add_or_update_firmware(ruleForm).then(res => {
            this.getList()
            this.showDialog = false
            this.$message.success('修改成功')
          })
        }
      })
    },
    resetTemp() {
      this.ruleForm = {
        model: '',
        version: '',
        tips_en: '',
        tips_cn: '',
        imgPath: '',
        fontsPath: ''
      }
    },
    confirmEdit(row) {
      var ruleForm = Object.assign({}, row) // copy obj
      this.ruleForm = {
        id: ruleForm.id,
        model: ruleForm.model,
        version: ruleForm.version,
        tips_en: ruleForm.tipsEn,
        tips_cn: ruleForm.tipsCn,
        imgPath: ruleForm.firmwareImagePath,
        fontsPath: ruleForm.firmwareFilePath,
        firmware_file_id: ruleForm.firmwareFileId,
        firmware_image_id: ruleForm.firmwareImageId
      }
      this.uploadid = ruleForm.firmwareFileId
      this.oldName = ruleForm.firmwareFilePath
      this.dialogStatus = 'update'
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },

    editDelete(id) {
      const h = this.$createElement
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '删除后将无法恢复，是否继续？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'

            printer_brand_firmware_delete({ id: id })
              .then(res => {
                done()
                this.getList()
                this.$message.success('删除成功')
                instance.confirmButtonLoading = false
              })
              .catch(() => {
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
    handleSearch() {
      this.listQuery.page_no = 1
      this.currentpage = 1
      this.getListDataLx(this.listQuery, printer_brand_firmware_list)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.remarks {
  width: 388px;
  position: relative;
  textarea {
    width: 300px;
    height: 147px;
    border-radius: 4px;
    border: 1px solid #c3c3c3;
    box-sizing: border-box;
    padding: 5px;
    outline: none;
    resize: none;
  }
  span {
    position: absolute;
    bottom: 0px;
    right: 13px;
    color: #c3c3c3;
    font-size: 12px;
  }
}
.notice-message{
  .notice-ul{
    display: flex;
    li{
      width: 100px;
      height: 32px;
      cursor: pointer;
      text-align: center;
      line-height: 32px;
      background: #FFFFFF;
      border-radius: 4px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #666666;
      margin-right: 16px;
      &.active{
        color: #FFFFFF;
        background: #2274E5;
      }
    }

  }
}
.fileBar_box {
  z-index: 9;
  display: flex;
  justify-content: flex-start;
  position: relative;
  & > div:nth-child(2) {
    opacity: 0.8;
  }
  & > div:nth-child(3) {
    opacity: 0.6;
  }
  & > div:nth-child(4) {
    opacity: 0.4;
  }
  .fileBar_div {
        line-height: 36px;
    width: 125px;
    margin-right: 8px;
    text-align: center;
    cursor: pointer;
    height: 36px;
    background: #2274e5;
    border-radius: 8px 8px 0px 0px;
    position: relative;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: white;
    &.active {
      color: #2274e5;
      opacity: 1;
      background-color: #fff;
    }
    &.active::after {
          content: '';
    width: 2px;
    position: absolute;
    left: 0px;
    top: 10px;
    height: 18px;
    background-color: #2274e5;
    }
  }
}
.signadmin {
  width: 100%;
  display: flex;

  .app-content {
    margin-left: 30px;
    flex: 1;
    overflow-y: hidden;
  }
}
.app-menu {
  margin-top: 0px !important;
}
.filesearch {
  justify-content: flex-end;
}
.picture {
  width: 160px;
  height: 160px;
  border-radius: 2px;
  border: 1px solid #c3c3c3;
}
</style>
