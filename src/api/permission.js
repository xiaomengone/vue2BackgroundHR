import request from '@/utils/request'

// 获取表格列表
export function apiGetPerissionList() {
  return request({
    url: '/sys/permission',
    method: 'GET'
  })
}
// 新增权限
export function apiPostPer(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

// 获取单个权限详情
export function apiGetPer(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'GET'
  })
}
// 修改权限
export function apiPutPer(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}
// 删除权限
export function apiBelePer(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}
