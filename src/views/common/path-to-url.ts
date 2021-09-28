export default (path: string): string => {
  switch (path) {
    // 菜单管理
    case '/settings/sys/menu':
      return '/api/admin/menuList'
    // 组织机构管理
    case '/settings/sys/deps':
      return '/api/admin/departmentList'
    default:
      return path
  }
}
