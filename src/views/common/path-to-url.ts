export default (path: string): string => {
  switch (path) {
    case '/settings/sys/menu':
      return '/api/admin/menuList'
    case '/settings/sys/deps':
      return '/api/admin/departmentList'
    case '/settings/sys/dicts':
      return '/api/admin/codeList'
    case '/settings/sys/users':
      return '/api/admin/userList'
    case '/settings/sys/logs':
      return '/api/admin/logList'
    case '/settings/sys/sql':
      return '/api/admin/sqlSetList'
    case '/settings/sys/config':
      return '/api/admin/configList'
    default:
      return path
  }
}
