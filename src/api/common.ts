import request from '@/utils/request'

export const getList = (url: string, params: any) =>
  request({
    url,
    method: 'get',
    params
  })

export const getSingle = (url: string) => request({ url, method: 'get' })

export const getAttrOpts = (url: string) => request({ url, method: 'get' })

export const addSingle = (url: string, data: object) =>
  request({
    url: `api${url}`,
    method: 'post',
    data
  })

export const editSingle = (url: string, data: object) =>
  request({ url: `api${url}`, method: 'put', data })
