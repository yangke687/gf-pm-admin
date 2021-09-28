import { RouterView } from '@/layout/components'

export default [
  {
    path: '/settings/message',
    component: () =>
      import(
        /* webpackChunkName: "settings-message" */ '@/views/dashboard/index.vue'
      ),
    meta: {
      title: '消息管理'
    },
    children: []
  },

  {
    path: '/settings/wechat',
    component: () =>
      import(
        /* webpackChunkName: "settings-wechat" */ '@/views/dashboard/index.vue'
      ),
    meta: {
      title: '微信管理'
    },
    children: []
  },

  {
    path: '/settings/sys',
    component: RouterView,
    meta: {
      title: '系统管理'
    },
    children: [
      {
        path: '/settings/sys/menu',
        component: () =>
          import(
            /* webpackChunkName: "settings-sys-menu" */ '@/views/common/list.vue'
          ),
        meta: {
          title: '菜单管理',
          icon: 'icon-menu'
        }
      },

      {
        path: '/settings/sys/deps',
        component: () =>
          import(
            /* webpackChunkName: "settings-sys-menu" */ '@/views/common/list.vue'
          ),
        meta: {
          title: '组织机构管理',
          icon: 'icon-menu'
        }
      }
    ]
  }
]
