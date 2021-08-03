import { Task } from '@/store/modules/dashboard'

const undo: Task[] = [
  {
    title: '报修 | 排水/供水 | 下水部分漏水',
    applier: '李红丽',
    appliedAt: new Date(),
    createdAt: new Date()
  },

  {
    title: '报修 | 排水/供水 | 下水部分漏水',
    applier: '李红丽',
    appliedAt: new Date(),
    createdAt: new Date()
  }
]

const doing: Task[] = []
const done: Task[] = []

export { undo, doing, done }
