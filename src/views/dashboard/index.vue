<template>
  <div class="dashboard-container">
    <el-row gutter="30">
      <el-col :span="8">
        <div class="block-header">
          <h4>审批待办</h4>
          <span class="more">查看更多</span>
        </div>
        <PendingTaskTab />
      </el-col>
      <el-col :span="8">
        <div class="block-header">
          <h4>任务中心</h4>
          <span class="more">查看更多</span>
        </div>
        <CentralTaskTab />
      </el-col>
      <el-col :span="8">
        <div class="block-header">
          <h4>通知公告</h4>
          <span class="more">查看更多</span>
        </div>
        <NoticeTab />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import PendingTaskTab from './pending-task.vue'
import CentralTaskTab from './central-task.vue'
import NoticeTab from './notice.vue'

@Component({
  name: 'Dashboard',
  components: {
    PendingTaskTab,
    CentralTaskTab,
    NoticeTab
  }
})
export default class extends Vue {
  get name() {
    return UserModule.name
  }

  get roles() {
    return UserModule.roles
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    padding: 0 19px;
    min-height: 100vh;
    background: $dashboardBgColor;

    .block-header {
      @include flex-justify-space-between;
      @include flex-align-items-center;
      margin-top: 20px;
      padding: 10px 0;

      h4 {
        margin: 0;
        color: #303133;
        font-size: 18px;
      }

      .more {
        font-size: 12px;
        color: #909399;
        cursor: pointer;
      }
    }
  }
}
</style>
