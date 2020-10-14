import request from '@/utils/request'

export function getCompanyInfor() {
  return request({
    url: 'api/company/login.json',
    method: 'get'
  })
}
