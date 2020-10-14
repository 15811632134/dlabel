<style lang="scss">
.permissionList {
  .item {
    margin-top: 32px;
    margin-bottom: 24px;
    border-bottom: 1px solid rgba(221, 221, 221, 1);
    .itemTitle {
      margin-bottom: 25px;
    }
  }
  .savePermission {
    width: 160px;
    height: 40px;
    background: rgba(34, 116, 229, 1);
    border-radius: 24px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .cancelPermission {
    width: 160px;
    height: 40px;
    border-radius: 24px;
    border: 1px solid rgba(0, 0, 0, 1);
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .btnPermission {
    padding-bottom: 50px;
  }
}
</style>
<template>
  <div class="permissionList">
    <div v-for="item in list" :key="item.id" class="item">
      <div class="itemTitle">{{item.name}}</div>
      <div v-for="(_item,findex) in item.children" :key="_item.id">
        <el-checkbox
          :disabled="_item.usable==0" :checked="_item.usable==0"
          v-model="_item.flag"
          @change="handleCheckAllChange(_item,findex)"
        >{{_item.name}}</el-checkbox>
        <div style="margin: 17px 25px;">
          <el-checkbox
            :disabled="child.usable==0" :checked="child.usable==0"
            style="margin-bottom:17px"
            v-model="child.flag"
            @change="changeItem(child,_item)"
            v-for="child in _item.children"
            :label="child.name"
            :key="child.id"
          >{{child.name}}</el-checkbox>
        </div>
      </div>
    </div>
    <div>
      <div class="btnPermission" v-show="list.length>0">
        <el-button class="savePermission" @click="savePermission">保存</el-button>
        <el-button class="cancelPermission" @click="cancelPermission">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMallBusinessAuthorityList,
  getMallSysAuthorityListByCompany,
  saveMallCompanyAuthority
} from "@/api/api";
export default {
  created() {
    this.companyId = this.$route.query.id;
    getMallSysAuthorityListByCompany({ companyId: this.companyId }).then(response => {
      this.rolePermission = response.data;
      for (var i = 0; i < this.rolePermission.length; i++) {
        this.str.push(this.rolePermission[i].id);
      }
      getMallBusinessAuthorityList().then(res => {
        var data = res.data;
        for (var i = 0; i < data.length; i++) {
          // data[i].flag = true
          this.calcData(data[i].children);
        }
        this.list = data;
      });
    });
    // setTimeout(() => {
    //   console.log(this.str)
    // }, 5000);
  },
  data() {
    return {

      checkAll: false,
      companyId: -1,
      checkedCities: [],
      cities: [],
      rolePermission: [],
      list: [],
      str: [],
      isIndeterminate: false
    };
  },
  methods: {
    savePermission() {
      this.str = [];
      console.log('aaaaa')
      console.log(this.list)
      for (var i = 0; i < this.list.length; i++) {
        var flag = false
        console.log(this.list[i])
        for(var j = 0 ; j < this.list[i].children.length;j++){

          if(this.list[i].children[j].flag){
            flag = true
            break
          }
        }
        if(flag){
          this.str.push(this.list[i].id);
        }
        this.calcDataToStr(this.list[i].children);
      }
      saveMallCompanyAuthority({
        companyId: this.companyId,
        authorities: this.str.join(",")
      }).then(res => {
        this.$message({
          message: "已保存",
          type: "success"
        });
      });
    },
    cancelPermission() {
      this.$router.push({ name: "role" });
    },
    calcData(data) {
      for (var i = 0; i < data.length; i++) {
        if (this.str.indexOf(data[i].id) != -1) data[i].flag = true;
        else data[i].flag = false;
        if (data[i].children) this.calcData(data[i].children);
      }
    },
    calcDataToStr(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].flag) {
          this.str.push(data[i].id);
        }
        if (data[i].children.length > 0) {
          data[i].fatherFlag = [];
          this.calcDataToStr(data[i].children);
        }
      }
    },
    handleCheckAllChange(item,index) {
      if (item.flag == true) {
        item.children.forEach(element => {
          element.flag = true;
        });
      } else {
        item.children.forEach(element => {
          element.flag = false;
        });
      }
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
    },
    changeItem(value, item) {
      var flag = false;
      item.children.forEach(element => {
        if (element.flag) {
          flag = true;
        }
      });
      if (flag) item.flag = true;
    }
  }
};
</script>


