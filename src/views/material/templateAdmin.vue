<template>
  <div class="app-container">
    <div class="app-menu" style="margin-top:0px">
      <div class="type_title">
        <div class="title">模板分类</div>
        <div class="addTitle" @click="buildNewData"><i class="iconfont icontianjia"/>新增分类</div>
      </div>
      <ul >
        <li
       :class="listQuery.templateTypeId==roleoptions[0].id?'active':''"  class="textLine tempType" @click="changeType(roleoptions[0].id)">
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
            v-for="(item,index) in roleoptions" v-show="index>0" :class="listQuery.templateTypeId==item.id?'active':''" :key="index" class="textLine tempType" @click="changeType(item.id)">
          <div style="width:100px" class="textLine">{{ item.name }}</div>
          <div class="edit">
            <i class="iconfont iconbianji" @click="confirmEdit(item)" />
            <i class="iconfont iconshanchulanse" @click="editTypeDelete(item.id)" />
            <i class="iconfont-1 iconpaixu" />
          </div>
        </li>
      </transition-group>
    </div>
    <div class="app-content">
      <div class="search">
        <div class="search-list">
          <span>文件名：</span>
          <el-input v-model="listQuery.name" maxlength="20" placeholder="请输入文件名" />
        </div>
        <div class="search-list search-size">
          <span>文件尺寸：</span>
          <el-input v-model="listQuery.fileWidth" maxlength="5" placeholder="宽" />
          <em/>
          <el-input v-model="listQuery.fileHeight" placeholder="高" maxlength="5" />
        </div>
      </div>
      <div class="search">
        <div class="search-list">
          <span>模板分类：</span>
          <el-select
            v-model="listQuery.templateTypeId"
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
        </div>
        <div class="search-list searchbtn">
          <el-button type="primary" class="m_search" @click="searchTemp">查询</el-button>
          <div class="search-reset">
            <el-button type="primary" @click="resetTemp">重置</el-button>
          </div>
        </div>
      </div>
      <div class="build" @click="buidNew"  v-show="listQuery.templateTypeId">
        <span>
          <i class="el-icon-plus" />
        </span>添加
      </div>
      <el-table
        ref="singleTable"
        :data="tableList"
        highlight-current-row
        style="width: 100%"
        class="table"
      >
        <el-table-column type="index" label="序号" width="80"/>
        <el-table-column property="version" label="缩略图">
          <template slot-scope="{row}">
            <div class="thumbnail">
              <img :src="row.img" >
              <div class="edit">
                <i class="iconfont iconfangdachakan" @click="enlargeImage(row.img)" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="name" label="文件名" />
        <el-table-column label="文件尺寸">
          <template slot-scope="{row}">{{ row.fileWidth }}*{{ row.fileHeight }}</template>
        </el-table-column>
        <el-table-column property="userName" label="创建者" />
        <el-table-column property="dlabelTemplateTypeVO.name" label="模板分类" />
        <el-table-column property="updateTime" label="上传时间">
          <template slot-scope="{row}">
            <span>{{ row.updateTime | formatDate(row.updateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column property="address" label="操作" width="200">
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <i class="iconfont iconbianji" @click="editBack(row.id)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="下载" placement="top">
              <a
                :href="row.file"
                class="iconfont iconxiazai"
              />
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
          :page-size="listQuery.pageSize"
          :total="totalnumber"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange($event, listQuery)"
          @current-change="handleCurrentChange($event, listQuery)"
        />
      </div>
      <!-- 新增分类 -->
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
              placeholder="请输入文件名"
              maxlength="50"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="语言：" prop="languageId" class="version">
            <div class="selectradio">
              <el-radio-group v-model="ruleForm.languageId">
                <el-radio :label="1">中文</el-radio>
                <el-radio :label="2">English</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item class="submit">
            <el-button @click="resetForm">取消</el-button>
            <el-button type="primary" @click="addDataType">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog :close-on-click-modal="false" :visible.sync="openAddTemp" title="新增模板" class="dialog" width="976px">
        <div class="ul-box">
          <div class="li-item-1" @click="showUpload">
            <img class="m_tran50" src="@/assets/img/temp_img.png" alt="">
            <div class="titile">上传模板</div>
            <input type="file" multiple="multiple" ref="inputs"  v-show="1==2" accept=".ddl" @change="uploadDDL($event)" >
          </div>
          <div class="li-item" v-for="(item,index) in ddls" :key="index">
            <div class="li-img" >
              <div class="img">
                <img :src="item.img" alt="">
              </div>
              <div class="hidden-img">
              </div>
              <span class="iconfont iconshanchulanse" @click="deleteUpload(index)"></span>
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
            <el-button type="primary" @click="addDDLs">确定</el-button>
          </div>
      </el-dialog>
      <!-- 放大图片 -->
      <el-dialog :visible.sync="isEnlarge" :modal-append-to-body="false" :show-close="false" :width="widthauto" title class="imgdialog">
        <img :src="imgPath" class="magnifier" @load="onLoad">
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { validateName } from '@/utils/validate'
import { templatesystemInserts,upload_ddl,templatetypeSort,templateList, templatetypeAllList, templatetypeDelete, templateDelete, templatetypeInsert, templatetypeUpdate, templatetypeList } from '@/api/api'
import moment from 'moment'
import ProgressBar from '@/components/ProgressBar'
export default {
  name: 'ComplexTable',
  components: {
    ProgressBar
  },
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  data() {
    return {
      openAddTemp:false,
      roleoptions: [],
      title: '新增分类',
      ddls:[],
      rules: {
        name: [{ required: true, validator: validateName }]
      },
      ruleForm: {
        name: '',
        languageId: 1
      },
      listQuery: { name: '', fileWidth: '', fileHeight: '', templateTypeId: '', pageNo: 1, pageSize: 10 }
    }
  },
  created() {
    if(localStorage.getItem('openHistory')){
      this.listQuery = JSON.parse(localStorage.getItem('openHistory'))
      this.currentpage = this.listQuery.pageNo
      this.pagesize = this.listQuery.pageSize
      localStorage.setItem('openHistory','')
    }
    // alert(this.text)
    this.listapi = templateList
    this.getListData(Object.assign({ pageNo: this.currentpage, pageSize: this.pagesize }, this.listQuery), templateList)
    this.getDlabelSysRoleList()
    document.body.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.searchTemp()
      }
    })
  },
  methods: {
    deleteUpload(index){
      this.ddls.splice(index,1)
    },
    uploadDDL(e){
       const file = [...e.target.files]
      const form = new FormData()
        file.forEach(value => {
          form.append('fileData', value)
        })

      upload_ddl(form).then(res=>{
        console.log(res.data)
        res.data.forEach(e=>{

           e.name = e.name.split('.')[0]


        })
        this.ddls =  [...this.ddls,...res.data]
        e.target.value = ''
      })
    },
    showUpload(){
      this.$refs['inputs'].click()
    },
    deleteDataType(id, url, apiname, data) {
      this.$confirm('删除后将无法恢复，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await url({ id })
        if (res.code === 100) {
          this.getDlabelSysRoleList()
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
    // 编辑
    confirmEdit(row) {
      this.title = '编辑分类'
      this.isedit = true
      this.isdialog = true
      this.ruleForm = {
        name: row.name,
        languageId: row.languageId,
        id: row.id
      }
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    editTypeDelete(id) {
      this.deleteDataType(id, templatetypeDelete, templatetypeList, this.listQuery)
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
        tempData.push({ id: this.roleoptions[i].id, sequence: i })
      }
      templatetypeSort({ json: JSON.stringify(tempData) })
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
    addDataType() {

      this.addListDataType('ruleForm', templatetypeInsert, templatetypeUpdate, this.isedit, templatetypeList)
    },
    addDDLs(){
      templatesystemInserts({json:JSON.stringify(this.ddls),templateTypeId: this.listQuery.templateTypeId}).then(res=>{
        if(res.code==100){
          this.openAddTemp = false
          this.getListData(Object.assign({ pageNo: this.currentpage, pageSize: this.pagesize }, this.listQuery), templateList)
          this.$message({
              showClose: true,
              message: '新增数据成功',
              type: 'success'
            })
        }
      })
    },
    async addListDataType(formName, url, editurl, status, apiname, queryData, name) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const apiurl = status ? editurl : url
          const res = await apiurl(this.ruleForm)
          if (res.code === 100) {
            this.isdialog = false
            this.getDlabelSysRoleList()
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
      this.title = '新增分类'
      this.isedit = false
      this.ruleForm = {
        name: '',
        languageId: 1
      }
      this.isdialog = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    // 添加模板管理
    buidNew() {
      this.ddls=[]
      this.openAddTemp = true
      // this.$router.push('/material/templateAdminEdit')
    },
    // 编辑模板管理
    editBack(id) {
      localStorage.setItem('openHistory',JSON.stringify(this.listQuery))
      this.$router.push({
        path: '/material/templateAdminEdit',
        query: {
          id
        }
      })

    },
    // 查询角色名称
    async getDlabelSysRoleList() {
      const res = await templatetypeAllList()
      if (res.code === 100) {
        res.data.unshift({
          id: '',
          name: '全部',
          languageId: ''
        })
        this.roleoptions = res.data
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    searchTemp() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.listQuery.pageSize = 10
      this.getListData(this.listQuery,
        templateList
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
      this.listQuery.templateTypeId = val
      this.searchTemp()
    },
    editDelete(id) {
      this.deleteData(id, templateDelete, templateList, this.listQuery)
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
  display: inline-block;
}

</style>
