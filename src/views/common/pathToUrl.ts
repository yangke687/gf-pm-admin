export default (path: string): string => {
  switch (path) {
    // 菜单管理
    case '/settings/sys/menu':
      return '/api/admin/menuList'
    default:
      return path
  }
}
