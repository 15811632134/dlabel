<template>
  <div class="feedback">
    <div class="nav-wrap">
      <div class="buildFeed">
        <div class="add-wrap" @click="openAdd()">
        <span class="add"><i class="el-icon-plus" /></span>
          新增
        </div>
        <div class="configuration listSet"><div @click="openScreenShow"><i class="iconfont iconshezhibeifen"  />配置</div>
        <el-dialog :visible.sync="screenShow" :modal="false" title="选择显示的列表" width="240px">
                  <div class="hightSelect_box m_clearLR">
                    <div class="checkItem">
                      <el-checkbox v-model="allCheck" @change="allselect">全选</el-checkbox>
                    </div>
                    <transition-group tag="div" class="container m_clearLR">
                      <div
                        v-for="(item,index) in proList"
                        :key="index"
                        class="checkItem"
                        draggable="true"
                        @dragstart="handleDragStart($event, item)"
                        @dragover.prevent="handleDragOver($event, item)"
                        @dragenter="handleDragEnter($event, item)"
                        @dragend="handleDragEnd($event, item)"
                      >
                        <div>
                          <el-checkbox v-model="item.flag">{{ item.name }}</el-checkbox>
                          <div class="sorts">
                            <i class="iconfont iconpaixu1" />
                          </div>
                        </div>
                      </div>
                    </transition-group>

                    <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="setIndex = -1">取 消</el-button>
                <el-button type="primary" @click="comfirmShows">确 定</el-button>
                    </span>-->
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="comfirmShows">确 定</el-button>
                  </span>
                </el-dialog>
        </div>
        <div class="export-excel" @click="handleDownload"><i class="iconfont icondaochu" />导出</div>
      </div>
      <div class="search-wrap" v-if="permissionData.indexOf('user_manage_feedback_select_executable')!=-1">
        <el-input v-model="listQuery.keyword" @keyup.native.enter="getList" clearable maxlength="100" placeholder="请输入手机号/反馈内容关键词" />
        <button class="search-btn" @click="getList"><i class="iconfont iconwenjianliebiao-chakan" /></button>
      </div>
    </div>
    <div v-if="permissionData.indexOf('user_manage_feedback_select_executable')!=-1" class="echarts-time m_clearLR">
      <div class="m_clearLR m_floatL">
        <div class="selectPartner m_floatL">
          <label>平台：</label>
          <el-select v-model="listQuery.equip" class="filter-item" placeholder="请选择" @change="getList">
            <el-option v-for="(item) in equips" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
        <div class="selectPartner m_floatL" style="margin-left:47px">
          <label>操作状态：</label>
          <el-select v-model="listQuery.status" class="filter-item" placeholder="请选择" @change="getList">
            <el-option v-for="(item) in opStatus" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
        <div class="selectPartner m_floatL" style="margin-left:47px">
          <label>处理人：</label>
          <el-select v-model="listQuery.handler" class="filter-item" placeholder="请选择" @change="getList">
            <el-option v-for="(item) in handlers" :key="item.id" :label="item.account" :value="item.id" />
          </el-select>
        </div>
      </div>
      <div class="m_floatR m_clearLR m_feedback">
        <div class="echarts-date m_floatR">
          <el-date-picker
            v-model="selectDate2"
            :picker-options="pickerOptionsBack"
            align="center"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getList"
          />
          <em class="iconfont iconrilix" />
        </div>
      </div>
    </div>
    <!-- 左侧表格 -->
    <div v-if="permissionData.indexOf('user_manage_feedback_detail_executable')!=-1">
      <div class="backContent">
        <div class="left">
          <!-- 2020.9.1更新界面 -->
          <el-table
            ref="singleTable"
            :data="tableList"
            highlight-current-row
             @row-click="rowClick"
            style="width: 100%"
            height="666"
            class="table"
          >

          <el-table-column type="index" label="序号" width="80" />
          <el-table-column
            v-if="item.flag"
            v-for="(item,index) in proList"
            :key="index"
            :label="item.name"
            property="framePath"
            align="center"
            :width="item.attribute=='equip'||item.attribute=='currentHandlers'||item.attribute=='currentStatuss'?'80px':'auto'"
            show-overflow-tooltip
          >
            <template slot-scope="{row}">
              <div
                class="item textLine"
                v-if="item.attribute=='createTime'"
              >{{ row[item.attribute]|formatDateTime() }}</div>
              <div
                class="item textLine"
                v-else-if="item.attribute=='equip'"
              >{{row[item.attribute]==1?'安卓':row[item.attribute]==3?'PC端':row[item.attribute]==2?'IOS端':'官网' }}</div>

              <div class="item textLine" v-else>{{ row[item.attribute]?row[item.attribute]:'--' }}</div>
            </template>
          </el-table-column>
            <!-- <el-table-column type="index" label="序号" width="60" />
            <el-table-column property="phone" label="联系方式" show-overflow-tooltip />
            <el-table-column property="nickName" label="反馈平台" show-overflow-tooltip>
              <template slot-scope="{row}">
                <span :class="{ 'is-red': row.currentStatuss === '待处理' }">{{ row.currentStatuss }}</span>
              </template>
            </el-table-column>
            <el-table-column property="description" label="反馈内容" show-overflow-tooltip width="180" align="left" />
            <el-table-column property="addTime" label="反馈时间" show-overflow-tooltip width="160">
              <template slot-scope="{row}">
                <span>{{ row.createTime | formatDateTime('') }}</span>
              </template>
            </el-table-column>
            <el-table-column property="currentStatuss" label="处理状态" show-overflow-tooltip>
              <template slot-scope="{row}">
                <span :class="{ 'is-red': row.currentStatuss === '待处理' }">{{ row.currentStatuss }}</span>
              </template>
            </el-table-column>
            <el-table-column property="currentHandlers" label="处理人" show-overflow-tooltip>
              <template slot-scope="{row}">
                {{ row.currentHandlers || '空' }}
              </template>
            </el-table-column> -->
            <el-table-column property="address" label="操作" width="180">
              <template slot-scope="scoped">
                <el-tooltip class="item" effect="dark" content="操作" placement="top">
                  <i class="iconfont iconcaozuo operation-icon" @click.stop="changeOp(scoped.row.id, scoped.$index)" />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="查看" placement="top">
                  <i
                    v-if="permissionData.indexOf('user_manage_feedback_detail_executable')!=-1"
                    class="iconfont iconchakanxiangqing operation-icon"
                    @click.stop="changeLook(scoped.row, scoped.$index)"
                  />
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="回复" placement="top">
                  <i class="iconfont iconhuifu operation-icon" @click.stop="seeInfo(scoped.row, scoped.$index)" />
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

          <!-- 2020.9.1修改界面 -->
          <!-- <div v-for="(item,num) in tableList" :class="fdBoxIndex==num?'active':''" :key="item.id" class="fdBox" @click.stop="changeFdBoxIndex(item,num)">
            <div class="btn_box">
              <div class="op" @click.stop="changeOp(item.id,num)">操作</div>
              <div class="look" @click.stop="changeLook(item,num)">查看</div>
            </div>
            <div v-show="item.currentHandlers" class="oper">
              {{ item.currentHandlers&&item.currentHandlers[item.currentHandlers.length-1] }}
            </div>
            <div class="fdItem " >
              <div class="fbImg">
                <img :src="item.headImage?item.headImage:require('@/assets/img/default.png')" >
              </div>
              <div class="fdTextBox">
                <div class="tDiv_01">
                  <span>{{ item.nickName?item.nickName:'空' }}</span>
                  <span>{{ item.phone?item.phone:'空' }}</span>
                  <span>来自</span><span>{{item.equipment}}</span>
                </div>
                <div class="tDiv_02">
                  <span>所属友商：{{item.companyName}}</span>
                  <span>平台：{{ equipArr[item.equip] }}{{ item.version }}</span>
                  <span>版本号：{{item.version}}</span>
                </div>
                <div class="tDiv_03">
                  <span>意见类型：</span>
                  <span>{{ feedTypeArr[item.type-1] }}</span>
                </div>
                <div class="tDiv_04 m_dispaly">
                  <div>意见反馈：</div>
                  <div class="textLine" style="width:500px">{{ item.description }}</div>
                </div>
                <div class="fdTextDate">{{ item.createTime|formatDateTime('') }}</div>
                <div class="lookBgm">
                  <div class="tDiv_04 m_dispaly" >
                    <div style="color:#333">操作详情：</div>
                    <div style="width:500px;color:#333">{{ item.content?item.content:'空' }}</div>
                  </div>
                  <div class="tDiv_04 tDiv_04_status" >
                    <span>操作状态：</span>
                    <span :class="item.currentStatus<=3?'active':''">{{ item.currentStatus?getStatus(item.currentStatus):'空' }}</span>
                    <span style="color:#666666;margin-left:24px;">处理人：</span>
                    <span >{{ item.currentHandlers?item.currentHandlers:'空' }}</span>
                  </div>
                  <div class="callBackInfo">
                    <div :style="item.reply?'color:#666;':'color:#999'" class="info textLine">{{ item.reply?item.reply:'请点击回复' }}</div>
                    <div class="toInfo" @click.stop="seeInfo(item,num)"><i class="iconfont iconbianji"/> 回复</div>
                  </div>
                </div>
                <div class="tDiv_img m_clearLR"  v-if="item.pathList.length>0">
          <div class="m_floatL tDiv_imgDiv" v-for="(pic,index) in item.pathList" :key="index">
            <img :src="pic" alt />
            <div class="edit" @click="enlargeImage(pic)">
              <i class="iconfont iconfangdachakan"  />
            </div>
          </div>
        </div>
                <div class="testLine"/>
              </div>

            </div>
          </div> -->
        </div>

        <div v-if="backIndex == -1" class="right" />
        <!-- 回复 -->
        <div v-if="backIndex==1" class="right">
          <div>回复（{{ seeInfoData.length }}）</div>
          <div class="msg_box" v-if="seeInfoData.length>0">
            <div v-for="(item,index) in seeInfoData" :key="index" class="msg_div">
              <div>
                <div v-show="item.systemReply==1" class="msg_top">
                  <div class="msg">{{ item.description }}</div>
                  <div class="img">{{ item.nickName&&item.nickName[item.nickName.length-1] }}</div>
                </div>
                <div class="msg_date" >{{ item.createTime|formatDateTime('') }}</div>
              </div>
              <div v-show="item.systemReply==0">
                <div class="msg_top2">
                  <div class="img2">{{ item.nickName&&item.nickName[item.nickName.length-1] }}</div>
                  <div class="msg2">{{ item.description }}</div>

                </div>
                <div class="msg_date2" >{{ item.createTime|formatDateTime('') }}</div>
              </div>
            </div>
          </div>
          <div class="btnAb">
            <div class="msging_box">
              <div class="title">快速回复</div>
              <div class="selectInput">
                <el-select v-model="msging" popper-class="backFeedMsg" class="filter-item" placeholder="请选择" @change="msgChange">
                  <el-option v-for="(item) in msgings" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </div>
              <div class="remarks">
                <el-input
                  v-model="description"
                  :rows="5"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="100"
                  resize="none"
                />
                <span>{{ description.length }}/100</span>
              </div>
            </div>
            <div class="submitBack">
              <el-button @click="backIndex=-1">取消</el-button>
              <el-button type="primary" @click="msgInsert" >确定</el-button>
            </div>
          </div>
        </div>
        <!-- 操作 -->
        <div v-if="backIndex==2" class="right">
          <div>操作</div>
          <div class="op_box">
            <div v-for="(item) in statusData.opration" :key="item.id" class="op_div" >
              <div class="top">{{ item.createTime|formatDateTime('') }}</div>
              <div class="footer">{{ item.content }}</div>
            </div>
          </div>
          <div class="btnAb">
            <div v-show="statusData.enable&&statusData.tempStatus!=4" :class="!statusData.enable?'active':''" class="status">
              <div class="title" >状态</div>
              <div v-for="(item ,index) in status" :class="statusData.status==(index+1)?'active':''" :key="item.id" class="item" @click="changeStatus(index)">{{ item.name }}</div>
            </div>
            <div class="backStatu">
              <div class="title">处理人</div>
              <el-select :disabled="statusData.enable&&statusData.status==4" v-model="handler" class="filter-item" placeholder="请选择">
                <el-option v-for="(item) in selectsHandler" :key="item.id" :label="item.account" :value="item.id" />
              </el-select>
            </div>
            <div class="remarks_box">
              <div class="remarks">
                <el-input
                  v-model="backDesc"
                  :rows="5"
                  :disabled="statusData.enable&&statusData.status==4"
                  type="textarea"
                  placeholder="请输入内容"
                  maxlength="100"
                />
                <span>{{ backDesc.length }}/100</span>
              </div>
            </div>
            <div v-show="statusData.enable&&statusData.tempStatus==4" style="margin-top:16px" class="submitBack">
              <el-button @click="backIndex=-1">取消</el-button>
              <el-button type="primary" @click="logInsert" >确定</el-button>
            </div>
          </div>
        </div>
        <!-- 查看 -->
        <div v-if="backIndex==0" class="right" >
          <div v-show="tableList.length>0">
            <div>查看</div>
            <div class="look_box">
              <div class="look_div">
                <div class="top m_clearLR">
                  <div class="m_floatL">
                    <img :src="lookData.headImage ? lookData.headImage : 'static/img/logo.png'" alt="">
                  </div>
                  <div class="m_floatL">
                    <div class="name">{{ lookData.nickName || '空' }}</div>
                    <div class="phone">{{ lookData.userPhone || '空' }}</div>
                  </div>
                  <!-- <div class="m_floatR date">{{ lookData.createTime | formatDateTime('') }}</div> -->
                </div>
                <div class="user-info">
                  <div class="regdate">
                    <span>注册时间：</span>
                    <span>{{ lookData.registerTime ? formatDate(lookData.registerTime) : '空' }}</span>
                  </div>
                  <div class="their">
                    <span>所属友商：</span>
                    <span>{{ lookData.companyName || '空' }}</span>
                  </div>
                </div>
                <div class="content">
                  <div class="item">
                    <span>设备：</span>
                    <span style="margin-left:16px;">{{ lookData.equipment || '空' }}</span>
                  </div>
                  <div class="item">
                    <span>平台：</span>
                    <span style="margin-left:16px;">{{ equipArr[lookData.equip] }}</span>
                  </div>
                  <div class="item">
                    <span>版本号：</span>
                    <span style="margin-left:16px;">{{ lookData.version }}</span>
                  </div>
                  <div class="item">
                    <span>反馈时间：</span>
                    <span style="margin-left:16px;">{{ lookData.createTime | formatDateTime('') }}</span>
                  </div>
                  <div class="item">
                    <span>联系方式：</span>
                    <span style="margin-left:16px;">{{ lookData.phone || '空' }}</span>
                  </div>
                  <div class="item">
                    <span>打印机型号：</span>
                    <span style="margin-left:16px;">{{ lookData.printModel || '空' }}</span>
                  </div>
                  <div class="item">
                    <span>问题类型：</span>
                    <span style="margin-left:16px;">{{ feedTypeArr[lookData.type-1] }}</span>
                  </div>
                  <div class="item feedback-info">
                    <div>反馈内容：</div>
                    <div style="margin-left:16px;word-break: break-all;" class="backInfo">{{ lookData.description }}</div>
                  </div>
                </div>
                <div class="fdTextBox">
                  <div class="tDiv_img m_clearLR">
                    <div v-for="(pic,index) in lookData.pathList" :key="index" class="m_floatL tDiv_imgDiv">
                      <img :src="pic" alt >
                      <div class="edit" @click="enlargeImage(pic)">
                        <i class="iconfont iconfangdachakan" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div class="pagination-container" style="margin-left:40px">
        <el-pagination
          v-show="totalnumber > 0"
          :current-page.sync="listQuery.pageNo"
          :page-sizes="[10, 30, 50]"
          :page-size="listQuery.pageSize"

          :total="totalnumber"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange($event, listQuery)"
          @current-change="handleCurrentChange($event, listQuery)"
        />
      </div>
    </div>

    <!-- 新增、编辑反馈 -->
    <el-dialog :close-on-click-modal="false" :visible.sync="showDialogBack" :title="textMap[dialogStatus]" class="dialog" width="500px">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :modal-append-to-body="false"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="平台：" class="version">
          <div>
            <el-radio v-model="ruleForm.equip" label="1">Android</el-radio>
            <el-radio v-model="ruleForm.equip" style="margin-left:60px;" label="2">IOS</el-radio>
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
            v-model="ruleForm.type"
            filterable
            placeholder="请选择问题类型"
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
            maxlength="11"
            placeholder="请输入联系方式"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="反馈内容：" prop="tips" class="version">

          <div class="remarks">
            <el-input
              v-model="ruleForm.description"
              :rows="5"
              type="textarea"
              placeholder="请输入反馈内容"
              maxlength="100"
            />
            <span>{{ ruleForm.description.length }}/100</span>
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="showDialogBack=false">取消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()" >确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 图片放大 -->
    <el-dialog :visible.sync="isEnlarge" :modal-append-to-body="false" :show-close="false" :width="widthauto" title class="imgdialog">
      <img :src="imgPath" class="magnifier" @load="onLoad">
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {getFeedFields,savefeedFields, feedbackNewList, feedbacklog_insert, feedbacklog_list, feedback_insert, feedback_list, feedbacklog_export_list, handler_list, feedback_reply, feedback_reply_list } from '@/api/api'
import moment from 'moment'
export default {
  filters: {

    formatDateTime(time) {
      if (!time) {
        return '';
      }
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  computed: {
    ...mapGetters([
      'permissionData'
    ]),
    getStatus() {
      return function(index) {
        var name = ''
        for (var i = 0; i < this.status.length; i++) {
          if (this.status[i].id == index) {
            name = this.status[i].name
          }
        }
        return name
      }
    },
    equips() {
      return [{ id: '', name: '全部' }, { id: '1', name: 'Android端' }, { id: '2', name: 'IOS端' }, { id: '3', name: 'PC端' }, { id: '4', name: '官网' }]
    },
    feedTypes() {
      return [{ id: '', name: '全部' }, { id: '1', name: '使用建议' }, { id: '2', name: '发现BUG' }, { id: '3', name: '想要的功能' }, { id: '4', name: '其他问题' }]
    }
  },
  data() {
    return {
      backIndex: -1,
      lookData: {},
      proList:[],
      fdBoxIndex: 0,
      selectIndex:0,
      dialogStatus: 'create',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      currentpage: 1,
      selectDate2: [],
      pickerOptionsBack: {
        disabledDate(time) {
          return time.getTime() >= Date.now()
        },
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      totalnumber: 0,
      currentStatu: 0,
      msgings: [{ id: 0, name: '您好，已收到您的反馈，您反馈的问题我们已经列入更新计划中，在未来更新的版本中将会进行修改。' },
        { id: 1, name: '您好，您反馈的打印问题可以先和您的打印机厂家或客服联系，确保您的打印机安装正常并能正确打印出测试页再使用本软件打印。' },
        { id: 2, name: '您好，您反馈的搜索不到打印机蓝牙问题我们已收到，再确认手机蓝牙是否已打开，如已打开蓝牙，请在我们的打印软件中搜索蓝牙，不要在系统设置中搜索哦。' },
        { id: 3, name: '您好，您反馈的以前编辑的模板更新软件后再打开内容有错位问题我们已收到，这个情况是因为模板是由早期的软件版本创建的，当时的模板保存方式与现在有些差异，你需要用新版本的软件打开模板逐个调整好内容后再重新保存一次就可以解决了。' }],
      types: [{ id: 1, name: '使用建议 ' }, { id: 2, name: '发现BUG' }, { id: 3, name: '想要的功能' }, { id: 4, name: '其他问题' }],
      status: [{ id: 1, name: '待处理 ' }, { id: 2, name: '待评估' }, { id: 3, name: '待开发' }, { id: 4, name: '已完结' }, { id: 5, name: '已拒绝' }],
      opStatus: [{ id: '', name: '全部 ' }, { id: 1, name: '待处理 ' }, { id: 2, name: '待评估' }, { id: 3, name: '待开发' }, { id: 4, name: '已完结' }, { id: 5, name: '已拒绝' }],
      ruleForm: {
        equip: '1',
        phone: '',
        type: 1,
        version: '',
        description: ''
      },
      description: '',
      selectExcelData: [],
      exportData: [],
      backDesc: '',
      handler: '',
      showDialogBack: false,
      screenShow:false,
      statusData: [],
      isAdd: false,
      listQuery: {
        keyword: '',
        equip: '',
        startTime: '',
        endTime: '',
        handler: '',
        status: '',
        pageNo: 1,
        pageSize: 10
      },
      allCheck: false,
      tempDataSort:[],
      seeInfoData: [],
      tableList: [],
      isFeed: true,
      feedTypeArr: ['使用建议', '发现BUG', '想要的功能', '其他问题'],
      equipArr: ['全部', 'Android端', 'IOS端', 'PC端', '官网'],
      handlers: [],
      cuurentId: '',
      selectsHandler: [],
      msging: '',
      activeIndex: -1
    }
  },
  created() {
    this.getFileds()
    handler_list().then(res => {
      this.selectsHandler = Object.assign([], res.data)
      this.handlers = res.data
      this.handler = res.data[0].id
      this.handlers.splice(0, 0, { id: '', account: '全部' })
    })
    this.listapi = feedbackNewList
    setTimeout(() => {
      this.selectDate2 = ['' + moment(new Date()).subtract(7, 'day').format('YYYY-MM-DD') + '', '' + moment(new Date()).subtract(0, 'day').format('YYYY-MM-DD') + '']
      this.getList()
    }, 0)

    // window.onscroll = e => {
    //   // console.log(document.querySelector('.backContent').offsetTop)
    //   var rights = document.querySelectorAll('.backContent .right')

    //   // var btnAb = document.querySelectorAll('.backContent .right')
    //   if (document.documentElement.scrollTop >= document.querySelector('.backContent').offsetTop + 62) {
    //     for (var i = 0; i < rights.length; i++) {
    //       rights[i].style.top = document.documentElement.scrollTop - document.querySelector('.backContent').offsetTop - 62 + 'px'
    //       // rights[i].style.top = '0px';
    //     }
    //   } else {
    //     for (let i = 0; i < rights.length; i++) {
    //       // rights[i].style.position = 'absolute';
    //       rights[i].style.top = '0px'
    //     }
    //   }
    // }
  },
  methods: {
    openScreenShow(){
      this.tempDataSort = JSON.parse(JSON.stringify(this.proList))
      this.screenShow = true
    },
    cancel() {
      this.screenShow = false;
      this.proList =  this.tempDataSort
    },
    comfirmShows() {
      const tempData = Object.assign([], this.proList);
      tempData.forEach((element, index) => {
        element.sort = index + 1;
        if (element.flag) {
          element.status = 1;
        } else {
          element.status = 0;
        }
      });
      savefeedFields({ feedFields: JSON.stringify(this.proList) }).then(res => {
        if (res.code == 100) {
          this.screenShow = false;
          this.$message.success('保存成功');
        }
      });
    },
    allselect() {
      for (let i = 0; i < this.proList.length; i++) {
        this.proList[i].flag = this.allCheck;
      }
    },
    getFileds(){
      getFeedFields().then(res => {
        console.log(res, 111111111111111111111)
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].mType = 'input';
        if (res.data[i].attribute == 'buyDate') {
          res.data[i].mType = 'date';
        }
        if (res.data[i].attribute == 'expiresDate') {
          res.data[i].mType = 'date';
        }
        if (res.data[i].status === 1) {
          res.data[i].flag = true;
          this.allCheck = true;
        } else {
          res.data[i].flag = false;
        }
      }
      // res.data.splice(0,0,{})
      this.proList = res.data;
    });
    },
    handleDragStart(e, item) {
      this.dragging = item;
    },
    handleDragEnd(e, item) {
      this.dragging = null;
    },
    // 首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      e.dataTransfer.dropEffect = 'move'; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = 'move'; // 为需要移动的元素设置dragstart事件
      if (item === this.dragging) {
        return;
      }
      const newItems = [...this.proList];
      const src = newItems.indexOf(this.dragging);
      const dst = newItems.indexOf(item);

      newItems.splice(dst, 0, ...newItems.splice(src, 1));

      this.proList = newItems;
    },
    changeFdBoxIndex(item, index) {
      this.fdBoxIndex = index
      this.changeLook(item, this.fdBoxIndex)
    },
    changeStatus(index) {
      if (this.statusData.enable) {
        this.statusData.status = index + 1
      }
    },
    msgChange() {
      this.description = this.msgings[this.msging].name
    },
    msgInsert() {
      feedback_reply({ feedbackId: this.cuurentId, description: this.description }).then(res => {
        this.$message.success('回复成功')
        this.msging = ''
        this.description = ''
        this.getList()
        this.seeInfo({ id: this.cuurentId }, this.fdBoxIndex)
      })
    },
    logInsert() {
      feedbacklog_insert({
        feedbackId: this.cuurentId,
        handler: this.handler,
        status: this.statusData.status,
        desc: this.backDesc
      }).then(res => {
        this.$message.success('操作成功')
        this.getList()
        this.changeOp(this.cuurentId, this.fdBoxIndex)
      })
    },
    resetLook() {
      // this.lookData = this.lookData
      this.backIndex = -1
    },
    changeLook(item, index) {
      this.selectIndex = 0
      this.fdBoxIndex = index
      this.lookData = item
      this.backIndex = 0
      // this.$refs.singleTable.setCurrentRow(this.tableList[index])
      this.activeIndex = index
    },
    seeInfo(item, index) {
      this.selectIndex = 2
      this.fdBoxIndex = index
      this.cuurentId = item.id
      this.backIndex = 1
      this.msging = ''
      this.description = ''
      // this.$refs.singleTable.setCurrentRow(this.tableList[index])
      this.activeIndex = index
      feedback_reply_list({ feedbackId: item.id }).then(res => {
        this.seeInfoData = res.data
        setTimeout(() => {
          document.querySelector('.msg_box').scrollTop = document.querySelector('.msg_box').scrollHeight
        }, 0);

      })
    },
    resetTemp() {
      this.ruleForm = {
        equip: '1',
        phone: '',
        type: 1,
        version: '',
        description: ''
      }
    },
    openAdd() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.showDialogBack = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    createData() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          feedback_insert(this.ruleForm).then(res => {
            this.fdBoxIndex = 0
            this.isAdd = true

            this.showDialogBack = false
            this.getList()
            this.$message.success('添加成功')
          })
        }
      })
    },
    testHF(id) {
      feedback_reply({ feedbackId: id, description: 'zzmtest' }).then(res => {
        feedback_reply_list({ feedbackId: id })
      })
    },
    changeOp(id, index) {
      this.selectIndex = 1
      this.fdBoxIndex = index
      this.backIndex = 2
      this.cuurentId = id
      this.backDesc = ''
      this.$refs.singleTable.setCurrentRow(this.tableList[index])
      this.activeIndex = index
      feedbacklog_list({ feedbackId: id }).then(res => {
        this.statusData = res.data
        this.statusData.tempStatus = this.statusData.status
        this.handler = res.data.handlerId
      })
    },
    handleDownload() {
      if (this.selectExcelData.length <= 0) {
        const h = this.$createElement
        this.$msgbox({
          title: '消息',
          message: h('p', null, [h('span', null, '您确定要导出所有数据吗')]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              done()
              if (this.exportData.length <= 0) {
                var temp = { 'companyName': '', 'currentStatuss': '', 'content': '', 'nickName': '',
                  'phone': '', 'equip': '', 'version': '', 'equipment': '',
                  'headImage': '', 'type': '', 'description': '', 'createTime': '', 'pathList': '' }
                // this.selectExcelData.push(temp)
                this.exportData.push(temp)
              }
              this.selectExcelData = this.exportData.list
              this.handleDownload()
            } else {
              done()
            }
            instance.confirmButtonLoading = false
          }
        }).then(action => {})
        .catch(() => {})
        return
      }
      // for (let i = 0; i < this.selectExcelData.length; i++) {
      //   if (this.selectExcelData[i].id) {
      //     this.selectExcelData[i].type = this.feedTypeArr[this.selectExcelData[i].type - 1]
      //     this.selectExcelData[i].equip = this.equipArr[this.selectExcelData[i].equip]
      //     this.selectExcelData[i].pathList = this.selectExcelData[i].pathList.join(',')
      //     this.selectExcelData[i].createTime = moment(this.selectExcelData[i].createTime).format('YYYY-MM-DD HH:mm:ss')
      //   }
      // }
      this.bodys = []
      this.headers = []
      for (let i = 0; i < this.proList.length; i++) {
        if (this.proList[i].flag) {
          this.bodys.push(this.proList[i].name)
          this.headers.push(this.proList[i].attribute)
        }
      }
      for (let i = 0; i < this.selectExcelData.length; i++) {
        this.selectExcelData[i].createTime = moment(this.selectExcelData[i].createTime).format('YYYY-MM-DD')
        this.selectExcelData[i].equip = this.selectExcelData[i].equip==1?'安卓':this.selectExcelData[i].equip==3?'PC端':this.selectExcelData[i].equip==2?'IOS端':'官网'
      }
      // this.downloadLoading = true;
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = this.bodys;
        const filterVal = this.headers;
        const data = this.formatJson(filterVal, this.selectExcelData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'template-list'
        })
        this.selectExcelData = []
        // this.downloadLoading = false;
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getList() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      if (this.selectDate2) {
        this.listQuery.startTime = this.selectDate2[0]
        this.listQuery.endTime = this.selectDate2[1]
      }
      feedbackNewList(this.listQuery).then(res => {
        this.lookData = res.data.list.length > 0 ? res.data.list[0] : []
        res.data.list.forEach((e,index)=>{
          e.index = index
        })
        this.tableList = res.data.list
        this.totalnumber = res.data.total
         document.addEventListener('keydown',(event)=>{

          if(event.keyCode == 38&&this.fdBoxIndex>0){

            if(this.selectIndex == 0){
              this.changeLook(this.tableList[this.fdBoxIndex-1] ,this.fdBoxIndex-1)
            }else if(this.selectIndex == 1){
              this.changeOp(this.tableList[this.fdBoxIndex-1].id ,this.fdBoxIndex-1)
            }else{
              this.seeInfo(this.tableList[this.fdBoxIndex-1] ,this.fdBoxIndex-1)
            }
          }else if(event.keyCode == 40&&this.fdBoxIndex<this.tableList.length-1){

            if(this.selectIndex == 0){
              this.changeLook(this.tableList[this.fdBoxIndex+1] ,this.fdBoxIndex+1)
            }else if(this.selectIndex == 1){
              this.changeOp(this.tableList[this.fdBoxIndex+1].id ,this.fdBoxIndex+1)
            }else{
              this.seeInfo(this.tableList[this.fdBoxIndex+1] ,this.fdBoxIndex+1)
            }
          }
        });
        if (this.isAdd||this.tableList.length>0) {
          this.isAdd = false
          this.changeLook(this.tableList[0], 0)
        }
      })
      var tempData = {}
      tempData.pageNo = this.listQuery.pageNo
      tempData.pageSize = this.listQuery.pageSize
      tempData.keyword = this.listQuery.keyword
      tempData.handler = this.listQuery.handler
      tempData.equip = this.listQuery.equip
      tempData.status = this.listQuery.status
      tempData.startTime = this.listQuery.startTime
      tempData.endTime = this.listQuery.endTime
      feedbacklog_export_list(tempData).then(res => {
        this.exportData = res.data
      })
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    rowClick(row,index,index2) {
      this.changeLook(row,row.index)
      // this.$refs.singleTable.setCurrentRow(this.tableList[this.activeIndex])
    }
  }
}
</script>

