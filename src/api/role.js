import request from '@/utils/request'

// 获取表格列表
export function apiGetList(params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params: {
      page: params.page,
      pagesize: params.pagesize
    }
  })
}
// 添加角色
export function apiPostRole(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data: {
      name: data.name,
      description: data.description,
      state: data.state
    }
  })
}
// 修改角色
export function apiPutRole(editObj) {
  return request({
    url: `/sys/role/${editObj.id}`,
    method: 'PUT',
    data: {
      id: editObj.id,
      name: editObj.name,
      description: editObj.description,
      state: editObj.state
    }
  })
}
// 删除角色
export function apiDeleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE',
    params: {
      id
    }
  })
}
