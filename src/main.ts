import Vue from 'vue'
import moment from 'moment'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import '@/icons/components'
import '@/permission'
import { permissionModule } from './store/modules/permission'

import RouterTab from 'vue-router-tab'
import 'vue-router-tab/dist/lib/vue-router-tab.css'

Vue.prototype.moment = moment
Vue.use(RouterTab)
Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  // 从后端获取菜单权限
  const routes = await permissionModule.generateRoutes()
  console.log('main routes', routes)
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