<style scoped lang="scss">
.listSet .el-dialog__wrapper{
  top: 51px;
    left: -50px;
}
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
    resize: none !important;
  }
  span {
    font-family:PingFangSC-Regular,PingFang SC;
    position: absolute;
    bottom: 16px;
    right: 16px;
    color: #c3c3c3;
    font-size: 12px;
  }
}
/deep/.el-dialog{
  .el-input__inner,.el-input--medium{
    width:300px;
  }
}
.nav-wrap {
  display: flex;
  justify-content: space-between;
  margin: 10px 40px 0;
  .buildFeed {
    display: flex;
    align-items: center;
    color: #2274e5;
    margin: 10px 0 24px;

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
    .add-wrap {
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: rgba(34, 116, 229, .8);
        .add {
          background: rgba(34, 116, 229, .8);
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
    .configuration, .export-excel {
      margin-left: 48px;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: rgba(34, 116, 229, .8);
      }
      i {
        margin-right: 16px;
        font-size: 24px;
      }
    }
  }
  .search-wrap {
    margin-right: 60px;
    position: relative;
    /deep/  .el-input__inner {
      width: 300px;
      height: 40px;
      border-radius: 8px 0 0 8px;
      border-right: none;
    }
    .search-btn {
      border: none;
      outline: none;
      width: 60px;
      height: 40px;
      top:0px;
      text-align: center;
      line-height: 40px;
      position: absolute;
      right: -60px;
      background: #2274e5;
      border-radius: 0 8px 8px 0;
      cursor: pointer;
      &:hover {
        background: rgba(34, 116, 229, .8);
      }
      i {
        color: #fff;
        font-size: 24px;
      }
    }
  }
}
.echarts-time {
  margin: 0px 40px;
  display: block;
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
    // margin-top:32px;
    margin-bottom: 23px;
  }
}
.backContent{
  display: flex;
  justify-content: space-between;
  margin: 0 40px;

  .left{
    // border:1px solid #ccc;
    border-radius: 8px;
    width: 1046px;
    overflow: hidden;
    /deep/ .el-table::before {
      height: 0;
    }
    /deep/ .table .el-table__body-wrapper {
      height: 596px !important;
    }
    .is-red {
      color: #FF0000;
    }
    .operation-icon {
      margin-left: 25px;
      margin-right: 0;
      font-size: 18px;
      &:first-child {
        margin: 0;
      }
    }
  }
  .right{
    min-width: 500px;
    width: 500px;
    padding:24px 32px;
    margin-left:32px;
    border:1px solid #ebeef5;
    background-color: #fff;
    border-radius: 8px;
    height: 666px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    /deep/ .el-textarea__inner {
      width: 433px;
      height: 160px;
      background: rgba(34, 116, 229, 0.05);
      border-radius: 4px;
      border: 1px solid #F5F5F5;
      padding: 12px 16px;
      &:focus {
        border-color: #409eff;
      }
    }
    .btnAb{
      position: absolute;
      // top:400px;
      bottom :32px;
      left:32px;
      right: 32px;
    }
    .msging_box{
      font-size:14px;

      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(102,102,102,1);
      .selectInput{
        margin-top:9px;
        /deep/.el-input__inner,/deep/.el-input--medium{
          width: 433px;
        }
      }
      .remarks{
        width:433px;
        margin-top:16px;
        textarea{
          resize: none !important;
        }
      }
    }
    .backStatu{
      margin-top:24px;

      display: flex;
      /deep/.el-input__inner,/deep/.el-input--medium{
          width:378px;
        }
      .title{
        width:55px;
        height:36px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(102,102,102,1);
        line-height:36px;
      }
    }
    .submitBack{
      margin-top:16px;
      float: right;
    }
    .remarks_box{
      margin-top:24px;
      display: flex;
      .remarks{
        width:465px;
      }
      .title{
        width:58px;
        text-align: right;
        padding-right:16px;
        height:20px;
        margin-left:-10px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(102,102,102,1);
        line-height:20px;
      }
    }
    .status{
      display: flex;
      // margin-top:300px;
      &.active{
        .item{
          background-color: #f5f5f5 !important;
        }
      }
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
          background-color: #fff !important;
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
        .user-info {
          margin-top: 24px;
          font-size: 16px;
          color: #333;
          .regdate {
            margin-bottom: 24px;
          }
          span {
            &:nth-child(2) {
              color: #666;
            }
          }
        }
        .content{
          margin-top: 40px;
          .item{
            margin-bottom: 20px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:#333;
            line-height:22px;
            span {
              display: inline-block;
              &:nth-child(2) {
                color: #666;
              }
            }
            .backInfo{
              width: 320px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
            }
          }
          .feedback-info {
            display: flex;
          }
        }
        .top{
          margin-top:25px;
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
      height:200px;
      overflow-x: hidden;
      overflow-y: auto;
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
      height: 258px;
      overflow: auto;
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
  background-color: #F6F8FA;
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
    border-radius: 8px;
    position: relative;
    background-color: #fff;
    // border-bottom: 1px dotted #e5e5e5;
    padding: 32px 32px 0px 32px;
    &.active{
      background:rgba(241,247,255,1);
    }
    .oper{
      top:205px;
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
      position: relative;
      width:646px;
      height:55px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      padding-left:16px;
      line-height: 55px;
      margin-top:16px;
      color:#666;
      .info{
        width:95%;
      }
      .toInfo{
        cursor: pointer;
        color:#2274e5;
        position: absolute;
        right: -66px;
        top:-15px;

    }
    }
    .fdTextBox {
      flex: 1;
      .lookBgm{
        width:760px;
        background:rgba(34,116,229,0.05);
        border-radius:4px;
        padding:16px 16px;
        margin-top:24px;
        margin-bottom: 32px;
      }
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
        margin-bottom: 6px;
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
           font-size:14px;
           color:#666;
         }
         span.active {
           color:#FF0000 !important;
         }
        }
      .tDiv_04 {
        margin-bottom: 8px;

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
  .pagination-container {
    margin: 20px 0;
  }
}
</style>
