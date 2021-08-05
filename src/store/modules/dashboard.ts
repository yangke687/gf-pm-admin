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

  // 现金流
  cash = {
    xAxis: {
      data: [
        '2021-01',
        '2021-02',
        '2021-03',
        '2021-04',
        '2021-05',
        '2021-06',
        '2021-07'
      ]
    },
    yAxis: {},
    series: [
      {
        name: '收入',
        type: 'bar',
        data: [200, 120, 240, 330, 300, 305, 198]
      },
      {
        name: '支出',
        type: 'bar',
        data: [120, 100, 440, 320, 400, 287, 200]
      }
    ]
  }

  // 收入统计
  incomes = {
    xAxis: {
      data: ['2019', '2020', '2021']
    },
    yAxis: {},
    series: [
      {
        name: '收入一',
        type: 'bar',
        data: [Math.random() * 1000, Math.random() * 1000, Math.random() * 1000]
      },
      {
        name: '收入二',
        type: 'bar',
        data: [Math.random() * 1000, Math.random() * 1000, Math.random() * 1000]
      },
      {
        name: '收入三',
        type: 'bar',
        data: [Math.random() * 1000, Math.random() * 1000, Math.random() * 1000]
      },
      {
        name: '收入四',
        type: 'bar',
        data: [Math.random() * 1000, Math.random() * 1000, Math.random() * 1000]
      },
      {
        name: '收入五',
        type: 'bar',
        data: [Math.random() * 1000, Math.random() * 1000, Math.random() * 1000]
      },
      {
        name: '收入六',
        type: 'bar',
        data: [Math.random() * 1000, Math.random() * 1000, Math.random() * 1000]
      }
    ]
  }
}

export const DashboardModule = getModule(Dashboard)
