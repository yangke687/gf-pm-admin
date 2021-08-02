<template>
  <div>
    <ul class="task-list" v-if="list.length">
      <li class="task-list-item" v-for="(task, idx) in list" :key="idx">
        <h5>{{ task.title }}</h5>
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
  @Prop({ default: [] }) readonly list: Task[]
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
      border-bottom: 1px solid #E4E7ED;

      h5 {
        margin: 0;
        font-size: 14px;
      }

      .timestamp {
        color: #909399;
      }
    }
  }
</style>
