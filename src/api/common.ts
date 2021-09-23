import request from '@/utils/request'

export const getList = (url: string, params: any) =>
  request({
    url,
    method: 'get',
    params
  })
