<template>
  <div class="app-container">
    <div class="app-menu" style="margin-top:0px">
      <div class="type_title">
        <div class="title">模板分类</div>
        <div class="addTitle" @click="buildNewData"><i class="iconfont icontianjia"/>新增分类</div>
      </div>
      <ul v-if="roleoptions.length>0">

        <li
       :class="listQuery.type==roleoptions[0].id?'active':''"  class="textLine tempType" @click="changeType(roleoptions[0].id)">
          {{ roleoptions[0].name }}

        </li>
      </ul>
      <transition-group tag="ul" class="container m_clearLR">
        <li
        :draggable="true"
            @dragstart="handleDragStart($event, item)"
            @dragover.prevent="handleDragOver($event, item)"
            @dragenter="handleDragEnter($event, item)"
            @dragend="handleDragEnd($event, item)"
        v-for="(item,index) in roleoptions" v-show="index>0" :class="listQuery.type==item.id?'active':''" :key="index" class="textLine tempType" @click="changeType(item.id)">
          {{ item.name }}
          <div class="edit">
            <i class="iconfont iconbianji"  @click.stop="confirmEditType(item)" />
            <i class="iconfont iconshanchulanse"  @click.stop="editTypeDelete(item)" />
            <i class="iconfont-1 iconpaixu" />
          </div>
        </li>
      </transition-group>
    </div>
    <div class="app-content">
    <div class="filter-container">
      <div class="build" @click="openAdd">
        <span>
          <i class="el-icon-plus" />
        </span>添加
      </div>
      <div class="search m_search">
        <el-input v-model="listQuery.name" placeholder="搜索相关关键词" maxlength="20" class="input-with-select" @keyup.native.enter="handleSearchback">
          <el-button slot="append" icon="el-icon-search" @click="handleSearchback" />
        </el-input>
      </div>
    </div>
    <div>

      <div >
    <el-table
      ref="singleTable"
      :data="tableList"
      highlight-current-row
      style="width: 100%"
      class="table"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column property="image" label="缩略图">
        <template slot-scope="{row}">
          <div class="thumbnail">
            <img :src="row.image" >
            <div class="edit">
              <i class="iconfont iconfangdachakan" @click="enlargeImage(row.image)" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column property="name" label="背景名称" />
      <el-table-column property="userName" label="创建者" />
      <el-table-column property="updateTime" label="上传时间">
        <template slot-scope="{row}">
          <span>{{ row.updateTime | formatDate(row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column property="address" label="操作" width="200">
        <template slot-scope="{row}">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i class="iconfont iconbianji" @click="confirmEdit(row)" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="下载" placement="top">
            <a :href="row.image" class="iconfont iconxiazai" />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i class="iconfont iconshanchulanse" @click="editDelete(row.id)" />
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
    </div>
    </div>
    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="openAddTemp" title="新增背景" class="dialog" width="976px">
        <div class="ul-box">
          <div class="li-item-1" @click="showUpload">
            <img class="m_tran50" src="@/assets/img/temp_img.png" alt="">
            <div class="titile">上传背景</div>
            <input type="file" multiple="multiple" ref="inputs"  v-show="1==2" accept=".jpg,.png,jpeg" @change="uploadDDL($event)" >
          </div>
          <div class="li-item" v-for="(item,index) in ddls" :key="index">
            <div class="li-img" >
              <div class="img">
                <img :src="item.image" alt="">
              </div>
              <div class="hidden-img">
              </div>
              <span class="iconfont iconshanchulanse" @click="deleteUploadback(index)"></span>
            </div>
            <div class="progressbar m_tran50" v-if="ddls.length<=0">
              <ProgressBar/>
            </div>
            <div class="li-input" v-else>
              <el-input type="text" v-model="item.name"></el-input>
            </div>
          </div>
        </div>
          <div class="submit">
            <el-button @click="openAddTemp=false">取消</el-button>
            <el-button type="primary" @click="addDataBacks">确定</el-button>
          </div>
      </el-dialog>
      <el-dialog :close-on-click-modal="false" :visible.sync="isdialogType" :title="titleData[titleType]" class="dialog" width="500px">
        <el-form
          ref="ruleFormType"
          :model="ruleFormType"
          :rules="rulesType"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="文件名：" prop="name" class="version">
            <el-input
              v-model="ruleFormType.name"
              type="text"
              placeholder="请输入文件名"
              maxlength="50"
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item class="submit">
            <el-button @click="isdialogType = false">取消</el-button>
            <el-button type="primary" @click="titleType=='create'?addDataType():updateType()">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
          <el-button type="primary" @click="updateData">确定</el-button>
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
  templatebackgroundList,
  templatebackgroundInsert,
  templatebackgroundDelete,
  templatebackgroundUpdate,
  templatebackgroundTypeUpdate,
  templatebackgroundTypeList,
  templatebackgroundTypeInsert,
  templatebackgroundTypeDelete,
  templatebackgroundInserts,
  open_company_list,
  templatetypeAllList,
  uploadPicsBack,
  templatebackgroundTypeSort
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
      openAddTemp:false,
      isdialogType:false,
      roleoptions: [],
      ruleForm: {
        name: '',
        image: ''
      },
      ruleFormType:{
        name: ''
      },
      currentIndex:0,
      companys: [],
      rules: {
        name: [{ required: true, validator: validateName }],
        image: [{ required: true, message: '请上传缩略图' }]
      },
      rulesType:{
        name: [{ required: true, validator: validateName }],
      },
      // 是否编辑
      isedit: false,
      ddls:[],
      titleData:{
        'create':'新增分类',
        'update':'修改分类',
      },
      titleType:'create',
      // 弹窗标题
      title: '添加',
      listQuery: { name: '', pageNo: 1, pageSize: 10 ,type:''}
    }
  },
  computed: {},
  created() {
    this.initData()
    this.listapi = templatebackgroundList

  },
  methods: {
    changeType(val) {
      this.listQuery.type = val
      this.handleSearchback()
    },

    handleSearchback() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.listQuery.pageSize = 10
      this.getListData(this.listQuery, this.listapi)
    },
    editTypeDelete(row, status) {
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
            templatebackgroundTypeDelete({id:row.id}).then(res => {
              this.initData();
              done();
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000
              });
              instance.confirmButtonLoading = false;
            });
          } else {
            done()
          }
          console.log(done)
        }
      }).then(action => {})
    },
    async initData(){
      const res = await templatebackgroundTypeList()
      if (res.code === 100) {
        res.data.unshift({
          id: '',
          name: '全部',
          type:''
        })
        this.roleoptions = res.data
        templatebackgroundList(this.listQuery).then(res=>{
          this.tableList = res.data.list
          this.totalnumber = res.data.total
        })
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    deleteUploadback(index){
      this.ddls.splice(index,1)
    },
    confirmEditType(row){
      var tempData = Object.assign({}, row) // copy obj
      this.ruleFormType.id = tempData.id
      this.ruleFormType.name = tempData.name
      this.titleType = 'update'
      this.isdialogType = true
      this.$nextTick(() => {
        this.$refs['ruleFormType'].clearValidate()
      })
    },
    uploadDDL(e){
       const file = [...e.target.files]
      const form = new FormData()
        file.forEach(value => {
          form.append('fileData', value)
        })
      uploadPicsBack(form).then(res=>{

        console.log(res.data)
        var tempData = []
        res.data.forEach(e=>{

          e.name = e.oldName.split('.')[0]
          e.image = e.sourceUrl
          e.typeId = this.listQuery.type
        })
        this.ddls =  [...this.ddls,...res.data]
        console.log(this.ddls)
        e.target.value = ''
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
      for (var i = 0; i < this.roleoptions.length; i++) {
        if(this.roleoptions[i].id)
        tempData.push({ id: this.roleoptions[i].id, sort: i })
      }
      templatebackgroundTypeSort({ idJson: JSON.stringify(tempData) })
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
      const newItems = [...this.roleoptions]
      const src = newItems.indexOf(this.dragging)
      const dst = newItems.indexOf(item)

      newItems.splice(dst, 0, ...newItems.splice(src, 1))

      this.roleoptions = newItems
    },
    buildNewData() {
      this.titleType = 'create'
      this.ruleForm = {
        name: ''
      }
      this.isdialogType = true
      this.$nextTick(() => {
        this.$refs['ruleFormType'].clearValidate()
      })
    },
    showUpload(){
      this.$refs['inputs'].click()
    },
    openAdd() {
      this.resetTemp()
      this.isEdit = false
      this.openAddTemp = true
      // this.isdialog = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    resetTemp() {
      this.ruleForm = {
        name: ''

      }
    },
    addDataType() {
      this.$refs.ruleFormType.validate(async valid => {
        if (valid) {
           templatebackgroundTypeInsert(this.ruleFormType).then(res=>{
          this.isdialogType = false
          this.initData()
        })
        }
      });

    },
    updateType(){
      templatebackgroundTypeUpdate(this.ruleFormType).then(res=>{
        this.isdialogType = false
        this.initData()
      })
    },
    addDataBacks() {
      var temp = []
      this.ddls.forEach(e=>{
        var obj = {
          name:e.name,
          image:e.image,
          typeId:e.typeId
        }
        temp.push(obj)
      })
      templatebackgroundInserts({json:JSON.stringify(temp)}).then(res=>{
        if(res.code==100){
          this.openAddTemp = false
          this.initData()
          this.$message({
              showClose: true,
              message: '新增数据成功',
              type: 'success'
            })
        }
      })

    },
    updateData(){
      templatebackgroundUpdate(this.ruleForm).then(res=>{
        this.isdialog = false
        this.initData()
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
        name: row.name,
        image: row.image,
        id: row.id
      }
    },
    editDelete(id) {
      this.deleteData(id, templatebackgroundDelete, templatebackgroundList, this.listQuery)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.version {
  width: 380px;
}
.app-menu{
  margin-top:0px !important;
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
