import request from '@/utils/request'

// 获取首页数据
export function apiHomeInfo() {
  return request({
    url: '/home/data',
    method: 'GET'
  })
}

// 获取消息通知
export function apiHomeNotice() {
  return request({
    url: '/home/notice',
    method: 'GET'
  })
}
