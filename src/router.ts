import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
import { RouterView } from '@/layout/components'

Vue.use(Router)

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: [
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
              path: 'repair/list',
              component: () =>
                import(
                  /* webpackChunkName: "common-data-list" */ '@/views/common/list.vue'
                ),
              meta: { title: '维修记录' }
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
})
