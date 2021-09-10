import Cookies from 'js-cookie'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) =>
  Cookies.set(sidebarStatusKey, sidebarStatus)

// User
const tokenKey = 'vue_typescript_admin_access_token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)

// Company
const companyCodeKey = 'vue_typescript_company_code'
export const getCompanyCode = () => Cookies.get(companyCodeKey)
export const setCompanyCode = (code: string) =>
  Cookies.set(companyCodeKey, code)
export const removeCompanyCode = () => Cookies.remove(companyCodeKey)
