import request from '@/utils/request'

export function carouselList(query) {
  return request({
    url: 'api/label/slideimg/select/page/' + query.page + '/' + query.page_size,
    method: 'get',
    params: query
  })
}
