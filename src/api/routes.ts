import request from '@/utils/request'

export const getRoutes = () =>
  request({
    url: '/oa/menutest/getSysMenu.do',
    method: 'get'
  })
