<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="8">
        <PendingTaskTab />
      </el-col>
      <el-col :span="8">
        <CentralTaskTab />
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import PendingTaskTab from './pending-task.vue'
import CentralTaskTab from './central-tasks.vue'

@Component({
  name: 'Dashboard',
  components: {
    PendingTaskTab,
    CentralTaskTab
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
  }
}
</style>
