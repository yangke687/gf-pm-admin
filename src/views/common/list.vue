<template>
  <div class="app-container">
    <!-- filters -->
    <div class="filter-container">
      <div class="fragment" v-for="(col, idx) in attrs" :key="idx">
        <!-- text input -->
        <el-input
          v-if="col.filter.type === 'text'"
          v-model="filters[col.value]"
          :placeholder="col.label"
          style="width: 200px;"
          class="filter-item text-input"
          @keyup.enter.native="handleFilter"
        />
        <!-- select -->
        <el-select
          v-if="col.filter.type === 'select'"
          v-model="filters[col.value]"
          :placeholder="col.label"
          clearable
          class="filter-item select"
          style="width: 130px"
        >
          <el-option
            v-for="(item, idx) in col.filter.options"
            :key="idx"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- date picker -->
        <el-date-picker
          v-if="col.filter.type === 'date'"
          v-model="filters[col.value]"
          type="date"
          class="filter-item date-picker"
          :placeholder="col.label"
        />
      </div>
      <el-button class="filter-item btn" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item btn" type="primary" icon="el-icon-plus" @click="handleCreate">
        新建
      </el-button>
    </div>
    <!-- list table -->
    <el-table v-loading="listLoading"
      :data="list.data"
      style="width: 100%"
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
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
        :sortable="attr.sortable"
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

@Component
export default class extends Vue {
  private listLoading = false
  private path = '';
  private filters = {};

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

  get attrs() {
    return commonMod.list.attrs.filter(attr => attr.filter)
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

  private sortChange({ column, prop, order }: { column: object, prop: string, order: string }) {
    console.log(column, prop, order)
  }

  private handleFilter() {
    return null;
  }

  private handleCreate() {
    return null;
  }
}
</script>

<style lang="scss" scoped>
  .fragment {
    display: inline;
  }

  .block.pagination {
    margin: 20px 0;
    text-align: center;
  }

  .filter-container {
    padding: 20px 0;

    .filter-item {
      margin-right: 10px;

      &.btn:last-child {
        margin-left: 0;
      }
    }
  }
</style>
