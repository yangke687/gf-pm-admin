import request from '@/utils/request'

export const getList = (url: string, params: any) =>
  request({
    url,
    method: 'get',
    params
  })

export const getAttrOpts = (url: string) => request({ url, method: 'get' })

// 创建实体
export const addEntity = (url: string, data: object) =>
  request({
    url: `api${url}`,
    method: 'post',
    data
  })
