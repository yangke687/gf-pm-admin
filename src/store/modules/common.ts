import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { getList } from '@/api/common'
import { devices, patrols, repairs } from '@/mock/device'

export interface TableColumnOpt {
  label: string
  value?: string | number
}
export interface TableColumn {
  label: string
  value: string
  type: string
  options?: TableColumnOpt[]
  filterable?: boolean
}

interface PaginationData {
  pageSize: number
  currentPage: number
  totalPages: number
}

interface MetaData {
  pagination?: PaginationData
}

export interface ITableDataItem {
  id: number | string
}

export interface TableData {
  data: ITableDataItem[]
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
  // 列表数据
  list: TableData = {
    data: [],
    attrs: [],
    meta: { pagination: { pageSize: 10, totalPages: 1, currentPage: 1 } }
  }

  @Mutation
  fetchListSuccess(list: TableData) {
    this.list = {
      ...list,
      data: list.data.map(item => ({
        ...item,
        hasChildren: true
      }))
    }
  }

  @Action({ commit: 'fetchListSuccess' })
  public async fetchList({
    path,
    page,
    ...props
  }: {
    path: string
    page: number
    props?: any
  }): Promise<any> {
    const { data } = await getList(path, { currentPage: page, ...props })
    return data
  }

  // 单条数据
  single: Object = {}

  @Mutation
  setSingle(singleData: Object) {
    this.single = singleData
  }
}

export const commonMod = getModule(Common)
