import request from '@/utils/request'

// 获取员工列表
export function apiGetEmployeeList(req) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params: {
      page: req.page,
      pagesize: req.pagesize,
      keyword: req.keyword,
      departmentId: req.departmentId
    }
  })
}

// excel导出
export function apiGetexcel() {
  return request({
    url: '/sys/user/export',
    // 改变接收数据的类型
    responseType: 'blob' // 使用blob接收二进制文件流
  })
}
// 批量 - 下载导入员工模板
export function apiImportTem() {
  return request({
    url: '/sys/user/import/template',
    method: 'GET',
    // 改变接收数据的类型
    responseType: 'blob' // 使用blob接收二进制文件流
  })
}
// 批量 - 上传导入员工模板
export function apiUserImport(file) {
  return request({
    url: '/sys/user/import',
    method: 'POST',
    data: file
  })
}
// 删除员工
export function apiDeleteUser(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
// 新增员工
export function apiPostUser(req) {
  return request({
    url: `/sys/user`,
    method: 'POST',
    data: {
      username: req.username,
      mobile: req.mobile,
      formOfEmployment: req.formOfEmployment,
      departmentId: req.departmentId,
      timeOfEntry: req.timeOfEntry,
      correctionTime: req.correctionTime
    }
  })
}
// 获取员工信息
export function apiGeUser(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}
// 修改单个员工信息
export function apiPutUser(id, req) {
  return request({
    url: `/sys/user/${id}`,
    method: 'PUT',
    data: {
      username: req.username,
      id: req.id,
      mobile: req.mobile,
      formOfEmployment: req.formOfEmployment,
      departmentId: req.departmentId,
      timeOfEntry: req.timeOfEntry,
      correctionTime: req.correctionTime
    }
  })
}
