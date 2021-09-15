import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import { login, logout, getUserInfo } from '@/api/users'
import {
  getToken,
  setToken,
  removeToken,
  getCompanyCode,
  setCompanyCode,
  removeCompanyCode
} from '@/utils/cookies'
import store from '@/store'

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public companyCode = getCompanyCode() || ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_COMPANY_CODE(code: string) {
    this.companyCode = code
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Action
  public async Login(userInfo: {
    username: string
    password: string
    companyCode: string
  }) {
    let { username, password, companyCode } = userInfo
    username = username.trim()
    setCompanyCode(companyCode)
    this.SET_COMPANY_CODE(companyCode)
    const res: any = await login({ username, password, companyCode })
    setToken(res.token)
    this.SET_TOKEN(res.token)
  }

  @Action
  public ResetToken() {
    removeToken()
    removeCompanyCode()
    this.SET_TOKEN('')
    this.SET_COMPANY_CODE('')
    this.SET_ROLES([])
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUserInfo({
      /* Your params here */
    })
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    // 模拟用户信息
    data.user.roles = ['editor']
    data.user.avatar =
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    data.user.introduction = '管理员'
    const { roles, name, avatar, introduction } = data.user
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    this.SET_ROLES(roles)
    this.SET_NAME(name)
    this.SET_AVATAR(avatar)
    this.SET_INTRODUCTION(introduction)
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    // await logout()
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)
