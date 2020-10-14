<template>
  <div>
    <el-row class="panel-group row-bg" :gutter="30"  justify="space-between">
      <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col grid-content">
        <div class="card-panel"  @click="checkUserAll($event)">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text" >用户总数</div>
            <count-to
              :start-val="0"
              :end-val="datas.totle"
              :duration="500"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4"  class="card-panel-col grid-content">
        <div class="card-panel " @click="checkUserAll($event)">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="peoples" class-name="card-panel-icon "/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">新增用户数</div>
            <count-to
              :start-val="0"
              :end-val="datas.new_users"
              :duration="500"
              class="card-panel-num"
            />
            <div class="yesterday">昨日新增 <span style="color:#369bf9">{{datas['ye-new']}}</span> 人</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4"  class="card-panel-col grid-content">
        <div class="card-panel" @click="checkUserAll($event)">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">新增用户数</div>
            <count-to
              :start-val="0"
              :end-val="datas.new_users"
              :duration="500"
              class="card-panel-num"
            />
            <div class="yesterday">昨日新增 <span style="color:#369bf9">{{datas['ye-new']}}</span> 人</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4"  class="card-panel-col grid-content">
        <div class="card-panel" @click="checkUserAll($event)">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">用户活跃量</div>
            <count-to
              :start-val="0"
              :end-val="datas.active"
              :duration="500"
              class="card-panel-num"
            />
            <div class="yesterday">昨日活跃 <span style="color:#369bf9">{{datas['ye-user']}}</span> 人</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="4"  class="card-panel-col grid-content">
        <div class="card-panel" @click="checkUserAll($event)">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">用户活跃量</div>
            <count-to
              :start-val="0"
              :end-val="datas.active"
              :duration="500"
              class="card-panel-num"
            />
            <div class="yesterday">昨日活跃 <span style="color:#369bf9">{{datas['ye-user']}}</span> 人</div>
          </div>
        </div>
      </el-col>
      <!-- <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Shoppings</div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
      </el-col>-->
    </el-row>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import { userVisitor } from "@/api/article";
export default {
  components: {
    CountTo
  },
  data() {
    return {
      datas: {}
    };
  },
  methods: {
    // handleSetLineChartData(type) {
    //   this.$emit("handleSetLineChartData", type);
    // },
    initData(device){
      userVisitor({device:device}).then(res => {
      // this.datas = res.data.results;
      this.datas = [];
      CountTo.start();
    });
    },
    checkUserAll(e){

      console.log(e)
    }
  },
  created() {

  },

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  // margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    border:1px solid #fff;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    // border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      border:1px solid #40c9c6;
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .yesterday{
        margin-top:10px;
        font-size:12px;
      }
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}

</style>
