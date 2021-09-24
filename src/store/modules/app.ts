import { findIndex } from 'lodash'
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies'
import store from '@/store'
import router from '@/router'

export enum DeviceType {
  Mobile,
  Desktop
}

export interface INavTab {
  to: string
  name: string
  closeable: boolean
}

export interface IAppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  navTabs: INavTab[]
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  }

  public device = DeviceType.Desktop

  public navTabs = [
    {
      to: '/dashboard',
      name: '工作台',
      closeable: false
    },

    {
      to: '/call-center',
      name: '呼叫中心',
      closeable: false
    },

    {
      to: '/serv-center',
      name: '客服中心',
      closeable: false
    },

    {
      to: '/secure-center',
      name: '安保中心',
      closeable: false
    },

    {
      to: '/engineer-center',
      name: '工程中心',
      closeable: false
    }
  ]

  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = !this.sidebar.opened
    this.sidebar.withoutAnimation = withoutAnimation
    if (this.sidebar.opened) {
      setSidebarStatus('opened')
    } else {
      setSidebarStatus('closed')
    }
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false
    this.sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus('closed')
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device
  }

  @Action
  public ToggleSideBar(withoutAnimation: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation)
  }

  @Action
  public CloseSideBar(withoutAnimation: boolean) {
    this.CLOSE_SIDEBAR(withoutAnimation)
  }

  @Action
  public ToggleDevice(device: DeviceType) {
    this.TOGGLE_DEVICE(device)
  }

  @Mutation
  public ADD_NAV_TAB(tab: INavTab) {
    this.navTabs.push(tab)
  }

  @Mutation
  public REMOVE_NAV_TAB(name: string) {
    const idx = findIndex(this.navTabs, t => t.name === name)
    this.navTabs.splice(idx, 1)
    router.back()
  }
}

export const AppModule = getModule(App)
