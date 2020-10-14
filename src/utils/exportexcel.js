import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export function exportExcel() {
  /* generate workbook object from table */
  var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
  /* get binary string as output */
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(new Blob([wbout], {
      type: 'application/octet-stream'
    }), 'sheetjs.xlsx')
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}
