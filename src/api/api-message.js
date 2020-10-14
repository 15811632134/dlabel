import request from '@/utils/request-message'
import qs from 'qs'
// 查询通告
export function noticeList(query) {
  return request({
    url: `api/notice/list.json`,
    method: 'get',
    params: query
  })
}
// 修改横幅信息
export function noticeUpdate(query) {
  return request({
    url: `api/notice/update.json`,
    method: 'put',
    data: qs.stringify( query)
  })
}

