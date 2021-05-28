import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { devices, patrols, repairs } from '@/mock/device'
interface TableColumn {
  label: string
  value: string
}

interface Table {
  data: any[]
  attrs: TableColumn[]
}

const timeout = (ms: number): Function => {
  return (data: Table) =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve(data)
      }, ms)
    )
}

const request = (entity: string): Promise<Table> => {
  const data = (() => {
    switch (entity) {
      case '/device/list':
        return devices
      case '/device/maintain/patrol/list':
        return patrols
      case '/device/maintain/repair/list':
        return repairs
      default:
        return {
          data: [],
          attrs: []
        }
    }
  })()
  return timeout(1000)(data)
}
@Module({ dynamic: true, store, name: 'common' })
export class Common extends VuexModule {
  list: Table = { data: [], attrs: [] }

  @Mutation
  fetchListSuccess(list: Table) {
    this.list = list
  }

  @Action({ commit: 'fetchListSuccess' })
  public async fetchList(entity: string): Promise<Table> {
    return await request(entity)
  }
}

export const commonMod = getModule(Common)
