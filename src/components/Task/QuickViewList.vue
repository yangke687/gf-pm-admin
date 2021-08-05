<template>
  <div>
    <ul class="task-list" v-if="list.length">
      <li class="task-list-item" v-for="(task, idx) in list" :key="idx">
        <div class="title">
           <h5>{{ task.title }}</h5>
           <!-- 申请人 -->
           <div v-if="task.applier && task.appliedAt">
             <h6>申请时间: {{ moment(task.appliedAt).format('YYYY-MM-DD') }}</h6>
             <h6>申请人: {{ task.applier }}</h6>
           </div>
        </div>
        <span class="timestamp">{{ moment(task.createdAt).format('YYYY-MM-DD') }}</span>
      </li>
    </ul>
    <el-empty v-else description="暂无数据" :image-size="64"></el-empty>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Task } from '@/store/modules/dashboard'

@Component({
  name: 'TaskQuickViewList'
})
export default class extends Vue {
  @Prop({ default: [] }) readonly list!: Task[]
}
</script>

<style lang="scss" scoped>
  .task-list {
    margin: 0;
    padding: 0;
    list-style: none;

    .task-list-item {
      @include flex-justify-space-between;
      padding: 20px 10px;
      color: #333;
      border-bottom: 1px solid $grayBorderColor;

      .title {
        @include flex-vertical;

        h5 {
          margin: 0;
          font-size: 14px;
        }

        h6 {
          display: inline-block;
          margin: 0;
          margin-top: 10px;
          font-size: 14px;
          color: #909399;

          &:last-child {
            margin-left: 10px;
          }
        }
      }

      .timestamp {
        color: #909399;
      }
    }
  }
</style>
