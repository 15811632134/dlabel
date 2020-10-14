<template>
  <div class="feedback">
    <div class="echarts-time m_clearLR"  v-if="permissionData.indexOf('user_manage_feedback_select_executable')!=-1">
      <div class="m_clearLR m_floatL topsearch">
        <!-- <div class="selectPartner m_floatL">
          <label>渠道：</label>
          <el-select v-model="listQuery.equip" @change="getList" class="filter-item" placeholder="请选择">
            <el-option v-for="(item) in equips" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div> -->
        <div class="selectPartner m_floatL" >
          <label>操作人：</label>
          <el-select v-model="listQuery.operateId" @change="getList" class="filter-item" placeholder="请选择">
            <el-option v-for="(item) in handlers" :key="item.id" :label="item.account" :value="item.id"   />
          </el-select>
        </div>
        <div class="selectPartner m_floatR" style="margin-left:47px">
          <label>操作类型：</label>
          <el-select v-model="listQuery.operateType" @change="getList" class="filter-item" placeholder="请选择">
            <el-option v-for="(item) in opStatus" :key="item.id" :label="item.name" :value="item.id"  />
          </el-select>
        </div>

      </div>

      <div class="m_clearLR">




      <!-- <div class="filter-container m_floatR">
        <div class="search m_search">
          <el-input
            v-model="listQuery.keyword"
            placeholder="搜索相关关键字"
            class="input-with-select"
             maxlength="20"
            @keyup.native.enter="getList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getList" />
          </el-input>
        </div>
      </div> -->
      <div class="echarts-date m_floatR">
        操作时间：
        <el-date-picker
            v-model="selectDate2"
            @change="getList"
            align="center"
            :picker-options="pickerOptionsBack"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        <em class="iconfont iconrilix" />
      </div>
      </div>

    </div>
    <div class="buildFeed " style="margin-top:32px;"   >

        <div @click="handleDownload" style="line-height:24px;">
        <div class="exportAdd m_clearLR">
          <div class="m_floatL"><i class="iconfont icondaochu" /></div>
          <div class="m_floatL" style="margin-left:16px;">导出</div>
        </div>
        </div>
      </div>

    <!-- <div class="export " @click="handleDownload">
        <i class="iconfont iconxiazai" />导出
      </div> -->
  <div style="margin-left:40px;margin-right:40px;">
  <el-table
      ref="singleTable"
      :data="tableList"
      highlight-current-row
      style="width: 100%"
      class="table"
    >
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column property="fontsCategory" label="角色">
        <template slot-scope="{row}">
          <span>{{ row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column property="fontsCategory" label="操作人">
        <template slot-scope="{row}">
          <span>{{ row.operate }}</span>
        </template>
      </el-table-column>
      <el-table-column property="fontsCategory" label="操作时间">
        <template slot-scope="{row}">
          <span>{{ row.operateTime|formatDate('') }}</span>
        </template>
      </el-table-column>
      <el-table-column property="fontsCategory" label="操作模块">
        <template slot-scope="{row}">
          <span>{{ row.model }}</span>
        </template>
      </el-table-column>
      <el-table-column property="fontsCategory" label="操作类型">
        <template slot-scope="{row}">
          <span>{{ row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column property="fontsCategory" label="详情"  width="400">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>

    </el-table>
    </div>
    <div  class="pagination-container" style="margin-left:40px">
      <el-pagination
        v-show="totalnumber>0"
        :current-page.sync="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"

        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange($event, listQuery)"
        @current-change="handleCurrentChange($event, listQuery)"
      />
    </div>
     <el-dialog  :close-on-click-modal='false' :visible.sync="showDialogBack" class="dialog" :title="textMap[dialogStatus]" width="500px">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :modal-append-to-body="false"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="平台："  class="version">
          <div>
            <el-radio v-model="ruleForm.equip" label="1">Android</el-radio>
            <el-radio v-model="ruleForm.equip" label="2">IOS</el-radio>
            <el-radio v-model="ruleForm.equip" label="3">PC</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="版本号：" prop="version" class="version">
          <el-input
            v-model="ruleForm.version"
            type="text"
            maxlength="50"
            placeholder="请输入版本号"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="问题类型：" >
          <el-select
            filterable
            v-model="ruleForm.type"
            placeholder="请选择SDK"
          >
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式：" prop="version" class="version">
          <el-input
            v-model="ruleForm.phone"
            type="text"
            maxlength="50"
            placeholder="请输入版本号"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="反馈内容：" prop="tips" class="version">

          <div class="remarks">
            <el-input
              v-model="ruleForm.description"
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              maxlength="20"
            />
            <span>{{ ruleForm.description.length }}/20</span>
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="showDialogBack=false">取消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()" >确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="isEnlarge" :modal-append-to-body="false" :show-close="false" :width="widthauto" title class="imgdialog">
      <img :src="imgPath" class="magnifier" @load="onLoad">
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {sysoperatelog_list,feedbacklog_insert,feedbacklog_list,feedback_insert,feedback_list,feedbacklog_export_list,handler_list,feedback_reply,feedback_reply_list } from "@/api/api";
import moment from 'moment'
export default {
  filters: {
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    ...mapGetters([
      'permissionData'
    ]),
    getStatus(){
      return function(index){
        var name = ''
        for(var i = 0 ; i < this.status.length ; i ++){
          if(this.status[i].id==index){
            name = this.status[i].name
          }
        }
        return name
      }
    },
    equips() {
      return [{id:'',name:'全部'},{id:'1',name:'Android端'},{id:'2',name:'IOS端'},{id:'3',name:'PC端'},{id:'4',name:'Web端'}];
    },
    feedTypes() {
      return [{id:'',name:'全部'},{id:'1',name:'使用建议'},{id:'2',name:'发现BUG'},{id:'3',name:'想要的功能'},{id:'4',name:'其他问题'}];
    },
  },
  data() {
    return {
      backIndex:0,

      lookData:{},
      dialogStatus:'create',
      textMap: {
        update: "编辑",
        create: "添加"
      },
      currentpage:1,
      selectDate2:[],
      pickerOptionsBack: {
        disabledDate(time) {
          return time.getTime() >= Date.now()  || time.getTime()<= Date.now() - (24 * 60 * 60 * 1000*365)
        }
      },
      totalnumber:0,
      currentStatu:0,
      msgings:[
        {id:0,name:'您好，已收到您的反馈，您反馈的问题我们已经列入更新计划中，在未来更新...'},
        {id:1,name:'您好，您反馈的打印问题可以先和您的打印机厂家或客服联系，确保您的打印...'},
        {id:2,name:'您好，您反馈的搜索不到打印机蓝牙问题我们已收到，再确认手机蓝牙是否已...'},
        {id:3,name:'您好，您反馈的以前编辑的模板更新软件后再打开内容有错位问题我们已收到...'}],

      msgingsNew:[{id:0,name:'您好，已收到您的反馈，您反馈的问题我们已经列入更新计划中，在未来更新的版本中将会进行修改。'},
      {id:1,name:'您好，您反馈的打印问题可以先和您的打印机厂家或客服联系，确保您的打印机安装正常并能正确打印出测试页再使用本软件打印。'},
      {id:2,name:'您好，您反馈的搜索不到打印机蓝牙问题我们已收到，再确认手机蓝牙是否已打开，如已打开蓝牙，请在我们的打印软件中搜索蓝牙，不要在系统设置中搜索哦。'},
      {id:3,name:'您好，您反馈的以前编辑的模板更新软件后再打开内容有错位问题我们已收到，这个情况是因为模板是由早期的软件版本创建的，当时的模板保存方式与现在有些差异，你需要用新版本的软件打开模板逐个调整好内容后再重新保存一次就可以解决了。'}],
      types:[{id:1,name:'使用建议 '},{id:2,name:'发现BUG'},{id:3,name:'想要的功能'},{id:4,name:'其他问题'}],

      opStatus:[{id:'',name:'全部 '},{id:1,name:'添加 '},{id:2,name:'编辑'},{id:3,name:'删除'},{id:4,name:'批量删除'},{id:5,name:'批量添加'},
      {id:6,name:'批量修改'},{id:7,name:'重置密码'},{id:8,name:'拒绝'},{id:9,name:'通过'}],
      // opStatus:[{id:'',name:'全部 '},{id:1,name:'待处理 '},{id:2,name:'待评估'},{id:3,name:'待开发'},{id:4,name:'已完结'},{id:5,name:'已拒绝'}],
      ruleForm:{
        equip:"1",
        phone:'',
        type:1,
        version:'',
        description:'',
      },
      description:'',
      selectExcelData:[],
      exportData:[],
      backDesc:'',
      operateId:'',
      showDialogBack:false,
      statusData:[],
      listQuery: {
        operateType:'',
        startTime: "",
        endTime: "",
        operateId:'',
        pageNo: 1,
        pageSize: 10
      },
      seeInfoData:[],
      tableList:[],
      feedTypeArr:['使用建议','发现BUG','想要的功能','其他问题'],
      equipArr:['全部','Android端','IOS端','PC端','Web端'],
      handlers:[],
      cuurentId:'',
      msging:''
    }
  },
  created() {
    handler_list().then(res=>{
      this.handlers = res.data
      this.handlers.splice(0,0,{id:'',account:'全部'})
    })
    this.listapi = sysoperatelog_list
    this.selectDate2 = [''+moment(new Date()).subtract(7,'day').format('YYYY-MM-DD')+'',''+moment(new Date()).subtract(0,'day').format('YYYY-MM-DD')+''];
    this.getList()
  },
  methods:{
    changeStatus(index){
      if(this.statusData.enable){

        this.statusData.status = index+1
      }
    },
    msgChange(){
      this.description = this.msgingsNew[this.msging].name
    },
    msgInsert(){
      feedback_reply({feedbackId:this.cuurentId ,description:this.description}).then(res=>{
        this.$message.success('回复成功')

        this.getList()
        this.seeInfo(this.cuurentId)
      })
    },
    logInsert(){
      feedbacklog_insert({
        feedbackId:this.cuurentId,
        handler:this.handler,
        status:this.statusData.status,
        desc:this.backDesc
      }).then(res=>{
        this.$message.success('操作成功')
         this.getList()
        this.changeOp(this.cuurentId)
      })
    },
    resetLook(){
      // this.lookData = this.lookData
      this.backIndex = 0
    },
    changeLook(item){
      this.lookData = item
      this.backIndex = 0
    },
    seeInfo(item){
       this.cuurentId = item.id
      this.backIndex = 1
      feedback_reply_list({feedbackId:item.id}).then(res=>{
        this.seeInfoData = res.data
      })
    },
    resetTemp(){
      this.ruleForm= {
        equip:1,
        phone:'',
        type:1,
        version:'',
        description:'',
      }
    },
    openAdd() {

      this.resetTemp()
      this.dialogStatus = 'create'
      this.showDialogBack = true
      this.$nextTick(() => {
        this.$refs["ruleForm"].clearValidate();
      });
    },
    createData() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {

          feedback_insert(this.ruleForm).then(res=>{
            this.showDialogBack = false
            this.getList()
            this.$message.success('添加成功')
          })
        }
      })
    },
    testHF(id){
      feedback_reply({feedbackId:id,description:'zzmtest'}).then(res=>{
         feedback_reply_list({feedbackId:id})
      })

    },changeOp(id){
      this.backIndex = 2
      this.cuurentId = id
      feedbacklog_list({feedbackId:id}).then(res=>{
        this.statusData = res.data
      })

    },
    handleDownload() {
      if (this.selectExcelData.length <= 0) {
        const h = this.$createElement;
        this.$msgbox({
          title: "消息",
          message: h("p", null, [h("span", null, "您确定要导出所有数据吗")]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "执行中...";
              done();
              if(this.exportData.length<=0){
                var temp = {'role':'','operate':''
                ,'operateTime':'','model':'','type':'','description':''}
                // this.selectExcelData.push(temp)
                this.exportData.push(temp)
              }
              this.selectExcelData = this.exportData;
              this.handleDownload();
            } else {
              done();
            }
            instance.confirmButtonLoading = false;
            console.log(done);
          }
        }).then(action => {});
        return;
      }
      for(let i = 0 ; i < this.selectExcelData.length ; i ++){
        if(this.selectExcelData[i].id){
          this.selectExcelData[i].operateTime = moment(this.selectExcelData[i].operateTime).format('YYYY-MM-DD HH:mm:ss')
        }
      }

      // this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ['角色',"操作人",'操作时间','操作模块',"操作类型",'详情'];
        const filterVal = ['role','operate',"operateTime",'model','type','description'];
        console.log(this.selectExcelData);
        const data = this.formatJson(filterVal, this.selectExcelData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "template-list"
        });
        this.selectExcelData = []
        // this.downloadLoading = false;
      });

    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getList(){
      this.currentpage = 1
      this.listQuery.pageNo = 1
      if(this.selectDate2.length>0){
        this.listQuery.startTime = this.selectDate2[0]
        this.listQuery.endTime = this.selectDate2[1]
      }
      sysoperatelog_list(this.listQuery).then(res=>{

        this.lookData = res.data.list.length>0?res.data.list[0]:[]
        this.tableList = res.data.list
        this.totalnumber = res.data.total
      })
      var tempData = {}
      tempData.operateType = this.listQuery.operateType
      tempData.startTime = this.listQuery.startTime
      tempData.endTime = this.listQuery.endTime
      tempData.operateId = this.listQuery.operateId
      sysoperatelog_list(tempData).then(res=>{
        this.exportData = res.data.list
      })
    },

  }
};
</script>

