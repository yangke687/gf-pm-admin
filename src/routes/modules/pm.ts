import { RouterView } from '@/layout/components'

export default [
  {
    path: '/pm/estate',
    component: RouterView,
    meta: {
      title: '楼盘管理'
    },
    children: [
      {
        path: '/pm/estate/info',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: '楼盘信息管理',
          icon: 'icon-building'
        }
      },
      {
        path: '/pm/estate/perm',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: '楼盘权限管理',
          icon: 'icon-paper-lock'
        }
      },
      {
        path: '/pm/estate/doc',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: '楼盘文档管理',
          icon: 'icon-paper'
        }
      }
    ]
  },
  {
    path: '/pm/takeover',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
    meta: {
      title: '承接查验'
    }
  },
  {
    path: '/pm/house-inspect',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
    meta: {
      title: '验房管理'
    }
  },
  {
    path: '/pm/owner',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
    meta: {
      title: '业主管理'
    }
  }
]
