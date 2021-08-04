<template>
  <el-tabs class="root" v-model="activeTab">
    <!-- 待办任务 -->
    <el-tab-pane name="first">
      <span slot="label">
        <el-badge :value="pendingData.undo.length" class="item">
          待办
        </el-badge>
      </span>
      <TaskList :list="pendingData.undo" :key="pendingData.undo.length" />
    </el-tab-pane>
    <!-- 任务中心 -->
    <el-tab-pane name="second">
      <span slot="label">
        <el-badge :value="pendingData.done.length" class="item">
          已办
        </el-badge>
      </span>
      <TaskList :list="pendingData.done" />
    </el-tab-pane>
    <!-- 通知 -->
    <el-tab-pane name="third">
      <span slot="label">
        <el-badge :value="pendingData.doing.length" class="item">
          发起的
        </el-badge>
      </span>
      <TaskList :list="pendingData.doing" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DashboardModule } from '@/store/modules/dashboard'
import TaskList from '@/components/Task/QuickViewList.vue'

@Component({
  name: 'PendingTask',
  components: {
    TaskList
  }
})
export default class extends Vue {
  private activeTab = 'first';

  get pendingData() {
    return DashboardModule.pendingData
  }
}
</script>

<style lang="scss">
  .root {
    border-radius: 6px;
  }

  .el-badge.item {
    display: flex;
    padding: 0 20px;
    align-items: center;

    .el-badge__content.is-fixed{
      margin-left: 5px;
      position: inherit;
      top: unset;
      right: unset;
      transform: unset;
    }
  }
</style>

<style lang="scss" scoped>
  .root{
    background: white;
    min-height: 295px;
  }
</style>