<style scoped lang="scss">
.remarks {
  width: 300px;
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
/deep/.el-dialog{
  .el-input__inner,.el-input--medium{
    width:300px;
  }
}
.buildFeed {
  display: flex;
  align-items: center;
  color: #2274e5;
  cursor: pointer;
  margin-bottom: 24px;

  .exportAdd {
    display: flex;
    display: inline-block;
    margin-left:50px;
    height: 24px;
    margin-top:14px;
    margin-right: 12px;
    text-align: center;
    // background: #2274e5;
    border-radius: 4px;
    font-size: 18px;
     i {
      font-size: 22px;
  }


  }
  .add {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 16px;
    line-height: 24px;
    text-align: center;
    background: #2274e5;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;

    i {
      font-size: 18px;
      margin: 3px 0;
    }
  }
}
.echarts-time {
  margin: 0px 40px;
  display: block;
  overflow: hidden;
// @media screen and (min-width: 320px) and (max-width: 1556px){
//   .m_feedback{
//     float: left;
//   }
// }
@media screen and (min-width: 320px) and (max-height:1500px){
      .m_feedback{
        float:left;
      }
  }
  @media screen and (min-width: 1501px){
      .m_feedback{
        float:right;
      }
  }

  &>div{
    margin-top:32px;
  }
}
.backContent{
  display: flex;
  .left{
    border:1px solid #ccc;
    width: 960px;
    margin-left:40px;
  }
  .right{
    width:584px;
    padding:24px 32px;
    margin-left:32px;
    border:1px solid #ccc;
    .msging_box{
      margin-top:500px;
font-size:14px;
font-family:PingFangSC-Medium,PingFang SC;
font-weight:500;
color:rgba(102,102,102,1);
      .selectInput{
        margin-top:9px;
        /deep/.el-input__inner,/deep/.el-input--medium{
          width:500px;
        }
      }
      .remarks{
        width:500px;
        margin-top:16px;
      }
    }
    .backStatu{
      margin-top:24px;
      display: flex;
      /deep/.el-input__inner,/deep/.el-input--medium{
          width:460px;
        }
      .title{
        width:58px;
        text-align: right;
        margin-top:5px;
        padding-right:16px;
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(102,102,102,1);
        line-height:20px;
      }
    }
    .submitBack{
      margin-top:16px;
      float: right;
    }
    .remarks_box{

      .remarks{
        width:460px;
      }
      margin-top:24px;
       display: flex;
      .title{
        width:58px;
        text-align: right;
        padding-right:16px;
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(102,102,102,1);
        line-height:20px;
      }
    }
    .status{
      display: flex;
      margin-top:500px;

      .item{
         cursor: pointer;
        width:86px;
        text-align: center;
        line-height: 32px;
        margin-left: 24px;
        height:32px;
        border-radius:100px;
        border:1px solid rgba(195,195,195,1);
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(102,102,102,1);
        &.active{
          border:1px solid rgba(34,116,229,1);
          color:rgba(34,116,229,1);
        }
      }

      .title{
        margin-top:5px;
        width:46px;
        text-align: right;
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(102,102,102,1);
        line-height:20px;
      }
    }
    .fdTextBox{
      margin-left:88px;
      .tDiv_img {
        margin-bottom: 32px;
        margin-top: 16px;
        position: relative;

        .edit{
          position: absolute;
          top: 0;
          left: 0;
          text-align: center;
          width: 100px;
          height: 100px;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          opacity: 0;
        }
        & > .tDiv_imgDiv{
          margin-right: 15px;
          margin-top:17px;
          position: relative;
          width:100px;
          height:100px;
        }
        & > .tDiv_imgDiv:hover .edit{
          opacity: 1;
        }
        img {
          width: 100px;
          height: 100px;
          margin-right: 32px;
        }
      }
    }
    .look_box{
      .look_div{
        .content{
          margin-top:57px;
          .item{
            margin-bottom: 23px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:22px;
            .backInfo{
              width:388px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
            }
          }
        }
        .top{
          margin-top:32px;
          .name{
            height:22px;
            font-size:16px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(60,60,60,1);
            line-height:22px;
          }
          .phone{
            margin-top:4px;
            height:22px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:22px;
          }
          .date{
            height:22px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:22px;
          }
          img{
            margin-right: 32px;
            width:48px;
            height:48px;
            border-radius: 24px;
          }
        }
      }
    }
    .op_box{
      margin-top:32px;
      .op_div{
        margin-bottom: 32px;
        .top{
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:17px;
        }
        .footer{
          margin-top:9px;
          height:20px;
          font-size:14px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:20px;
        }
      }
    }
    .msg_box{
      .msg_div{
        .msg_top{
          justify-content: flex-end;
          display: flex;
          margin-top:32px;

          .msg{
            color:#fff;
            width:392px;


            padding:16px 24px;
            background:rgba(34,116,229,1);
            border-radius:32px 0px 32px 32px;
            border:1px solid rgba(245,245,245,1);
          }
          .img{
            color:#fff;
            margin-left:16px;
            width:48px;
            height:48px;
            background:rgba(34,116,229,1);
            opacity:0.3;
            text-align: center;
            border-radius: 24px;
            line-height: 48px;
          }
        }
        .msg_date{
          margin-top:8px;
          text-align: right;
          padding-right: 70px;


          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);

        }
      }

      .msg_top2{
          justify-content: start;
          display: flex;
          margin-top:32px;

          .msg2{
            width:392px;
            height:75px;
            padding:16px 24px;
            border-radius:32px 0px 32px 32px;
          }
          .img2{
            color:#fff;
            margin-left:16px;
            width:48px;
            margin-top:12px;
            height:48px;
            background:rgba(34,116,229,1);
            opacity:0.3;
            text-align: center;
            border-radius: 24px;
            line-height: 48px;
          }
        }
        .msg_date2{
          margin-top:8px;
          padding-left: 70px;


          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);

        }
    }
  }
}
.feedback {
  background-color: #fafafc;
  .topsearch{
    width:58%;
    /deep/.el-input{
      width:100%;
    }
  }
  .export{
        border: 1px solid #2274e5;
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    color: #2274e5;
    border-radius: 4px;
    padding-right: 22px;
    cursor: pointer;
    margin-top:3px;
    margin-left:10px;
    i{
      padding: 0 9px 0 22px;
    }
  }
  label{
    width:48px;
    height:22px;
    font-size:16px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(60,60,60,1);
    line-height:22px;
  }
  .fdBox {
    position: relative;
    background-color: #fff;
    margin: 0px 40px;

    padding: 32px 32px;
    .oper{
      top:139px;
      right: 32px;
       cursor: pointer;
      line-height: 48px;
      text-align: center;
      position: absolute;
      width:48px;
      height:48px;
      background:rgba(34,116,229,1);
      opacity:0.3;
      font-size:24px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      border-radius: 24px;
    }
    .btn_box{
      top:39px;
      right: 32px;
      display: flex;
      position: absolute;
      .op{
        cursor: pointer;
        width:80px;
        height:32px;
        background:rgba(34,116,229,1);
        border-radius:4px;
        text-align: center;
        line-height: 32px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
      .look{
         cursor: pointer;
        margin-left:16px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(34,116,229,1);
        width:80px;
        height:32px;
        text-align: center;
        line-height: 32px;
        border-radius:4px;
        border:1px solid rgba(34,116,229,1);
      }
    }
    .fdItem{
    border-bottom: 1px dotted #e5e5e5;
    display: flex;
    .fbImg {
      margin-right: 24px;
      img {
        width: 48px;
        border-radius: 24px;
        height: 48px;
      }
    }
    .fdTextDate {
      margin-top:8px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
    .callBackInfo{
      width:700px;
      margin-top:16px;
      padding:16px;
      margin-left:16px;
      margin-bottom: 40px;
      position: relative;
      .info{
        width:85%;
      }
      .toInfo{
        cursor: pointer;
        color:#2274e5;
        position: absolute;
        right: 0px;
        top:30px;

    }
    }
    .fdTextBox {
      flex: 1;
      .tDiv_01 {
        & > span:nth-child(1) {
          width:80px;
          height:22px;
          font-size:16px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(60,60,60,1);
          line-height:22px;
        }
        & > span:nth-child(2) {
          width: 89px;
          height: 20px;
          margin-left: 24px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
        }
        & > span:nth-child(3) {
          margin-left: 32px;
          width: 24px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
        }
        & > span:nth-child(4) {
          width: 86px;
          margin-left: 8px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(34, 116, 229, 1);
          line-height: 17px;
        }
      }
      .tDiv_02 {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 17px;
        margin-top: 7px;
        & > span:nth-child(2) {
          margin-left: 69px;
          margin-right: 69px;
        }
      }
      .tDiv_03 {
        margin-top: 24px;
        & > span:nth-child(1) {
          width: 70px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
        }
        & > span:nth-child(2) {
          width: 92px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(34, 116, 229, 1);
          line-height: 20px;
        }
      }
      .tDiv_04_status{
         span{
           color:#666;
         }
         span.active {
           color:#FF0000;
         }
        }
      .tDiv_04 {
        margin-top: 8px;

        & > span:nth-child(1) {
          width: 70px;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
        }
        & > span:nth-child(2) {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
        }

        & > div:nth-child(1) {
          width: 70px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
        }
        & > div:nth-child(2) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
        }
      }
      .tDiv_img {
        margin-bottom: 32px;
        margin-top: 16px;
        position: relative;

        .edit{
          position: absolute;
          top: 0;
          left: 0;
          text-align: center;
          width: 100px;
          height: 100px;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          opacity: 0;
        }
        & > .tDiv_imgDiv{
          margin-right: 15px;
          position: relative;
          width:100px;
          height:100px;
        }
        & > .tDiv_imgDiv:hover .edit{
          opacity: 1;
        }
        img {
          width: 100px;
          height: 100px;
          margin-right: 32px;
        }
      }
    }
    }
  }
}
</style>
