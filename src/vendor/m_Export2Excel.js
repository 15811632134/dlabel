require('script-loader!file-saver')
import XLSX from 'xlsx-style'
import XLSX2 from 'xlsx'

function datenum(v, date1904) {
  if (date1904) v += 1462
  var epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {}
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  }
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      var cell = {
        v: data[R][C]
      }
      if (cell.v == null) continue
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      })

      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else cell.t = 's'

      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook()
  this.SheetNames = []
  this.Sheets = {}
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

// 通过table标签渲染导出表格
export function export_table_to_excel({
  id,
  filename,
  bookType = 'xlsx',
  styleFun
} = {}) {
  var table = document.querySelector(id)
  var ws = XLSX2.utils.table_to_sheet(table)
  styleFun(ws)
  var wb = XLSX2.utils.book_new()
  XLSX2.utils.book_append_sheet(wb, ws, 'SheetJS')
  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  })
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }
  saveAs(new Blob([s2ab(wbout)], { type: '' }), filename + '.' + bookType)
}

// 通过json渲染导出表格
export function export_json_to_excel({
  multiHeader = [],
  header,
  data,
  styleFun,
  filename,
  merges = ['A1:H1', 'A2:C2', 'D2:F2', 'G2:H2', 'A3:C3', 'D3:F3', 'G3:H3', 'A4:H4', 'A5:H5'],
  autoWidth = true,
  bookType = 'xlsx'
} = {}) {
/* original data */
  filename = filename || 'excel-list'
  data = [...data]
  data.unshift(header)

  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }
  data.splice(0, 0, ['资产领用单', '', '', '', '', '', '', ''])
  data.splice(1, 0, ['领用单号：', '', '', '领用日期：', '', '', '领用人：', ''])
  data.splice(2, 0, ['领用公司：', '', '', '领用部门：', '', '', '领用后区域：', ''])
  data.splice(3, 0, ['领用后存放地点：', '', '', '', '', '', '', ''])
  data.splice(4, 0, ['领用备注：', '', '', '', '', '', '', ''])
  data.splice(5, 0, ['领用明细：', '', '', '', '', '', '', ''])
  var ws_name = 'SheetJS'
  // eslint-disable-next-line one-var
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data)
  styleFun(ws)
  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = []
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }
  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name)
  wb.Sheets[ws_name] = ws
  // alert(ws_name)
  var dataInfo = ws
  console.log(wb)
  wb.showGridLines = true
  console.log(ws)
  const borderAll = { // 单元格外侧框线
    top: {
      style: 'thin'
    },
    bottom: {
      style: 'thin'
    },
    left: {
      style: 'thin'
    },
    right: {
      style: 'thin'
    }
  }
  // 给所以单元格加上边框
  for (var i in dataInfo) {
    if (i.substr(1) <= 6) {
      dataInfo[i + ''].s = {
        border: {},
        alignment: {
          vertical: 'center'
        }}
      if (i.substr(1) === 6) {
        dataInfo[i + ''].s = {

          alignment: {
            vertical: 'center'
          }
        }
      }
    } else if (i === '!ref' || i === '!merges' || i === '!cols' || i === 'A1') {
    } else {
      dataInfo[i + ''].s = {
        border: borderAll,
        alignment: {
          vertical: 'center'
        }}
    }
    if (i.substr(1) === '6') {
      dataInfo[i + ''].s = {
        font: {
          sz: 20,
          bold: true,
          color: {
            rgb: '000000'
          }
        },
        alignment: {
          vertical: 'center'
        }
      }
    }
  }

  // 去掉标题边框
  const arr = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1', 'R1', 'S1', 'T1', 'U1', 'V1', 'W1', 'X1', 'Y1', 'Z1']
  arr.some((v, index) => {
    if (index === 0) {
      dataInfo[v].s = {
        font: {
          sz: 20,
          bold: true,
          color: {
            rgb: '000000'
          }
        },
        alignment: {

          horizontal: 'center',
          vertical: 'center'
        }}
    }
    // if (index <= 6) {
    //   dataInfo[v].s = {}
    // }
    // const a = merges[0].split(':')
    // if (v === a[1]) {
    //   dataInfo[v].s = {}
    //   return true
    // } else {
    //   dataInfo[v]
    //   dataInfo[v].s = {}
    // }
    // console.log(v[1])
    // console.log(index)
  })
  if (autoWidth) {
    var cols = data.map(() => {
      return {
        'wpx': 100
      }
    })
    var rows = data.map(() => {
      return {
        'hpx': 30
      }
    })
    ws['!cols'] = cols
    ws['!rows'] = rows
  }

  var wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary',
    showGridLines: false
  })
  saveAs(new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  }), `${filename}.${bookType}`)
}
