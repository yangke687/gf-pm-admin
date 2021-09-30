import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import {
  getList,
  getSingle,
  getAttrOpts,
  addSingle,
  editSingle
} from '@/api/common'
// import { devices, patrols, repairs } from '@/mock/device'

// 搜索栏按钮
export interface IFilterBarBtn {
  name: string
  action: string // 点击按钮执行的动作
  url: string
  isCustom: Boolean
}

export interface ITableColOpt {
  label: string
  value?: string | number
  children?: ITableColOpt[]
}

/**
 * 实体列表字段显示的位置
 * list: 该列在列表显示
 * form: 该列在表单显示
 */
export enum ETableColShow {
  LIST = 'list',
  FORM = 'form'
}
export interface ITableCol {
  label: string
  value: string
  type: string
  show: ETableColShow[]
  url?: string // 动态加载 options 的地址
  options?: ITableColOpt[]
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

export interface ITableItem {
  id: number | string
  hasChildren: number | boolean
}

export interface ITable {
  data: ITableItem[]
  attrs: ITableCol[]
  butList: IFilterBarBtn[] // 搜索栏按钮
  optList: any[] // 列表操作列按钮
  meta: MetaData
}

export interface ISingle {
  id?: number | string
}

// const timeout = (ms: number): Function => {
//   return (data: TableData) =>
//     new Promise(resolve =>
//       setTimeout(() => {
//         resolve(data)
//       }, ms)
//     )
// }

// const request = (entity: string, page: number): Promise<TableData> => {
//   const data: TableData = (() => {
//     switch (entity) {
//       case '/device/list':
//         return devices
//       case '/device/maintain/patrol/list':
//         return patrols
//       case '/device/maintain/repair/list':
//         return repairs
//       default:
//         return {
//           data: [],
//           attrs: [],
//           meta: {}
//         }
//     }
//   })()

//   let dataItems = data.data

//   // 分页
//   if (data && data.meta && data.meta.pagination) {
//     const pageSize = data.meta.pagination.pageSize
//     const startPos = (page - 1) * pageSize
//     const endPos = page * pageSize
//     dataItems = data.data.slice(startPos, endPos)
//   }

//   return timeout(1000)({ ...data, data: dataItems })
// }

@Module({ dynamic: true, store, name: 'common' })
export class Common extends VuexModule {
  // 列表数据
  list: ITable = {
    data: [],
    attrs: [],
    butList: [],
    optList: [],
    meta: { pagination: { pageSize: 10, totalPages: 1, currentPage: 1 } }
  }

  @Mutation
  fetchListSuccess(list: ITable) {
    this.list = {
      ...list,
      data: list.data.map(item => ({
        ...item,
        hasChildren: item.hasChildren ? item.hasChildren > 0 : false
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

  // 加载特殊列备选项
  @Mutation
  fetchAttrOptionsSuccess({
    attr,
    tree
  }: {
    attr: ITableCol
    tree: any
  }): void {
    this.list.attrs = this.list.attrs.map((a: ITableCol) => {
      return a.value !== attr.value
        ? a
        : {
            ...a,
            options: tree
          }
    })
  }

  @Action({ commit: 'fetchAttrOptionsSuccess' })
  public async fetchAttrOptions(attr: ITableCol): Promise<any> {
    if (attr.url) {
      const {
        data: { tree }
      } = await getAttrOpts(`api${attr.url}`)
      return { attr, tree }
    }
  }

  // 获取实体
  @Action({ commit: 'setSingle' })
  public async fetchSingle({
    path,
    id
  }: {
    path: string
    id: number
  }): Promise<any> {
    const res = await getSingle(`api${path}/${id}`)
    return res.data
  }

  // 新建实体
  @Action
  public async create({
    path,
    formData
  }: {
    path: string
    formData: object
  }): Promise<any> {
    const res = await addSingle(path, formData)
    return res
  }

  // 编辑实体
  @Action
  public async update({
    path,
    formData
  }: {
    path: string
    formData: object
  }): Promise<any> {
    return await editSingle(path, formData)
  }

  // 单条数据
  single: ISingle = {}

  @Mutation
  setSingle(singleData: ISingle) {
    this.single = singleData
  }
}

export const commonMod = getModule(Common)
