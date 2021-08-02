import { Task } from '@/store/modules/dashboard'

const undo: Task[] = [
  {
    title: '请假 | 张三 | 领导审批',
    applier: '张三',
    appliedAt: new Date(),
    createdAt: new Date()
  },
  {
    title: '请假 | 张三 | 领导审批',
    applier: '张三',
    appliedAt: new Date(),
    createdAt: new Date()
  },
  {
    title: '请假 | 张三 | 领导审批',
    applier: '张三',
    appliedAt: new Date(),
    createdAt: new Date()
  }
]

const doing: Task[] = []
const done: Task[] = []

export { undo, doing, done }
