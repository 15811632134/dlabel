import { uploadPic, upload_firmware_package } from '@/api/api'
import moment from 'moment'
const mixin = {
  data() {
    return {
      // 列表数据
      tableList: [],
      tableLists: {
        data1: [],
        data2: [],
        data3: [],
        data4: []
      },
      text: '11',
      widthauto: '',
      // 新增修改弹窗
      isdialog: false,
      // 当前页数
      currentpage: 1,
      // 总条数
      totalnumber: 10,
      pagesize: 10,
      // 放大图片
      isEnlarge: false,
      // 放大图片路径
      imgPath: '',
      // 上传图片成功路径
      sourceUrl: '',
      ispercent: false,
      isfile: false,
      oldName: '',
      // 上传其他成功路径
      fileUrl: '',
      pickerOptions: {
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
      // 搜索关键字
      keywords: '',
      // 列表查询api
      listapi: '',
      // 判断上传文件类型(0图片，1其他文件)
      filetype: 0,
      uploadid: '',
      percent: 0
    }
  },
  created() { },
  methods: {
    // 获取列表数据
    async getListData(data, url) {
      const res = await url(data)
      if (res.code === 100) {
        this.tableList = res.data.list
        this.totalnumber = res.data.total
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    async getListDataFile(data, url, obj) {
      var temp = JSON.parse(JSON.stringify(data))
      delete temp.isFile
      const res = await url(temp)
      if (res.code === 100) {
        this.tableLists[obj] = res.data.list
        this.totalnumber = res.data.total
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    async getListDataLx(data, url) {
      const res = await url(data)
      if (res.code === 100) {
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
    handleSearch() {
      this.currentpage = 1
      this.listQuery.pageNo = 1
      this.listQuery.pageSize = 10
      this.getListData(this.listQuery, this.listapi)
    },
    // 确认新增列表数据
    buildNewData() {
      this.isEdit = false
      this.isdialog = true
    },
    deleteUploadImg(image) {
      this.sourceUrl = ''
      this.ruleForm[image] = ''
    },
    chooseTime(time) {
      this.endTime = moment().format('YYYY-MM-DD')
      if (time === 'week') {
        this.startTime = moment()
          .subtract(7, 'days')
          .format('YYYY-MM-DD')
      } else if (time === 'month') {
        this.startTime = moment()
          .subtract(1, 'months')
          .format('YYYY-MM-DD')
      } else {
        this.startTime = moment()
          .subtract(3, 'months')
          .format('YYYY-MM-DD')
      }
      this.selectDate = [this.startTime, this.endTime]
      this.listQuery.startTime = this.startTime
      this.listQuery.endTime = this.endTime
    },
    changeTime() {
      this.startTime = this.selectDate[0]
      this.endTime = this.selectDate[1]
      this.listQuery.startTime = this.selectDate[0]
      this.listQuery.endTime = this.selectDate[1]
      this.selectDate = [this.startTime, this.endTime]
    },
    // 新增修改列表数据
    async addListData(formName, url, editurl, status, apiname, queryData, name) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const apiurl = status ? editurl : url
          const res = await apiurl(this.ruleForm)
          if (res.code === 100) {
            this.$refs[formName].resetFields()
            this.isdialog = false
            if (queryData === 'icon') {
              console.log(apiname)
              console.log('apiname')
              this.getIconList()
            } else if (name === 'role') {
              console.log(apiname)
              console.log('apiname')
              this.getListDataLx(queryData, apiname)
            } else {
              this.getListData(queryData, apiname)
            }
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
    // 删除列表数据
    deleteData(id, url, apiname, data) {
      this.$confirm('删除后将无法恢复，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await url({ id })
        if (res.code === 100) {
          const totalpage = Math.ceil((this.totalnumber - 1) / this.pagesize)
          const currentpage = this.currentpage > totalpage ? totalpage : this.currentpage
          this.currentpage = currentpage < 1 ? 1 : currentpage
          this.getListData(Object.assign(data, { pageNo: this.currentpage, pageSize: this.pagesize }), apiname)
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
    // 编辑列表数据
    editData(row) {

    },
    // 重置表单数据
    resetForm() {
      this.isdialog = false
    },
    // 放大缩略图
    enlargeImage(imgpath) {
      this.imgPath = imgpath
      this.isEnlarge = true
    },
    /**
     * @description: 上传单文件
     * @param {type}  //event上传事件对象,
     * filetype上传类型
     * 1:系统模板缩略图，2、系统模板文件，3：系统背景,4:系统边框，5：系统标志，6：系统字体,7：打印机，8：扫码新建打印机，9：公司LOGO，10：友商申请资料， 11：启动页 12：轮播图 13、图片教程
     * field:清空提醒字段
     * size 上传文件大小上线
     * @return:
     */
    // (event上传事件对象，filetype上传类型)
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
        const res = await uploadPic(form, filetype)
        this.ispercent = false
        this.ruleForm[field] = res.data.sourceUrl
        this.uploadid = res.data.id
        if (this.ruleForm.name === '') {
          this.ruleForm.name = res.data.oldName.split('.')[0]
        }
        if (isfile) {
          this.oldName = res.data.oldName
        }
        this.$refs['ruleForm'].clearValidate(field)
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
    // (event上传事件对象，filetype上传类型)
    async uploadChange_LX(event, filetype, field, isfile) {
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
        const res = await upload_firmware_package(form)
        this.ispercent = false
        this.ruleForm[field] = res.data.sourceUrl
        this.uploadid = res.data.id

        if (this.ruleForm.name === '') {
          this.ruleForm.name = res.data.oldName.split('.')[0]
        }
        if (isfile) {
          this.oldName = res.data.oldName
        }
        this.$refs['ruleForm'].clearValidate(field)
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
    async uploadChange_M(event, filetype, status, url) {
      this.filetype = status ? 0 : 1
      const file = event.target.files[0]
      const form = new FormData()
      form.append('fileData', file)
      const config = (progressEvent) => {
        if (progressEvent.lengthComputable) {
          this.percentage = (progressEvent.loaded / progressEvent.total * 100 | 0)
        }
      }
      const res = await uploadPic(form, filetype, config)
      if (res.code === 100) {
        if (status === 0) {
          this.sourceUrl = res.data.sourceUrl
          this.$refs['ruleForm'].clearValidate([url])
          this.ruleForm[url] = res.data.sourceUrl
          this.uploadid = res.data.id
        } else {
          this.fileUrl = res.data.sourceUrl
          this.$refs['ruleForm'].clearValidate(url)
          this.ruleForm[url] = res.data.sourceUrl
        }
        this.$message({
          showClose: true,
          message: '上传成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 删除上传文件
    deleteUpload(field) {
      this.ruleForm[field] = ''
      this.ruleFormBrand[field] = ''
      // this.$refs[field].value = ''
    },
    showTime(val) {
      // var remainder = val % 1000
      val = Math.floor(val)
      // val = parseInt(val / 1000)
      if (val < 60) {
        val = val < 10 ? ('0' + val) : val
        return '00:00:' + val
      } else {
        var min_total = Math.floor(val / 60)
        var sec = Math.floor(val % 60)
        if (min_total < 60) {
          return '00:' + (min_total > 9 ? min_total : ('0' + min_total)) + ':' + (sec > 9 ? sec : ('0' + sec))
        } else {
          var hour_total = Math.floor(min_total / 60)
          var min = Math.floor(min_total % 60)
          return (hour_total > 9 ? hour_total : ('0' + hour_total)) + ':' + (min > 9 ? min : ('0' + min)) + ':' + (sec > 9 ? sec : ('0' + sec))
        }
      }
    },
    // pageSize 改变时会触发
    handleSizeChange(val, params) {
      this.pagesize = val
      if (this.listQuery.pageNo) {
        // params.pageNo = val
        this.listQuery.pageSize = this.pagesize
        this.getListData(this.listQuery, this.listapi)
      } else {
        // params.page_no = val
        this.listQuery.page_size = this.pagesize
        this.getListDataLx(this.listQuery, this.listapi)
      }
    },
    handleSizeChangeFile(val) {
      this.listQuery.pageSize = val
      this.getListDataFile(this.listQuery, this.listapi, this.tempData[this.barIndex])
    },
    onLoad(e) {
      const img = e.target
      let width = 0
      if (img.fileSize > 0 || (img.width > 1 && img.height > 1)) {
        width = img.width + 40
      }
      this.widthauto = width + 'px'
    },

     scrollToTop (duration) {
        // cancel if already on top
        if (document.scrollingElement.scrollTop === 0) return;

        const totalScrollDistance = document.scrollingElement.scrollTop;
        let scrollY = totalScrollDistance, oldTimestamp = null;

        function step (newTimestamp) {
            if (oldTimestamp !== null) {
                // if duration is 0 scrollY will be -Infinity
                scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / duration;
                if (scrollY <= 0) return document.scrollingElement.scrollTop = 0;
                document.scrollingElement.scrollTop = scrollY;
            }
            oldTimestamp = newTimestamp;
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.scrollToTop(300)
      // document.documentElement.scrollTop = 0
      if (this.listQuery.pageNo && !this.listQuery.isFile) {
        this.listQuery.pageNo = val
        this.listQuery.pageSize = this.pagesize
        this.getListData(this.listQuery, this.listapi)
      } else if (this.listQuery.isFile) {
        this.listQuery.pageNo = val
        this.listQuery.pageSize = this.listQuery.pageSize
        this.getListDataFile(this.listQuery, this.listapi, this.tempData[this.barIndex])
      } else {
        this.listQuery.page_no = val
        this.listQuery.page_size = this.pagesize

        this.getListDataLx(this.listQuery, this.listapi)
      }
      if (this.isFeed) {
        document.documentElement.scrollTop = '0px'
      }
    }
  }
}
export default mixin
