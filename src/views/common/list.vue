<template>
  <div class="app-container">
    <el-table v-loading="listLoading"
      :data="list.data"
      style="width: 100%"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        v-if="list && list.data.length"
        align="left"
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
        :width="attr.width ? attr.width : null"
      />
      <el-table-column
        v-if="list && list.data.length"
        fixed="right"
        align="center"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"  type="text">查看</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block pagination">
      <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pagination.pageSize"
      :current-page="pagination.currentPage"
      :total="pagination.totalPages"
      @current-change="onPageChange"
     />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { commonMod } from '@/store/modules/common'

@Component({})
export default class extends Vue {
  private listLoading = false
  private path = '';

  @Watch('$route', {
    immediate: true,
    deep: true
  })
  onRouteChange(to: Route, from: Route) {
    const fromPath = from?.path
    const toPath = to?.path
    if (toPath && toPath !== fromPath) {
      this.path = toPath
      this.getList(toPath, 1)
    }
  }

  get list() {
    return commonMod.list
  }

  get pagination() {
    return commonMod.list.meta.pagination
  }

  private async getList(path: string, page: number) {
    this.listLoading = true
    await commonMod.fetchList({ path, page })
    this.listLoading = false
  }

  private async onPageChange(page: number) {
    this.listLoading = true
    await commonMod.fetchList({ path: this.path, page })
    this.listLoading = false
  }
}
</script>

<style scoped>
  .block.pagination{
    margin: 20px 0;
    text-align: center;
  }
</style>
