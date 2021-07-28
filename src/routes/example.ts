import Layout from '@/layout/index.vue'
import { RouterView } from '@/layout/components'

export default [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
          ),
        meta: {
          title: 'Dashboard',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/tree',
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [
      {
        path: 'tree',
        component: () =>
          import(/* webpackChunkName: "tree" */ '@/views/tree/index.vue'),
        meta: {
          title: 'Tree',
          icon: 'tree'
        }
      },
      {
        path: 'table',
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
        meta: {
          title: 'Table',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
        meta: {
          title: 'Form',
          icon: 'form'
        }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () =>
          import(
            /* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'
          ),
        redirect: '/nested/menu1/menu1-1',
        meta: { title: 'Menu1' },
        children: []
      },
      {
        path: 'menu2',
        component: () =>
          import(
            /* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'
          ),
        meta: { title: 'Menu2' },
        children: [
          {
            path: 'menu1-2-1',
            component: () =>
              import(
                /* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'
              ),
            meta: { title: 'Menu1-2-1' }
          },
          {
            path: 'menu1-2-2',
            component: () =>
              import(
                /* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'
              ),
            meta: { title: 'Menu1-2-2' }
          }
        ]
      }
    ]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/Armour/vue-typescript-admin-template',
  //       meta: {
  //         title: 'External Link',
  //         icon: 'link'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/device',
    component: Layout,
    meta: {
      title: '设备管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () =>
          import(
            /* webpackChunkName: "common-data-list" */ '@/views/common/list.vue'
          ),
        meta: { title: '设备信息' }
      },
      {
        path: 'single',
        component: () =>
          import(
            /* webpackChunkName: "common-data-single" */ '@/views/common/single.vue'
          ),
        meta: { title: '新建/编辑', hidden: true }
      },
      {
        path: 'maintain',
        component: RouterView,
        meta: { title: '设备维保' },
        children: [
          {
            path: 'patrol/list',
            component: () =>
              import(
                /* webpackChunkName: "common-data-list" */ '@/views/common/list.vue'
              ),
            meta: { title: '巡查记录' }
          },
          {
            path: 'patrol/single',
            component: () =>
              import(
                /* webpackChunkName: "common-data-single" */ '@/views/common/single.vue'
              ),
            meta: { title: '新建/编辑', hidden: true }
          },
          {
            path: 'repair/list',
            component: () =>
              import(
                /* webpackChunkName: "common-data-list" */ '@/views/common/list.vue'
              ),
            meta: { title: '维修记录' }
          },
          {
            path: 'repair/single',
            component: () =>
              import(
                /* webpackChunkName: "common-data-single" */ '@/views/common/single.vue'
              ),
            meta: { title: '新建/编辑', hidden: true }
          }
        ]
      }
    ]
  },
  // {
  //   path: '/common',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/common/list',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "common-data-list" */ '@/views/common/list.vue'
  //         )
  //     }
  //   ]
  // },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]
