<template>
  <div class="app-container">
    <el-table v-loading="listLoading"
      :data="list.data"
      border
      fit
      highlight-current-row>
      <el-table-column
        v-if="list && list.data.length"
        align="center"
        label="序号"
        width="50"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="(attr, idx) in list.attrs"
        :prop="attr.value"
        :label="attr.label"
        :key="idx"
      />
      <el-table-column
        v-if="list && list.data.length"
        fixed="right"
        align="center"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
            <el-button type="success" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </el-button-group>
        </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { commonMod } from '@/store/modules/common'

@Component({})
export default class extends Vue {
  private listLoading = false

  @Watch('$route', {
    immediate: true,
    deep: true
  })
  onRouteChange(to: Route, from: Route) {
    const fromPath = from?.path
    const toPath = to?.path
    if (toPath && toPath !== fromPath) {
      this.getList(toPath)
    }
  }

  get list() {
    return commonMod.list
  }

  private async getList(path: string) {
    this.listLoading = true
    await commonMod.fetchList(path)
    this.listLoading = false
  }
}
</script>
