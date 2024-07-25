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
