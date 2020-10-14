<style lang="scss" scoped>
.memberAdd {
  margin: 14px 40px;
  /deep/.el-form-item__label {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
  /deep/.el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
    width: 400px;
  }
  /deep/.el-input--medium .el-textarea__inner {
    width: 400px;
  }
  /deep/.el-table th.is-leaf {
    padding: 0px 0px !important;
    background: rgba(242, 250, 255, 1);
  }
  /deep/.table .has-gutter tr {
    height: 40px;
  }
  /deep/.table .el-table__header-wrapper {
    border-radius: 0px !important;
  }
  /deep/.table .el-table__header-wrapper {
    margin-bottom: 0px !important;
  }
  /deep/.table .el-table__header-wrapper {
    border: none !important;
  }
  /deep/.table .el-table__body-wrapper {
    border: none !important;
  }
  /deep/.el-checkbox__inner {
    width: 18px;
    height: 18px;
  }
  /deep/.el-checkbox__inner::after{
    height:9px;
    left:6px;
  }
  /deep/.price-item {
    position: relative;
    .right-text {
      position: absolute;
      top: 5px;
      right: 18px;
    }
    .el-input--medium .el-input__inner {
      padding-right: 25px;
      width: 80px;
    }
  }
  .table {
    background-color: #ffffff;
  }
  .el-form-item {
    margin-top: 16px;
  }
  .memberAdd-content {
    padding: 24px 32px;
    background-color: #ffffff;
    border-radius: 8px;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .content-box {
      display: flex;
      margin-top: 48px;
      .content-item{
        margin-right: 79px;
      .share-box{
        margin-top:49px;
        .share-item{
          display: flex;
          margin-bottom: 14px;
          line-height: 24px;
          .share-item-title{
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            margin-right: 50px;
          }
          .share-item-checkbox{
            margin-right:14px;
          }
          /deep/.el-input--medium .el-input__inner{
            width: 160px;
            height:24px;
            line-height: 24px;
          }
        }
      }
      .title-two {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .fun-box {
        .fun-item {
          display: flex;
          margin-bottom: 17px;
          .text-1 {
            width: 56px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-right: 78px;
          }
          .text-user-1{
            width: 84px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            margin-right: 78px;
          }
          .text-2 {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            margin-right: 72px;
          }
          .text-3{
            margin-right: 88px;
          }
        }
      }
    }
    &>div:last-child{
      margin-right: 0px;
    }
    }
  }
  .create-line{
    cursor: pointer;
    color:#2274E5;
    margin-bottom: 5px;
    i{
      font-size:14px;
    }
  }
  .btn-save{
    background-color: #2274e5;
    color:#ffffff;
    width:120px;
    position: absolute;
    top:30px;
    right: 60px;
    border-radius: 20px;
  }
}
</style>
<template>
  <div class="memberAdd">
    <div class="memberAdd-content">
      <div class="title">会员信息</div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="template-editor"
      >
        <el-form-item label="会员名称：" prop="level_name">
          <el-input v-model="ruleForm.level_name" placeholder="仅支持中英文、数字和下划线，不包含特殊字符" maxlength="20" />
        </el-form-item>
        <el-form-item label="会员描述：" prop="level_desc">
          <el-input v-model="ruleForm.level_desc" type="textarea" rows="5" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="价格：" prop="add_upd_vip_config_price">
          <div style="width:560px;">
            <div class="create-line" @click="addLine">
              <i class="iconfont icontianjia"></i>
              新增一行
            </div>
            <el-table
              ref="singleTable"
              :data="ruleForm.add_upd_vip_config_price"
              highlight-current-row
              style="width: 100%"
              class="table"
            >
              <el-table-column property="area" label="划线价">
                <template slot-scope="scope">
                  <div class="price-item">
                    <el-input v-model="scope.row.original_price" maxlength="20" @input="numberOriginalPrice($event,'original_price',scope.$index)" @blur="blurPrice($event,scope.row.sale_price)" />
                    <div class="right-text">元</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column property="print_times" label="售价">
                <template slot-scope="scope">
                  <div class="price-item">
                    <el-input v-model="scope.row.sale_price" maxlength="20" @input="numberOriginalPrice($event,'sale_price',scope.$index)" @blur="blurPriceSale($event,scope.row.original_price)"/>
                    <div class="right-text">元</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column property="print_count" label="订购时长">
                <template slot-scope="{row}">
                  <div class="price-item">
                    <!-- <el-input v-model="ruleForm.name" maxlength="20" /> -->
                    <el-select v-model="row.expiration_date"  placeholder="月份">
                      <el-option v-for="(item) in dates" :key="item" :label="item" :value="item" />
                    </el-select>
                    <!-- <div class="right-text">月</div> -->
                  </div>
                </template>
              </el-table-column>
              <el-table-column property="address" label="操作" width="200">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="删除" placement="top">
                    <i class="iconfont iconshanchulanse" @click="deletePrice(scope.row,scope.$index)"/>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
        <el-form-item label="会员等级：" prop="level_no">
          <div>
            <el-radio v-model="ruleForm.level_no" :label="1" style="margin-right:20px">VIP会员</el-radio>
            <el-radio v-model="ruleForm.level_no" :label="2" style="margin-right:20px">高级VIP</el-radio>
            <el-radio v-model="ruleForm.level_no" :label="3" >超级VIP</el-radio>
          </div>
        </el-form-item>
      </el-form>
      <div class="content-box" v-if="initData.length>0">
        <div class="content-item">
          <div class="title-two">{{initData[0].name}}</div>
          <div class="fun-box">
            <div class="fun-item">
              <div class="text-1"></div>
              <div class="text-2">pc端</div>
              <div class="text-2">AD端</div>
              <div class="text-2">iOS端</div>
            </div>
            <div class="fun-item" v-for="item in initData[0].sons" :key="item.id">
              <div class="text-1">{{item.name}}</div>
              <div class="text-3">
                <el-checkbox v-model="item.checkedPc" :disabled="item.pcPort==2"></el-checkbox>
              </div>
              <div class="text-3">
                <el-checkbox v-model="item.checkedAnd" :disabled="item.adPort==2"></el-checkbox>
              </div>
              <div class="text-3">
                <el-checkbox v-model="item.checkedIos" :disabled="item.iosPort==2"></el-checkbox>
              </div>
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="title-two">{{initData[1].name}}</div>
          <div class="share-box">
            <div class="share-item" v-for="item in initData[1].sons" :key="item.id">
              <div class="share-item-title">{{item.name}}</div>
              <div class="share-item-checkbox"><el-checkbox v-model="item.checked"></el-checkbox></div>
              <div class="share-item-input"> <el-input v-model="item.counts" maxlength="20" /></div>
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="title-two">{{initData[2].name}}</div>
          <div class="fun-box">
            <div class="fun-item">
              <div class="text-user-1"></div>
              <div class="text-2">pc端</div>
              <div class="text-2">AD端</div>
              <div class="text-2">iOS端</div>
            </div>
            <div class="fun-item" v-for="item in initData[2].sons" :key="item.id">
              <div class="text-user-1">{{item.name}}</div>
              <div class="text-3">
                <el-checkbox :disabled="item.pcPort==2" v-model="item.checkedPc"></el-checkbox>
              </div>
              <div class="text-3">
                <el-checkbox :disabled="item.adPort==2" v-model="item.checkedAnd"></el-checkbox>
              </div>
              <div class="text-3">
                <el-checkbox :disabled="item.iosPort==2" v-model="item.checkedIos"></el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button @click="saveData" class="btn-save">保存</el-button>
  </div>
</template>

<script>
import { get_vip_func_menu,add_or_update_vip_config ,get_vip_info_by_id} from '@/api/api'
import { validateName } from '@/utils/validate';
export default {
  data() {
    return {
      dates:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
      ruleForm: {
        level_name: '',
        level_desc:'',
        level_no:1,
        add_upd_vip_config_price:[{"expiration_date":12,
              "original_price":0,
              "sale_price":0}],
        vip_config_cooper:[],
        vip_config_func :[],
        vip_config_iden :[],
        del_vip_config_price :[]
         },
      priceData: [1, 2, 3],
      rules: {
        level_name: [{ required: true, message: '会员名称不能为空' }],
        level_desc: [{ required: true, message: '会员描述不能为空' }],
        level_no: [{ required: true, message: '会员描述不能为空' }],
        add_upd_vip_config_price: [{ required: true, message: '会员价格不能为空' }]
      },
      initData:[]
    };
  },
  created() {


    get_vip_func_menu().then(res=>{
      console.log(res.data)

        res.data[0].sons.forEach(item =>{
          item.checkedPc = false
          item.checkedAnd = false
          item.checkedIos = false
        })
         res.data[1].sons.forEach(item =>{
          item.checked = false
          item.counts = 0
        })
        res.data[2].sons.forEach(item =>{
          item.checkedPc = false
          item.checkedAnd = false
          item.checkedIos = false
        })

      this.initData = res.data
      setTimeout(() => {
      if(this.$route.query.id){
        get_vip_info_by_id({vip_config_id:this.$route.query.id}).then(res=>{
          this.ruleForm.level_name = res.data.vipConfig.levelName
          this.ruleForm.level_desc = res.data.vipConfig.levelDesc
          this.ruleForm.level_no = res.data.vipConfig.levelNo
          var objs = []
          for(var i = 0 ; i < res.data.vipConfigPrice.length ; i++){

            objs.push({
              price_id:res.data.vipConfigPrice[i].id,
              "expiration_date":res.data.vipConfigPrice[i].expirationDate,
              "original_price":res.data.vipConfigPrice[i].originalPrice,
              "sale_price":res.data.vipConfigPrice[i].salePrice
            })
          }

          this.ruleForm.add_upd_vip_config_price = objs
          var objs2 = []
          for(var i = 0 ; i < res.data.vipConfigFunc.length ; i++){
            this.initData[0].sons[i].checkedPc=res.data.vipConfigFunc[i].pcPort==1?true:false
            this.initData[0].sons[i].checkedAnd=res.data.vipConfigFunc[i].adPort==1?true:false
            this.initData[0].sons[i].checkedIos=res.data.vipConfigFunc[i].iosPort==1?true:false
          }
          for(var i = 0 ; i < res.data.vipConfigCooper.length ; i++){
            this.initData[1].sons[i].counts = res.data.vipConfigCooper[i].counts
            this.initData[1].sons[i].checked = res.data.vipConfigCooper[i].enable==1?true:false
          }
          for(var i = 0 ; i < res.data.vipConfigIden.length ; i++){
            this.initData[2].sons[i].checkedPc=res.data.vipConfigIden[i].pcPort==1?true:false
            this.initData[2].sons[i].checkedAnd=res.data.vipConfigIden[i].adPort==1?true:false
            this.initData[2].sons[i].checkedIos=res.data.vipConfigIden[i].iosPort==1?true:false
          }

        })
        }
              }, 0);
    })
  },
  methods: {
    blurPrice(e,salePrice){
      if(parseFloat(e.currentTarget.value) < salePrice){
        this.$message.error('原价不能比销售价低!')
      }
    },
    blurPriceSale(e,original_price){
      if(parseFloat(e.currentTarget.value) > original_price){
        this.$message.error('原价不能比销售价低!')
      }
    },
    numberOriginalPrice(value, item,index) {
      setTimeout(() => {
         this.ruleForm.add_upd_vip_config_price[index][item] = (value.match(/^\d*(\.?\d{0,2})/g)) ? value.match(/^\d*(\.?\d{0,2})/g)[0] : ''
      }, 0)
    },
    deletePrice(item,index){
      if(item.price_id)
      this.ruleForm.del_vip_config_price.push(item.price_id)
      this.ruleForm.add_upd_vip_config_price.splice(index,1)
    },
    addLine(){
      this.ruleForm.add_upd_vip_config_price.push({
        "expiration_date":12,
        "original_price":0,
        "sale_price":0
      })
    },
    saveData(){

      var vip_config_func = []
      var vip_config_cooper = []
      var vip_config_iden  = []
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          this.initData[0].sons.forEach(item=>{
        vip_config_func.push({
          menu_id:item.id,
          menu_mark:item.markName,
          pc_port:item.checkedPc?1:0,
          ad_port:item.checkedAnd?1:0,
          ios_port:item.checkedIos?1:0
        })

      })
      this.initData[1].sons.forEach(item=>{
        vip_config_cooper.push({
          menu_id:item.id,
          menu_mark:item.markName,
          counts:item.counts,
          enable:item.checked?1:0
        })
      })
      this.initData[2].sons.forEach(item=>{
        vip_config_iden.push({
          menu_id:item.id,
          menu_mark:item.markName,
          pc_port:item.checkedPc?1:0,
          ad_port:item.checkedAnd?1:0,
          ios_port:item.checkedIos?1:0
        })
      })
      add_or_update_vip_config({
        vip_id:this.$route.query.id,
        level_name:this.ruleForm.level_name,
        level_desc :this.ruleForm.level_desc ,
        level_no :this.ruleForm.level_no,
        del_vip_config_price:this.ruleForm.del_vip_config_price.join(','),
        add_upd_vip_config_price :JSON.stringify(this.ruleForm.add_upd_vip_config_price),
        // del_vip_config_price :JSON.stringify(del_vip_config_price),
        vip_config_cooper:JSON.stringify(vip_config_cooper),
        vip_config_func :JSON.stringify(vip_config_func),
        vip_config_iden :JSON.stringify(vip_config_iden),
      }).then(res=>{
        if(res.code==100){
          this.$message.success('保存成功')
          this.$router.push({name:'memberList'})
        }
      })
        }
      })

    }
  }
};
</script>


