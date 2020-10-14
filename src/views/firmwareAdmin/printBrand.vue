<template>
  <div class="app-container notice-message">
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
          <div class="addTitle" @click="openAddBrand">
            <i class="iconfont icontianjia" />新增品牌
          </div>
        </div>
        <transition-group tag="ul" class="container m_clearLR">
          <li
          :draggable="true"
            @dragstart="handleDragStart($event, item)"
            @dragover.prevent="handleDragOver($event, item)"
            @dragenter="handleDragEnter($event, item)"
            @dragend="handleDragEnd($event, item)"
           v-for="(item,index) in brands" :class="currentIndex==index?'active':''" :key="index" class="textLine" @click="selectCompany(item.id,index)">
            {{ item.brandName }}
            <div class="brandOp" >
              <i class="iconfont iconbianji" @click="confirmEditBrand(item)" />
              <i class="iconfont iconshanchulanse" @click.stop="editDeleteBrand(item.id)" />
              <i class="iconfont-1 iconpaixu" />
            </div>
          </li>
        </transition-group>
      </div>
      <div class="app-content">
        <!-- <div class="filter-container filesearch"  v-if="permissionData.indexOf('user_manage_search_executable')!=-1">
      <div class="search">
        <el-input v-model="listQuery.keyword" placeholder="根据手机号搜索" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
        </el-input>
      </div>
    </div> -->
        <el-table
          ref="singleTable"
          :data="tableList"
          highlight-current-row
          class="table"
        >
          <el-table-column type="index" label="序号" width="80" />

          <el-table-column label="类型" >
            <template slot-scope="{row}">
              <span>{{ row.typeDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="分辨率" >
            <template slot-scope="{row}">
              <span>{{ row.dispalyDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="指令集" >
            <template slot-scope="{row}">
              <span>{{ row.commandDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="sdk" >
            <template slot-scope="{row}">
              <span>{{ row.sdkDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="排序" align="center">
            <template slot-scope="scope">
              <div class="sort_icon">
                <i
                  :class="(scope.$index==0&&listQuery.pageNo==1)||scope.row.first?'Noselect':''"
                  class="iconfont iconbianzu1"
                  @click="arrowUpDown(scope.row,scope.$index,0)"
                />
                <i
                  :class="scope.row.brandTypeId==tableList[tableList.length-1].brandTypeId||scope.row.end?'Noselect':''"
                  class="iconfont iconbianzu"
                  @click="arrowUpDown(scope.row,scope.$index,1)"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i class="iconfont iconbianji" @click="confirmEdit(row)" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <i class="iconfont iconshanchulanse" @click="editDelete(row.brandTypeId)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog :close-on-click-modal="false" :visible.sync="showDialog" :title="textMap[dialogStatus]" class="dialog" width="560px">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :modal-append-to-body="false"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="类型：">
              <el-select
                v-model="ruleForm.printer_type"
                filterable
                placeholder="请选择分辨率类型"
              >
                <el-option
                  v-for="item in printer_type"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="分辨率：" >
              <el-select
                v-model="ruleForm.dispaly"
                filterable
                placeholder="请选择分辨率"
              >
                <el-option
                  v-for="item in dispaly "
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="指令集：" >
              <el-select
                v-model="ruleForm.command"
                filterable
                placeholder="请选择指令集"
              >
                <el-option
                  v-for="item in command"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="SDK：">
              <el-select
                v-model="ruleForm.sdk"
                filterable
                placeholder="请选择SDK"
              >
                <el-option
                  v-for="item in sdk"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item class="submit">
              <el-button @click="showDialog=false">取消</el-button>
              <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()" >确定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog :close-on-click-modal="false" :visible.sync="showDialogBrand" :title="textMapBrand[dialogStatus]" class="dialog" width="560px">
          <el-form
            ref="ruleFormBrand"
            :model="ruleFormBrand"
            :rules="rules"
            :modal-append-to-body="false"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="品牌：" prop="brand_name" class="version">
              <el-input
                v-model="ruleFormBrand.brand_name"
                type="text"
                maxlength="20"
                placeholder="请输入打印机品牌"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="Logo：" class="backupload" prop="imgPath">
              <div class="file">
                <div v-if="!ruleFormBrand.imgPath" class="upfile">
                  <input type="file" accept=".jpg, .jpeg, .png" @change="changeImg" >
                  <i class="iconfont icontianjiatupian" />
                  <p>文件格式jpg、png，</p>
                  <p>文件大小200K</p>
                </div>
                <div v-else class="fileimg">
                  <div class="fileimg-delete">
                    <i class="iconfont iconshanchulanse" @click="deleteUpload('imgPath')" />
                  </div>
                  <img :src="ruleFormBrand.imgPath" >
                </div>
              </div>
            </el-form-item>

            <el-form-item class="submit">
              <el-button @click="showDialogBrand=false">取消</el-button>
              <el-button type="primary" @click="dialogStatus==='create'?createDataBrand():updateDataBrand()" >确定</el-button>
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
    <el-dialog :visible.sync="isEnlarge" :modal-append-to-body="false" :show-close="false" :width="widthauto" title class="imgdialog">
      <img :src="imgPath" class="magnifier" @load="onLoad">
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  printer_brand_typeupdatesort ,startpageList, printer_brand_type_update, printer_brand_type_delete,printer_brandSort,
  printer_brand_type_add, printer_brand_update, printer_brand_type_list, printer_brand_delete, printer_brand_list, printer_brand_add, upload_brand_image
} from '@/api/api'
import { validateUrl, validateName } from '@/utils/validate'
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
      eqList: [{ id: 1, name: 'Android端' }, { id: 2, name: 'IOS端' }, { id: 3, name: 'PC端' }],
      printer_type: [{ id: 1, name: '标签' }, { id: 2, name: '小票' }],
      dispaly: [{ id: 1, name: '203dpi' }, { id: 2, name: '300dpi' }],
      command: [{ id: 1, name: 'TSPL' }, { id: 2, name: 'CPCL' }, { id: 3, name: 'ESC' }, { id: 4, name: 'PPLE' }],
      sdk: [{ id: 1, name: '驰腾' }, { id: 2, name: '佳博' }, { id: 3, name: '思普瑞特' }, { id: 4, name: '商米' },
        { id: 5, name: '启锐' }, { id: 6, name: '博思得' }, { id: 10, name: '通用' }],
      showDialog: false,
      showDialogBrand: false,
      dialogStatus: '',
      fileTexts: ['Android端', 'IOS端'],
      textMap: {
        update: '编辑',
        create: '添加'
      },
      textMapBrand: {
        update: '编辑品牌',
        create: '新增品牌'
      },
      ruleFormBrand: {
        brand_name: '',
        imgPath: '',
        equip_type: 1
      },
      ruleForm: {
        brand_id: '',
        printer_type: 1,
        dispaly: 1,
        command: 1,
        sdk: 1
      },
      rules: {
        brand_name: [{ required: true, message: '请输入品牌名称' }],
        name: [{ required: true, validator: validateName }],
        imgPath: [{ required: true, message: '请上传广告图' }],
        linkPath: [{ required: true, validator: validateUrl }]
      },
      // 是否编辑
      isedit: false,
      currentIndex: 0,
      typeQuery: { equip_type: 1 },
      selectId: 0,
      barIndex: 0,
      brands: [],
      listQuery: { page_no: 1, page_size: 10, brand_id: -1 }
    }
  },
  computed: {
    ...mapGetters([
      'permissionData'
    ])
  },
  created() {
    this.selectBarIndex(this.barIndex)
  },
  methods: {
    arrowUpDown(item, index, type) {
      if ((type === 0 && ((index === 0 && this.listQuery.pageNo === 1) || item.first)) || (type === 1 && (index === this.tableList.length - 1 || item.end))) {
        return
      }
      printer_brand_typeupdatesort({ id: item.brandTypeId, type: type }).then(res => {
        this.getList()
      })
    },
    handleDragStart(e, item) {
      this.dragging = item
      console.log(item)
    },
    handleDragEnd(e, item) {
      this.dragging = null
      var tempData = []
      console.log(item)
      for (var i = 0; i < this.brands.length; i++) {
        if(this.brands[i].id)
        tempData.push({ id: this.brands[i].id, sort: i+1 })
      }
      printer_brandSort({ idJson: JSON.stringify(tempData) })
    },
    // 首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      e.dataTransfer.dropEffect = 'move' // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = 'move' // 为需要移动的元素设置dragstart事件
      if (item === this.dragging) {
        return
      }
      const newItems = [...this.brands]
      const src = newItems.indexOf(this.dragging)
      const dst = newItems.indexOf(item)

      newItems.splice(dst, 0, ...newItems.splice(src, 1))

      this.brands = newItems
    },
    async uploadChange(event, filetype, field, isfile) {
      if (isfile) {
        this.ispercent = true
      }
      const file = event.target.files[0]
      const form = new FormData()
      form.append('fileData', file)
      // const config = (progressEvent) => {
      //   if (progressEvent.lengthComputable) {
      //     this.percent = (progressEvent.loaded / progressEvent.total * 100 | 0)
      //   }
      // }
      try {
        const res = await upload_brand_image(form)
        this.ispercent = false
        this.ruleFormBrand[field] = res.data.sourceUrl
        this.uploadid = res.data.id
        if (this.ruleFormBrand.name === '') {
          this.ruleFormBrand.name = res.data.oldName.split('.')[0]
        }
        if (isfile) {
          this.oldName = res.data.oldName
        }
        this.$refs['ruleFormBrand'].clearValidate(field)
        this.$message({
          showClose: true,
          message: '上传成功',
          type: 'success'
        })
        event.target.value = ''
      } catch (e) {
        this.ispercent = false
        event.target.value = ''
      }
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
      upload_brand_image(form).then(res => {
        this.ruleFormBrand.brand_image_id = res.data.id
        this.ruleFormBrand.imgPath = res.data.sourceUrl
        this.$refs['ruleFormBrand'].clearValidate('imgPath')
      })
    },
    selectBarIndex(index) {
      this.barIndex = index
      if (index === 0) {
        this.typeQuery.equip_type = 1
        this.ruleFormBrand.equip_type = 1
        this.initData(this.barIndex+1)
      } else {
        this.typeQuery.equip_type = 2
        this.ruleFormBrand.equip_type = 2
        this.initData(this.barIndex+1)
      }
    },
    initData(equip) {
      printer_brand_list({ equip_type: equip }).then(res => {
        this.brands = res.data
        this.listapi = printer_brand_type_list

        // this.companys.splice(0,0,{id:0,shortName:'默认'})

        if (this.brands.length > 0) {
          this.listQuery.brand_id = this.brands[0].id
          this.currentIndex = 0
          this.getListDataBrand({ page_no: 1, page_size: 10, brand_id: this.brands[0].id }, printer_brand_type_list)
        } else {
          this.tableList = []
        }
      })
    },
    async getListDataBrand(data, url) {
      const res = await url(data)
      if (res.code === 100) {
        this.calcChildren(res.data.records)
        this.tableList = res.data.records
        this.totalnumber = res.data.total
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    selectCompany(id, index) {
      this.listQuery.page_no = 1
      this.currentIndex = index
      this.listQuery.brand_id = id
      this.getListDataBrand(this.listQuery, printer_brand_type_list)
    },
    getList() {
      printer_brand_type_list(this.listQuery).then(res => {

        this.calcChildren(res.data.records)
        console.log(res.data.records)
        this.tableList = res.data.records
        this.totalnumber = res.data.total
      })
    },
    calcChildren(temp) {
      var num = 0
      temp.forEach(item => {
          if(num == 0)
            item['first'] = true

          if(num == temp.length-1)
            item.end = true
          num++

      })
    },
    getListBrand() {
      this.initData(this.barIndex+1)
    },
    // changeImg(val) {
    //   console.log(val)
    //   // const isLt2M = val.size / 1024 < 200;
    //   // if (!isLt2M) {
    //   //   this.$message.error("上传图片大小不能超过 200kb !");
    //   //   return;
    //   // }
    //   var form = new FormData()
    //   form.append('fileData', event.target.files[0])
    //   uploadPic(form, 11).then(res => {
    //     console.log(res.data.sourceUrl)
    //     this.ruleForm.imgPath = res.data.sourceUrl
    //   })
    // },
    openAdd() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    openAddBrand() {
      this.resetTempBrand()
      this.dialogStatus = 'create'
      this.showDialogBrand = true
      this.$nextTick(() => {
        this.$refs['ruleFormBrand'].clearValidate()
      })
    },
    createData() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.ruleForm.brand_id = this.listQuery.brand_id
          printer_brand_type_add(this.ruleForm).then(res => {
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
          this.ruleForm.brand_id = this.listQuery.brand_id
          printer_brand_type_update(this.ruleForm).then(res => {
            this.getList()
            this.showDialog = false
            this.$message.success('修改成功')
          })
        }
      })
    },
    createDataBrand() {
      this.$refs.ruleFormBrand.validate(async valid => {
        if (valid) {
          printer_brand_add(this.ruleFormBrand).then(res => {
            this.showDialogBrand = false
            this.getListBrand()
            this.$message.success('添加成功')
          })
        }
      })
    },
    updateDataBrand() {
      this.$refs.ruleFormBrand.validate(async valid => {
        if (valid) {
          var temp = {
            id: this.ruleFormBrand.id,
            brand_image_id: this.ruleFormBrand.brand_image_id,
            brand_name: this.ruleFormBrand.brand_name,
            equip_type: this.ruleFormBrand.equip_type
          }
          printer_brand_update(temp).then(res => {
            this.getListBrand()
            this.showDialogBrand = false
            this.$message.success('修改成功')
          })
        }
      })
    },
    resetTemp() {
      this.ruleForm = {
        brand_id: '',
        printer_type: 1,
        dispaly: 1,
        command: 1,
        sdk: 1
      }
    },
    resetTempBrand() {
      this.ruleFormBrand = {
        brand_name: '',
        imgPath: '',
        equip_type: this.barIndex === 0 ? 1 : 2
      }
    },
    confirmEdit(row) {
      var ruleForm = Object.assign({}, row) // copy obj
      this.ruleForm = {
        brand_type_id: ruleForm.brandTypeId,
        printer_type: ruleForm.typeId,
        dispaly: ruleForm.dispalyId,
        command: ruleForm.commandId,
        sdk: ruleForm.sdkId

      }
      this.dialogStatus = 'update'
      this.showDialog = true
      // this.$nextTick(() => {
      //   this.$refs["ruleForm"].clearValidate();
      // });
    },
    confirmEditBrand(row) {
      var tempData = Object.assign({}, row) // copy obj
      this.ruleFormBrand.id = tempData.id
      this.ruleFormBrand.brand_name = tempData.brandName
      this.ruleFormBrand.imgPath = tempData.brandImagePath
      this.ruleFormBrand.brand_image_id = tempData.brandImageId
      this.dialogStatus = 'update'
      this.showDialogBrand = true
      this.$nextTick(() => {
        this.$refs['ruleFormBrand'].clearValidate()
      })
    },

    editDeleteBrand(id) {
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

            printer_brand_delete({ id: id }).then(res => {
              done()
              this.getListBrand()
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

            printer_brand_type_delete({ brand_type_id: id }).then(res => {
              done()
              this.getList()
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
    },
    handleSearch() {
      this.listQuery.page_no = 1
      this.currentpage = 1
      this.getListDataBrand(
        this.listQuery,
        startpageList
      )
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.Noselect {
  color: #dfdfe0 !important;
}
.sort_icon{
  i:first-child{
    margin-right: -5px;
  }
}
.signadmin {
    width: 100%;
    display: flex;

    .app-content{
      margin-left:30px;
      flex: 1;
      overflow-y: hidden;
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
.app-menu ul li{
  padding-left:12px;
}
.app-menu ul li .brandOp i{
  margin-right: 10px;
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
.app-menu{
  width:260px;
  margin-top:0px !important;
}
.filesearch{
  justify-content: flex-end;
}
.picture {
  width: 160px;
  height: 160px;
  border-radius: 2px;
  border: 1px solid #C3C3C3;
}
</style>
