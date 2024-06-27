import request from '@/utils/request'

// 获取部门列表
export function apiGetPartList() {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}
// 获取 - 部门负责人列表
export function apiGetSimple() {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}
// 新增部门
export function apiPostDepartment(req) {
  return request({
    url: '/company/department',
    method: 'POST',
    data: {
      code: req.code,
      introduce: req.introduce,
      managerId: req.managerId,
      name: req.name,
      pid: req.pid
    }
  })
}
// 获取部门详情
export function apiGetCompanyDepart(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}
// 修改部门详情
export function apiPutCompanyDepartment(id, req) {
  return request({
    url: `/company/department/${id}`,
    method: 'PUT',
    data: {
      id: req.id,
      pid: req.pid,
      name: req.name,
      code: req.code,
      managerId: req.managerId,
      introduce: req.introduce,
      createTime: req.createTime
    }
  })
}
export function apiDeletePepartment(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
