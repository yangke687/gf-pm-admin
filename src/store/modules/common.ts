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
  filter?: object
}

interface PaginationData {
  pageSize: number
  currentPage: number
  totalPages: number
}

interface MetaData {
  pagination?: PaginationData
}

interface TableData {
  data: any[]
  attrs: TableColumn[]
  meta: MetaData
}

const timeout = (ms: number): Function => {
  return (data: TableData) =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve(data)
      }, ms)
    )
}

const request = (entity: string, page: number): Promise<TableData> => {
  const data: TableData = (() => {
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
          attrs: [],
          meta: {}
        }
    }
  })()

  let dataItems = data.data

  // 分页
  if (data && data.meta && data.meta.pagination) {
    const pageSize = data.meta.pagination.pageSize
    const startPos = (page - 1) * pageSize
    const endPos = page * pageSize
    dataItems = data.data.slice(startPos, endPos)
  }

  return timeout(1000)({ ...data, data: dataItems })
}
@Module({ dynamic: true, store, name: 'common' })
export class Common extends VuexModule {
  list: TableData = {
    data: [],
    attrs: [],
    meta: { pagination: { pageSize: 10, totalPages: 1, currentPage: 1 } }
  }

  @Mutation
  fetchListSuccess(list: TableData) {
    this.list = list
  }

  @Action({ commit: 'fetchListSuccess' })
  public async fetchList({
    path,
    page
  }: {
    path: string
    page: number
  }): Promise<TableData> {
    return await request(path, page)
  }
}

export const commonMod = getModule(Common)
