<template>
  <div class="app-container">
    <div class="app-menu">
      <h3>全部（58）</h3>
      <ul>
        <li>度点（50）</li>
        <li>度点（50）</li>
        <li>度点（50）</li>
        <li>度点（50）</li>
        <li>度点（50）</li>
      </ul>
    </div>
    <div class="app-content">
      <div class="filter-container">
        <div class="search m_search">
          <el-input v-model="keyword" placeholder="请输入角色名称" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </div>
      </div>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        class="table"
      >
        <el-table-column type="index" label="序号" width="80"/>
        <el-table-column property="name" label="缩略图" />
        <el-table-column property="describe" label="字体名称" />
        <el-table-column property="number" label="语言" class="accnumber">
          <template slot-scope="{row}">
            <a class="accnumber">{{ row.number }}</a>
          </template>
        </el-table-column>
        <el-table-column property="address" label="操作" width="200">
          <template slot-scope="{row}">
            <i class="el-icon-edit" @click="confirmEdit(row)" />
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <i class="iconxiugai iconfont" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.page_size"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
// import {
//   fontList,
//   uploadPic,
//   fontsInsert
// } from '@/api/api'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  filters: {},
  data() {
    return {
      keyword: '',
      tableData: [
        {
          name: 'fruit-1',
          apple: 'apple-10',
          banana: 'banana-10',
          orange: 'orange-10'
        },
        {
          name: 'fruit-2',
          apple: 'apple-20',
          banana: 'banana-20',
          orange: 'orange-20'
        }
      ],
      currentRow: null,
      total: 10,
      listQuery: {
        page: 1
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    getList() {
      this.tableData = []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  justify-content: flex-end;
}
/deep/ .pagination-container {
  text-align: right;
}
</style>
