<template>
  <div class="app-container">
    <div class="signadmin">
      <div class="app-menu">
        <h3 v-if="companys.length>0">全部（{{ companys.length-1 }}）</h3>
        <ul>
          <li
            v-for="(item,index) in companys"
            :class="currentIndex==index?'active':''"
            :key="index"
            class="textLine"
            @click="selectCompany(item.id,index)"
          >{{ item.shortName }}</li>
        </ul>
      </div>
      <div class="app-content">
        <div class="fileBar_box">
          <div
            v-for="(item,index) in fileTexts"
            :class="barIndex==index?'active':''"
            :key="index"
            class="fileBar_div"
            @click="selectBarIndex(index)"
          >{{ item }}</div>
        </div>
        <div class="filesearch filesearch_box">
          <!-- <div class="search">
          <el-input v-model="listQuery.name"  maxlength="20" placeholder="根据文件名搜索" @keyup.native.enter="handleSearch" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
          </el-input>
          </div>-->
          <div class="search searchFlex">
            <div class="search-list">
              <div class="title">手机号：</div>
              <el-input
                v-model="listQuery.phone"
                maxlength="11"
                placeholder="请输入手机号"
                @keyup.native.enter="handleSearch"
              />
            </div>
            <div class="search-list size">
              <div class="title">订购平台：</div>
              <el-select v-model="listQuery.equip" filterable placeholder="请选择" style="width:300px">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div class="search-list marginRight0">
              <div class="title">订购类型：</div>
              <el-select
                v-model="listQuery.productType"
                filterable
                placeholder="请选择"
                style="width:300px"
              >
                <el-option
                  v-for="item in buyTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div v-show="barIndex==2" class="search-list">
              <div class="title">操作人：</div>
              <el-select v-model="listQuery.updateUser" class="filter-item" placeholder="请选择">
                <el-option
                  v-for="(item) in handlers"
                  :key="item.id"
                  :label="item.account"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div v-if="barIndex==0" class="search-list">
              <div class="title">支付状态：</div>
              <el-select
                v-model="listQuery.orderStatus"
                filterable
                placeholder="请选择"
                style="width:300px"
              >
                <el-option
                  v-for="item in orderStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
            <div v-if="barIndex>1" class="search-list">
              <div class="title">状态：</div>
              <el-select
                v-model="listQuery.returnVisitStatus"
                filterable
                placeholder="请选择"
                style="width:300px"
              >
                <el-option
                  v-for="(item) in returnVisitStatusArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>

            <div class="search-list">
              <div
                class="title"
              >{{ barIndex==0?'下单时间：':barIndex==1?'订购日期':barIndex==2?'操作时间':'流失时间' }}</div>
              <div class="echarts-time" style="marign-bottom:0px;">
                <div style="display:flex">
                  <div class="echarts-date">
                    <el-date-picker
                      v-model="selectDate"
                      :picker-options="pickerOptions"
                      type="daterange"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      value-format="yyyy-MM-dd"
                    />
                    <em class="iconfont iconrilix" />
                  </div>
                </div>
              </div>
            </div>
            <div class="search" style="margin-left:28px">
              <div class="search-list searchbtn">
                <el-button type="primary" class="m_search" @click="handleSearch">查询</el-button>
                <div class="search-reset" @click="resetData">
                  <el-button type="primary">
                    <i class="iconfont iconzhongzhimima" style="margin-right:5px;" />重置
                  </el-button>
                </div>
              </div>
            </div>
            <div v-if=" barIndex==1" class="search" style="margin-left:24px;">
              <div class="search-list searchbtn" @click="addOrder">
                <div class="search-item">
                  <span class="b-g">
                    <i class="iconfont icontianjia" style="margin-right:5px;" />
                  </span>
                  <span style="margin-left:10px">新增</span>
                </div>
              </div>
            </div>
            <div class="search" style="margin-left:24px;">
              <div class="search-list searchbtn" @click="handleDownload">
                <div class="search-item" style="font-size:18px;">
                  <i
                    class="iconfont icondaochu"
                    style="margin-right:5px;font-size:20px;margin-top: 1px;"
                  />
                  <span>导出</span>
                </div>
              </div>
            </div>
            <div class="search" style="margin-left:24px;">
              <div class="search-list listSet" style="margin-left:0px">
                <el-dialog :visible.sync="screenShow" :modal="false" title="选择显示的列表" width="300px">
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
                <div class="search-item" style="font-size:18px;" @click="openScreenShow">
                  <i
                    class="iconfont iconshezhibeifen"
                    style="margin-right:5px;font-size:20px;margin-top: 1px;"
                  />
                  <span>配置</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-table
          v-show="barIndex==0"
          ref="table"
          :data="tableLists.data1"
          highlight-current-row
          style="width: 100%"
          class="table"
        >
        <el-table-column type="index" label="序号" width="80" />
          <el-table-column
            v-for="(item,index) in proList"
            v-if="item.flag"
            :key="index"
            :label="item.name"
            property="framePath"
            align="left"
            :width="index<2?'200px':'120px'"
          >
            <template slot-scope="{row}">
              <div
                class="item"
                v-if="item.attribute=='user_create_time'"
              >{{ row[item.attribute]|formatDate() }}</div>
              <div
                class="item"
               v-else-if="item.attribute=='expire_time'"
              >{{ row[item.attribute]|formatDate() }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='return_visit_status'"
              >{{ !row[item.attribute]||row[item.attribute]==0?'未跟进':row[item.attribute]==1?'跟进中':'已完成' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='product_type'"
              >{{ row[item.attribute]==1?'扩容':'会员' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='equip'"
              >{{row[item.attribute]==1?'安卓':row[item.attribute]==3?'PC端':'其他' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='order_status'"
              >{{row[item.attribute]==1?'已支付':'未支付' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='pay_type'"
              >{{row[item.attribute]==1?'支付宝':row[item.attribute]==2?'微信':'--' }}</div>
              <div class="item" v-else>{{ row[item.attribute]?row[item.attribute]:'--' }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column type="index" label="序号" width="80"/>
          <el-table-column label="订单编号">
            <template slot-scope="{row}">{{ row.order_no }}</template>
          </el-table-column>
          <el-table-column label="商户流水">
            <template slot-scope="{row}">{{ row.out_order_no }}</template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="{row}">{{ row.phone }}</template>
          </el-table-column>
          <el-table-column label="订购类型">
            <template slot-scope="scope" ><span>扩容</span></template>
          </el-table-column>
          <el-table-column label="订购方案">
            <template slot-scope="{row}">{{ row.plan }}</template>
          </el-table-column>
          <el-table-column label="订购时间">
            <template slot-scope="{row}">{{ row.pay_time }}</template>
          </el-table-column>
          <el-table-column label="订购时长">
            <template slot-scope="{row}">{{ row.expiration_date }}个月</template>
          </el-table-column>
          <el-table-column label="订购平台">
            <template slot-scope="{row}">{{ row.equip==1?'安卓':row.equip==3?'PC端':'其他' }}</template>
          </el-table-column>
          <el-table-column label="支付金额">
            <template slot-scope="{row}">{{ row.pay_price }}</template>
          </el-table-column>
          <el-table-column label="支付状态">
            <template slot-scope="{row}">{{ row.order_status==1?'已支付':'未支付' }}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="{row}">{{ !row.return_visit_status||row.return_visit_status==0?'未跟进':row.return_visit_status==1?'跟进中':'已完成' }}</template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="{row}">{{ row.return_visit_desc }}</template>
          </el-table-column>-->
          <el-table-column
            property="address"
            fixed="right"
            label="操作"
            width="100"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i
                  class="iconfont iconbianji tipsTxt"
                  @click="showUpdateData(row.order_no,row.user_id)"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-show="barIndex==1"
          ref="singleTable"
          :data="tableLists.data2"
          highlight-current-row
          style="width: 100%"
          class="table"
        >
        <el-table-column type="index" label="序号" width="80" />
          <el-table-column
            v-for="(item,index) in proList"
            v-if="item.flag"
            :key="index"
            :label="item.name"
            property="framePath"
            align="left"
            :width="index<2?'200px':'120px'"
          >
            <template slot-scope="{row}">
              <div
                class="item"
                v-if="item.attribute=='user_create_time'"
              >{{ row[item.attribute]|formatDate() }}</div>
              <div
                class="item"
               v-else-if="item.attribute=='expire_time'"
              >{{ row[item.attribute]|formatDate() }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='return_visit_status'"
              >{{ !row[item.attribute]||row[item.attribute]==0?'未跟进':row[item.attribute]==1?'跟进中':'已完成' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='product_type'"
              >{{ row[item.attribute]==1?'扩容':'会员' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='equip'"
              >{{row[item.attribute]==1?'安卓':row[item.attribute]==3?'PC端':'其他' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='pay_type'"
              >{{row[item.attribute]==1?'支付宝':row[item.attribute]==2?'微信':'--' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='pay_type'"
              >{{row[item.attribute]==1?'支付宝':'微信' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='order_status'"
              >{{row[item.attribute]==1?'已支付':'未支付' }}</div>

              <div class="item" v-else>{{ row[item.attribute]?row[item.attribute]:'--' }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column type="index" label="序号" width="80"/>
          <el-table-column label="订单编号">
            <template slot-scope="{row}">{{ row.order_no }}</template>
          </el-table-column>
          <el-table-column label="商户流水">
            <template slot-scope="{row}">{{ row.out_order_no }}</template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="{row}">{{ row.phone }}</template>
          </el-table-column>
          <el-table-column label="订购类型">
            <template slot-scope="scope" ><span>扩容</span></template>
          </el-table-column>
          <el-table-column label="订购方案">
            <template slot-scope="{row}">{{ row.plan }}</template>
          </el-table-column>
          <el-table-column label="订购时间">
            <template slot-scope="{row}">{{ row.pay_time }}</template>
          </el-table-column>
          <el-table-column label="订购时长">
            <template slot-scope="{row}">{{ row.expiration_date }}个月</template>
          </el-table-column>
          <el-table-column label="订购平台">
            <template slot-scope="{row}">{{ row.equip==1?'安卓':row.equip==3?'PC端':'其他' }}</template>
          </el-table-column>
          <el-table-column label="支付金额">
            <template slot-scope="{row}">{{ row.pay_price }}</template>
          </el-table-column>
          <el-table-column label="支付平台">
            <template slot-scope="{row}">{{ row.pay_type==1?'支付宝':'微信' }}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="{row}">{{ !row.return_visit_status||row.return_visit_status==0?'未跟进':row.return_visit_status==1?'跟进中':'已完成' }}</template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="{row}">{{ row.return_visit_desc }}</template>
          </el-table-column>-->
          <el-table-column property="address" fixed="right" label="操作" width="200">
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i class="iconfont iconbianji" @click="showUpdateData(row.order_no,row.user_id)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>

        <el-table
          v-show="barIndex==2"
          ref="singleTable"
          :data="tableLists.data3"
          highlight-current-row
          style="width: 100%"
          class="table"
        >
        <el-table-column type="index" label="序号" width="80" />
          <el-table-column
            v-for="(item,index) in proList"
            v-if="item.flag"
            :key="index"
            :label="item.name"
            property="framePath"
            align="left"
            :width="index<2?'200px':'120px'"
          >
            <template slot-scope="{row}">
              <div
                class="item"
                v-if="item.attribute=='user_create_time'"
              >{{ row[item.attribute]|formatDate() }}</div>
              <div
                class="item"
               v-else-if="item.attribute=='expire_time'"
              >{{ row[item.attribute]|formatDate() }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='return_visit_status'"
              >{{ !row[item.attribute]||row[item.attribute]==0?'未跟进':row[item.attribute]==1?'跟进中':'已完成' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='product_type'"
              >{{ row[item.attribute]==1?'扩容':'会员' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='equip'"
              >{{row[item.attribute]==1?'安卓':row[item.attribute]==3?'PC端':'其他' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='pay_type'"
              >{{row[item.attribute]==1?'支付宝':'微信' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='order_status'"
              >{{row[item.attribute]==1?'已支付':'未支付' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='pay_type'"
              >{{row[item.attribute]==1?'支付宝':row[item.attribute]==2?'微信':'--' }}</div>
              <div class="item" v-else>{{ row[item.attribute]?row[item.attribute]:'--' }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column type="index" label="序号" width="80" />
          <el-table-column label="订单编号">
            <template slot-scope="{row}">{{ row.order_no }}</template>
          </el-table-column>
          <el-table-column label="手机号">
            <template slot-scope="{row}">{{ row.phone }}</template>
          </el-table-column>
          <el-table-column label="订购类型">
            <template slot-scope="scope">
              <span>扩容</span>
            </template>
          </el-table-column>
          <el-table-column label="订购方案">
            <template slot-scope="{row}">{{ row.plan }}</template>
          </el-table-column>
          <el-table-column label="订购时长">
            <template slot-scope="{row}">{{ row.expiration_date }}个月</template>
          </el-table-column>

          <el-table-column label="订购平台">
            <template slot-scope="{row}">{{ row.equip==1?'安卓':row.equip==3?'PC端':'其他' }}</template>
          </el-table-column>
          <el-table-column label="订购金额">
            <template slot-scope="{row}">{{ row.pay_price }}</template>
          </el-table-column>
          <el-table-column label="下单时间">
            <template slot-scope="{row}">{{ row.create_time|formatDate('') }}</template>
          </el-table-column>
          <el-table-column label="操作人">
            <template slot-scope="{row}">{{ row.returnVisitor }}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template
              slot-scope="{row}"
            >{{ !row.return_visit_status||row.return_visit_status==0?'未跟进':row.return_visit_status==1?'跟进中':'已完成' }}</template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="{row}">{{ row.return_visit_desc }}</template>
          </el-table-column> -->
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i class="iconfont iconbianji" @click="showUpdateData(row.order_no,row.user_id)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-show="barIndex==3"
          ref="singleTable"
          :data="tableLists.data4"
          highlight-current-row
          style="width: 100%"
          class="table"
        >
        <el-table-column type="index" label="序号" width="80" />
          <el-table-column
            v-for="(item,index) in proList"
            v-if="item.flag"
            :key="index"
            :label="item.name"
            property="framePath"
            align="left"
            :width="index<2?'200px':'120px'"
          >
            <template slot-scope="{row}">
              <div
                class="item"
                v-if="item.attribute=='user_create_time'"
              >{{ row[item.attribute]|formatDate() }}</div>
              <div
                class="item"
               v-else-if="item.attribute=='expire_time'"
              >{{ row[item.attribute]|formatDate() }}</div>

              <div
                class="item"
                v-else-if="item.attribute=='return_visit_status'"
              >{{ !row[item.attribute]||row[item.attribute]==0?'未跟进':row[item.attribute]==1?'跟进中':'已完成' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='product_type'"
              >{{ row[item.attribute]==1?'扩容':'会员' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='equip'"
              >{{row[item.attribute]==1?'安卓':row[item.attribute]==3?'PC端':'其他' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='pay_type'"
              >{{row[item.attribute]==1?'支付宝':'微信' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='order_status'"
              >{{row[item.attribute]==1?'已支付':'未支付' }}</div>
              <div
                class="item"
                v-else-if="item.attribute=='pay_type'"
              >{{row[item.attribute]==1?'支付宝':row[item.attribute]==2?'微信':'--' }}</div>
              <div class="item" v-else>{{ row[item.attribute]?row[item.attribute]:'--' }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column type="index" label="序号" width="80" />
          <el-table-column label="手机号">
            <template slot-scope="{row}">{{ row.phone }}</template>
          </el-table-column>
          <el-table-column label="订购类型">
            <template slot-scope="scope">
              <span>扩容</span>
            </template>
          </el-table-column>
          <el-table-column label="到期时间">
            <template slot-scope="{row}">{{ row.expire_time|formatDate('') }}</template>
          </el-table-column>
          <el-table-column label="流失天数">
            <template slot-scope="{row}">{{ row.lossDays }}天</template>
          </el-table-column>
          <el-table-column label="操作人">
            <template slot-scope="{row}">{{ row.returnVisitor }}</template>
          </el-table-column>
          <el-table-column label="操作时间">
            <template slot-scope="{row}">{{ row.return_visit_time|formatDate('') }}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template
              slot-scope="{row}"
            >{{ !row.return_visit_status||row.return_visit_status==0?'未跟进':row.return_visit_status==1?'跟进中':'已完成' }}</template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="{row}">{{ row.return_visit_desc }}</template>
          </el-table-column> -->
          <el-table-column property="address" label="操作" width="200">
            <template slot-scope="{row}">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <i class="iconfont iconbianji" @click="showUpdateData(row.order_no,row.user_id)" />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="totalnumber > 10" class="pagination-container m_floatR">
      <el-pagination
        :current-page.sync="currentpage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalnumber"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChangeFile"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isdialog"
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
        <el-form-item label="平台：" prop="count">
          <div>
            <el-radio v-model="orderObj.returnVisitStatus" :label="0">未跟进</el-radio>
            <el-radio v-model="orderObj.returnVisitStatus" :label="1">跟进中</el-radio>
            <el-radio v-model="orderObj.returnVisitStatus" :label="2">已完成</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="反馈内容：" prop="name" class="version">
          <div class="remarks_box" style="width:300px">
            <div class="remarks" style="position:relative">
              <ul v-show="orderObj.returnVisitDesc==''&&isFocus" class="recordMsg_box">
                <li
                  v-for="(item,index) in msgArr"
                  :key="index"
                  @click="orderObj.returnVisitDesc=item"
                >{{ item }}</li>
              </ul>
              <el-input
                v-model="orderObj.returnVisitDesc"
                :rows="5"
                type="textarea"
                placeholder="请输入反馈内容"
                maxlength="200"
                @focus="isFocus = true"
              />
              <span>{{ orderObj.returnVisitDesc.length }}/200</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="isdialog = false">取消</el-button>
          <el-button type="primary" @click="updateData">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="isEnlarge"
      :modal-append-to-body="false"
      :show-close="false"
      :width="widthauto"
      title
      class="imgdialog"
    >
      <img :src="imgPath" class="magnifier" @load="onLoad" />
    </el-dialog>

    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showDialog"
      title="新增"
      class="dialog"
      width="560px"
    >
      <el-form
        ref="ruleFormOrder"
        :model="ruleFormOrder"
        :rules="rulesOrder"
        :modal-append-to-body="false"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号：" prop="phone">
          <el-input
            v-model="ruleFormOrder.phone"
            type="text"
            maxlength="20"
            placeholder="请输入手机号"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="订购方案：" prop="count">
          <el-input
            v-model="ruleFormOrder.count"
            type="text"
            maxlength="20"
            placeholder="请输入扩容上限数量（单位：个）"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="订购时长：" prop="expirationDate">
          <el-input
            v-model="ruleFormOrder.expirationDate"
            type="text"
            maxlength="20"
            placeholder="请输入订购时长（单位：月）"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="支付金额：" prop="payPrice">
          <el-input
            v-model="ruleFormOrder.payPrice"
            type="text"
            maxlength="20"
            placeholder="请输入支付金额（单位：元）"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="支付方式：">
          <el-select v-model="ruleFormOrder.payType" filterable placeholder="请选择SDK">
            <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item class="submit">
          <el-button @click="showDialog=false">取消</el-button>
          <el-button type="primary" @click="createData()">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  get_order_fields,
  open_company_list,
  export_payed_order,
  export_unpay_user,
  export_loss_user,
  return_visit_loss,
  handler_list,
  return_visit,
  create_order,
  all_order_page,
  payed_order_page,
  unpay_user_page,
  loss_user_page,
  export_all_order,
  save_order_fields
} from '@/api/api';
import moment from 'moment';
export default {
  name: 'ComplexTable',
  filters: {
    formatDate(time) {
      if (!time) {
        return '';
      }
      return moment(time).format('YYYY-MM-DD');
    }
  },
  data() {
    this.apis = [
      all_order_page,
      payed_order_page,
      unpay_user_page,
      loss_user_page
    ];
    this.apisExport = [
      export_all_order,
      export_payed_order,
      export_unpay_user,
      export_loss_user
    ];
    return {
      showDialog: false,
      ruleFormOrder: {
        phone: '',
        count: '',
        expirationDate: '',
        payPrice: '',
        payType: 1
      },
      screenShow: false,
      proList: [],
      fileTexts: ['全部', '已支付订单', '未支付订单', '流失用户'],
      barIndex: 0,
      ruleForm: { equip: 1, description: '' },
      eqs: [
        { id: 0, name: '其他' },
        { id: 1, name: 'Android' },
        { id: 2, name: 'IOS' },
        { id: 3, name: 'PC' },
        { id: 4, name: 'Web' }
      ],
      rules: {},
      rulesOrder: {
        phone: [{ required: true, message: '请输入手机号' }],
        count: [{ required: true, message: '请输入订购方案' }],
        expirationDate: [{ required: true, message: '请输入订购时长' }],
        payPrice: [{ required: true, message: '请输入支付金额' }]
      },
      isdialog: false,
      handlers: [],
      types: [
        { id: 1, name: '支付宝' },
        { id: 2, name: '微信' }
      ],
      isFocus: false,
      msgArr: [
        '电话未接通。',
        '客户有续购意愿，关注中。',
        '客户没有兴趣，无需跟进。',
        '客户答应续购，关注中。'
      ],
      selectDate: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      isedit: false,
      headers: [],
      bodys: [],
      exportData: [],

      buyTypes: [
        { id: '', name: '全部' },
        { id: 1, name: '扩容' },
        { id: 2, name: '会员' }
      ],
      orderStatus: [
        { id: '', name: '全部' },
        { id: 1, name: '已支付' },
        { id: 0, name: '未支付' }
      ],
      returnVisitStatusArr: [
        { id: '', name: '全部' },
        { id: 0, name: '未跟进' },
        { id: 1, name: '跟进中' },
        { id: 2, name: '完成' }
      ],
      options: [
        {
          id: '',
          name: '全部'
        },
        {
          id: 1,
          name: 'Android'
        },
        {
          id: 2,
          name: 'IOS'
        },
        {
          id: 3,
          name: 'PC'
        }
      ],
      allCheck: false,

      selectExcelData: [],
      currentIndex: 0,
      orderObj: {
        orderNo: '',
        returnVisitStatus: 0,
        returnVisitDesc: '',
        userId: ''
      },
      tempData: ['data1', 'data2', 'data3', 'data4'],
      companys: [],
      currentCid: -1,
      orderTexts:['all_order','payed_order','unpayed_order','loss_user'],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        updateUser: '',
        returnVisitStatus: '',
        companyId: -1,
        phone: '',
        orderStatus: 1,
        productType: '',
        equip: 1,
        isFile: true,
        startTime: '2020-4-20',
        endTime: '2020-5-6'
      }
    };
  },
  computed: {
    checkEq() {
      return function(index) {
        if (!index) {
          return '';
        }
        var name = '';
        for (var i = 0; i < this.eqs.length; i++) {
          if (this.eqs[i].id === index) {
            name = this.eqs[i].name;
          }
        }
        return name;
      };
    }
  },
  created() {
    this.getFileds()
    this.chooseTime('week');
    handler_list().then(res => {
      this.selectsHandler = Object.assign([], res.data);
      this.handlers = res.data;
      console.log(this.selectsHandler);
      this.handler = res.data[0].id;
      this.handlers.splice(0, 0, { id: '', account: '全部' });
    });
    open_company_list().then(res => {
      this.listapi = all_order_page;
      this.companys = res.data;
      if (this.companys.length > 0) {
        this.listQuery.companyId = this.companys[0].id;
        this.selectBarIndex(0);
      }
    });
  },
  methods: {
    getFileds(){
      get_order_fields({ show_type: this.orderTexts[this.barIndex] }).then(res => {
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
      save_order_fields({show_type:this.orderTexts[this.barIndex], order_fields: JSON.stringify(this.proList) }).then(res => {
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
    addOrder() {
      this.showDialog = true;
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
    createData() {
      this.$refs.ruleFormOrder.validate(async valid => {
        if (valid) {
          create_order(this.ruleFormOrder).then(res => {
            if (res.code == 100) {
              this.showDialog = false;
              this.selectBarIndex(this.barIndex);
              this.$message.success('创建成功！');
            }
          });
        }
      });
    },
    showUpdateData(order, userId) {
      this.orderObj.orderNo = order;
      this.orderObj.userId = userId;
      this.orderObj.returnVisitStatus = 0;
      this.orderObj.returnVisitDesc = '';

      this.isdialog = true;
    },
    updateData() {
      return_visit(this.orderObj).then(res => {
        if (res.code === 100) {
          this.$message.success('修改成功');
          this.initData(this.barIndex);
          this.isdialog = false;
        }
      });
      // if (this.barIndex === 2) {
      //   return_visit(this.orderObj).then(res => {
      //     if (res.code === 100) {
      //       this.$message.success('修改成功')
      //       this.initData(this.barIndex)
      //       this.isdialog = false
      //     }
      //   })
      // } else {
      //   return_visit_loss({ returnVisitStatus: this.orderObj.returnVisitStatus, returnVisitDesc: this.orderObj.returnVisitDesc, userId: this.orderObj.userId }).then(res => {
      //     if (res.code === 100) {
      //       this.$message.success('修改成功')
      //       this.initData(this.barIndex)
      //       this.isdialog = false
      //     }
      //   })
      // }
    },
    selectBarIndex(index) {
      this.resetTemp();
      this.barIndex = index;
      this.listapi = this.apis[this.barIndex];
      this.initData();
      this.getFileds()
    },
    initData() {
      var tempData = {};

      if (this.barIndex === 0) {
        tempData = {
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          companyId: this.listQuery.companyId,
          phone: this.listQuery.phone,
          orderStatus: this.listQuery.orderStatus,
          productType: this.listQuery.productType,
          equip: this.listQuery.equip,
          isFile: true,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime
        };
        this.headers = [
          '订单编号',
          '商户流水',
          '手机号',
          '订购类型',
          '订购方案',
          '订购时间',
          '订购时长',
          '订购平台',
          '支付金额（元）',
          '支付状态'
        ];
        this.bodys = [
          'order_no',
          'out_order_no',
          'phone',
          'kuorong',
          'plan',
          'pay_time',
          'expiration_date',
          'equip',
          'pay_price',
          'order_status'
        ];
      } else if (this.barIndex === 1) {
        tempData = {
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          companyId: this.listQuery.companyId,
          phone: this.listQuery.phone,
          orderStatus: 1,
          productType: this.listQuery.productType,
          equip: this.listQuery.equip,
          isFile: true,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime
        };
        this.headers = [
          '订单编号',
          '商户流水',
          '手机号',
          '订购类型',
          '订购方案',
          '订购时间',
          '订购时长',
          '订购平台',
          '支付金额（元）',
          '支付平台'
        ];
        this.bodys = [
          'order_no',
          'out_order_no',
          'phone',
          'kuorong',
          'plan',
          'pay_time',
          'expiration_date',
          'equip',
          'pay_price',
          'pay_type'
        ];
      } else if (this.barIndex === 2) {
        tempData = {
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          updateUser: this.listQuery.updateUser,
          companyId: this.listQuery.companyId,
          phone: this.listQuery.phone,
          productType: this.listQuery.productType,

          returnVisitStatus: this.listQuery.returnVisitStatus,
          equip: this.listQuery.equip,
          isFile: true,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime
        };
        this.headers = [
          '订单编号',
          '手机号',
          '订购类型',
          '订购方案',
          '订购时长',
          '订购平台',
          '支付金额（元）',
          '下单时间',
          '操作人',
          '状态',
          '备注'
        ];
        this.bodys = [
          'order_no',
          'phone',
          'kuorong',
          'plan',
          'expiration_date',
          'equip',
          'pay_price',
          'create_time',
          'name',
          'return_visit_status',
          'return_visit_desc'
        ];
      } else if (this.barIndex === 3) {
        tempData = {
          pageNo: this.listQuery.pageNo,
          pageSize: this.listQuery.pageSize,
          returnVisitStatus: this.listQuery.returnVisitStatus,
          companyId: this.listQuery.companyId,
          phone: this.listQuery.phone,
          productType: this.listQuery.productType,
          equip: this.listQuery.equip,
          isFile: true,
          startTime: this.listQuery.startTime,
          endTime: this.listQuery.endTime
        };
        this.headers = [
          '手机号',
          '订购类型',
          '到期时间',
          '流失天数',
          '操作人',
          '操作时间',
          '状态',
          '备注'
        ];
        this.bodys = [
          'phone',
          'kuorong',
          'expire_time',
          'expire',
          'name',
          'update_time',
          'return_visit_status',
          'return_visit_desc'
        ];
      }
      this.getListDataFile(
        tempData,
        this.listapi,
        this.tempData[this.barIndex]
      );
      this.apisExport[this.barIndex](tempData).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          // res.data[i].equip =
          //   res.data[i].equip === 1
          //     ? '安卓'
          //     : res.data[i].equip === 3
          //     ? 'PC端'
          //     : '其他';
          // res.data[i].kuorong = '扩容';
          res.data[i].order_status =
            res.data[i].order_status === 1 ? '已支付' : '未支付';
          if (res.data[i].pay_time) {
            res.data[i].pay_time = moment(res.data[i].pay_time).format(
              'YYYY-MM-DD HH:mm:ss'
            );
          }
          if (res.data[i].create_time) {
            res.data[i].created_time = moment(res.data[i].create_time).format(
              'YYYY-MM-DD '
            );
          }
          if (res.data[i].pay_type) {
            res.data[i].pay_type =
              res.data[i].pay_type == 1 ? '支付宝' : '微信';
          }
          // if (res.data[i].create_time) {
          //   res.data[i].return_visit_status = row.return_visit_status==0?'未跟进':row.return_visit_status==1?'跟进中':'已完成'
          // }
        }
        this.exportData = res.data;
      });
    },
    resetTemp() {
      this.listQuery.equip = '';
      this.listQuery.orderStatus = '';
      this.listQuery.productType = '';
      this.listQuery.phone = '';
      this.listQuery.pageNo = 1;
      this.currentpage = 1;
    },
    resetData() {
      this.listQuery.equip = '';
      this.listQuery.orderStatus = '';
      this.listQuery.productType = '';
      this.listQuery.phone = '';
      this.listQuery.updateUser = '';
      this.listQuery.returnVisitStatus = '';
      this.listQuery.pageNo = 1;
      this.currentpage = 1;
      this.chooseTime('week');
      this.initData();
    },
    selectCompany(id, index) {
      this.listQuery.pageNo = 1;
      this.currentIndex = index;
      this.listQuery.companyId = id;
      this.getListDataFile(
        this.listQuery,
        this.listapi,
        this.tempData[this.barIndex]
      );
    },
    download(url) {
      location.href = url;
    },
    confirmEdit(row) {
      this.isedit = true;
      this.isdialog = true;
      this.ruleForm = row;
    },
    handleSearch() {
      this.changeTime();
      this.listQuery.pageNo = 1;
      this.currentpage = 1;
      this.initData();
      // this.apisExport[this.barIndex]({
      //   companyId: this.listQuery.companyId,
      //   phone: this.listQuery.phone,
      //   orderStatus: this.listQuery.orderStatus,
      //   productType: this.listQuery.productType,
      //   equip: this.listQuery.equip,
      //   startTime: this.listQuery.startTime,
      //   endTime: this.listQuery.endTime })
    },
    handleDownload() {
      if (this.exportData.length <= 0) {
        this.$message.error('不能导出空数据!');
        return;
      }

      if (this.selectExcelData.length <= 0) {
        const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: h('p', null, [h('span', null, '您确定要导出所有数据吗')]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              done();
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
     this.bodys = []
      this.headers = []
      for (let i = 0; i < this.proList.length; i++) {
        if (this.proList[i].flag) {
          this.bodys.push(this.proList[i].name)
          this.headers.push(this.proList[i].attribute)
        }
      }
      for (let i = 0; i < this.exportData.length; i++) {
        console.log(this.exportData[i].equip)
        this.exportData[i].equip = this.exportData[i].equip==1?'安卓':this.exportData[i].equip==3?'PC端':'其他'
        this.exportData[i].product_type = this.exportData[i].product_type==1?'扩容':'会员'
        this.exportData[i].expire_time = moment(this.exportData[i].expire_time).format('YYYY-MM-DD')
        this.exportData[i].user_create_time = moment(this.exportData[i].user_create_time).format('YYYY-MM-DD')
        this.exportData[i].return_visit_status = this.exportData[i].return_visit_status==0?'未跟进':this.exportData[i].return_visit_status==1?'跟进中':'已完成'
      }
      this.downloadLoading = true;
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = this.bodys;
        const filterVal = this.headers;

        const data = this.formatJson(filterVal, this.selectExcelData);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'template-list'
        });
        this.selectExcelData = [];
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            // eslint-disable-next-line no-undef
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-table__fixed-right{
  opacity: 0;
  transition: all 1s linear;
}
/deep/.el-table:hover{
  /deep/.el-table__fixed-right{
    // display: block !important;
    opacity: 1;
  }
}
.app-container .search .search-list {
/deep/.el-input{
  width:300px;
}
}
.echarts-time .echarts-date .el-date-editor{
  width:300px;
  height: 36px;
}
.echarts-time .echarts-date em{
  top:7px;
}
.signadmin {
  width: 100%;
  display: flex;
  // .app-menu{
  //   max-height: 1495px;
  //   ul{
  //     max-height: 1415px;
  //     /* overflow-y: scroll; */
  //     overflow-y: auto;
  //   }
  // }
  // /deep/.table .el-table__body-wrapper{
  //   min-height: 1200px;
  // }
  .app-content {
    margin-left: 30px;
    flex: 1;
    overflow: hidden;
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
        padding-left: 23px;
        line-height: 56px;
        width: 162px;
        margin-right: 8px;
        cursor: pointer;
        height: 56px;
        background: rgba(34, 116, 229, 1);
        border-radius: 8px 8px 0px 0px;
        position: relative;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        &.active {
          color: #2274e5;
          opacity: 1;
          background-color: #fff;
        }
        &.active::after {
          content: '';
          width: 4px;
          position: absolute;
          left: 0px;
          top: 16px;
          height: 22px;
          background-color: #2274e5;
        }
      }
    }
  }
}
.app-menu {
  max-height: 888px;
  overflow-y:auto;
  padding-bottom: 10px;
  margin-top: 0px !important;
}
.filesearch_box {
  padding: 32px 0px 0px 0px;
  background-color: #fff;
  justify-content: flex-start;
  position: relative;
  z-index: 10;
  margin-bottom: 6px;
  box-shadow: 0px 0px 2px rgba(229, 229, 229, 1);
  .searchFlex {
    flex-flow: wrap;
    .search-list {
      margin-left: 24px;
      margin-right: 0px;
      max-width: 400px;
      .title {
        width: 80px;
        text-align: left;
      }
    }
    .size {
      .el-input {
        width: 120px;
      }
    }
  }
}
.search {
  .searchbtn {
    margin-left: 0px !important;
    cursor: pointer;
  }
}
.picture {
  width: 160px;
  height: 160px;
  border-radius: 2px;
  border: 1px solid #c3c3c3;
}
/deep/.el-table__fixed-body-wrapper {
  top: 70px !important;
}
</style>
