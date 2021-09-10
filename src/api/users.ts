import request from '@/utils/request'

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const login = ({
  username,
  password,
  companyCode
}: {
  username: string
  password: string
  companyCode: string
}) =>
  request({
    url: '/api/admin/login',
    method: 'post',
    data: {
      un: username,
      pwd: password,
      companyCode
    }
  })

export const logout = () =>
  request({
    url: '/admin/logout',
    method: 'post'
  })
