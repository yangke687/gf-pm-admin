import Layout from '@/layout/index.vue'
import settings from './modules/settings'
import pm from './modules/pm'

export default [
  // 通用
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: { hidden: true }
  },
  // 主入口
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: '工作台',
          hidden: true
        }
      },
      {
        path: '/call-center',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/call-center/index.vue'
          ),
        meta: {
          hidden: true
        }
      },
      {
        path: '/serv-center',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/serv-center/index.vue'
          ),
        meta: {
          hidden: true
        }
      },
      {
        path: 'secure-center',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/secure-center/index.vue'
          ),
        meta: {
          hidden: true
        }
      },
      {
        path: 'engineer-center',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/engineer-center/index.vue'
          ),
        meta: {
          hidden: true
        }
      }
    ]
  },
  // 云物业
  {
    path: '/pm',
    component: Layout,
    meta: {
      title: '云物管'
    },
    children: pm
  },
  // 云办公
  {
    path: '/oa',
    component: Layout,
    meta: {
      title: '云办公'
    },
    children: [
      {
        path: '/oa/task',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: '我的工作'
        }
      },
      {
        path: '/oa/hr',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: '人事管理'
        }
      },
      {
        path: '/oa/politic',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: '行政管理'
        }
      },
      {
        path: '/oa/finance',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: '财务管理'
        }
      },
      {
        path: '/oa/ration',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: '配给管理'
        }
      },
      {
        path: '/oa/base',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: '基础管理'
        }
      },
      {
        path: '/oa/salary',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: '工资管理'
        }
      }
    ]
  },
  // 呼叫中心
  {
    path: '/call',
    component: Layout,
    meta: {
      title: '云呼中心'
    },
    children: []
  },
  // 云物联
  {
    path: '/iot',
    component: Layout,
    meta: {
      title: '云物联'
    },
    children: []
  },
  // 云社区
  {
    path: '/community',
    component: Layout,
    meta: {
      title: '云社区'
    },
    children: []
  },
  // 系统设置
  {
    path: '/settings',
    component: Layout,
    meta: {
      title: '系统设置'
    },
    children: settings
  }
]
