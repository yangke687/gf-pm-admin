import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'

const timeout = (ms: number): Function => {
  return (data: Table) =>
    new Promise(resolve =>
      setTimeout(() => {
        resolve(data)
      }, ms)
    )
}

const request = (entity: string): Promise<Table> => {
  let data = (() => {
    switch (entity) {
      case '/device/list':
        return {
          data: [
            {
              id: 1,
              no: 'SB015595',
              name: '景观灯',
              cat: '景观灯',
              cnt: 1,
              project: '都铎城邦 (云秀2期)',
              district: '都铎城邦（云秀）6号院',
              pos: '6号院正大门进口柱头灯'
            },
            {
              id: 2,
              no: 'SB015595',
              name: '景观灯',
              cat: '景观灯',
              cnt: 1,
              project: '都铎城邦 (云秀2期)',
              district: '都铎城邦（云秀）6号院',
              pos: '6号院正大门进口柱头灯'
            },
            {
              id: 3,
              no: 'SB015595',
              name: '景观灯',
              cat: '景观灯',
              cnt: 1,
              project: '都铎城邦 (云秀2期)',
              district: '都铎城邦（云秀）6号院',
              pos: '6号院正大门进口柱头灯'
            }
          ],
          attrs: [
            { label: '设备编码', value: 'no' },
            { label: '设备名称', value: 'name' },
            { label: '设备分类', value: 'cat' },
            { label: '项目（楼盘', value: 'project' },
            { label: '片区', value: 'district' },
            { label: '位置', value: 'pos' },
            { label: '数量', value: 'cnt' }
          ]
        }
      default:
        return {
          data: [],
          attrs: []
        }
    }
  })()
  return timeout(1000)(data)
}

interface TableColumn {
  label: string
  value: string
}

interface Table {
  data: any[]
  attrs: TableColumn[]
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
