import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
// import { getRoutes } from '@/api/routes'
// import { getArticles } from '@/api/articles'
import store from '@/store'

const getRoutes = () => {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve([
          {
            title: '设备管理',
            children: [
              {
                title: '设备信息',
                children: []
              }
            ]
          }
        ]),
      1000
    )
  })
}

@Module({ dynamic: true, namespaced: true, store, name: 'permission' })
export default class Permission extends VuexModule {
  routes: any[] = []

  @Mutation
  setRoutes(routes: Array<any>) {
    // console.log('permission routes:', routes)
    this.routes = routes
  }

  @Action({ commit: 'setRoutes' })
  public async generateRoutes() {
    return await getRoutes()
  }
}

export const permissionModule = getModule(Permission)
