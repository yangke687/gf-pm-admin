import { VuexModule, Module, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { undo as undoPendingTasks } from '@/mock/dashboard/pending-tasks'
import { undo as undoCenterTasks } from '@/mock/dashboard/center-tasks'
import notices from '@/mock/dashboard/notices'

export interface Task {
  title: string // 任务标题
  applier: string // 申请人
  appliedAt: Date // 申请时间
  createdAt: Date // 创建时间
}

export interface TaskGroup {
  undo: Task[]
  doing: Task[]
  done: Task[]
}

@Module({ dynamic: true, store, name: 'dashboard' })
class Dashboard extends VuexModule {
  // 审批待办
  pendingData: TaskGroup = {
    undo: undoPendingTasks,
    doing: [],
    done: []
  }

  // 任务中心
  centerData: TaskGroup = {
    undo: undoCenterTasks,
    doing: [],
    done: []
  }

  // 通知
  noticeData = notices
}

export const DashboardModule = getModule(Dashboard)
