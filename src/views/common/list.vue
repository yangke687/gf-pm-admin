<template>
  <div class="list-container">
    <!-- filters -->
    <div class="filter-container">
      <div class="fragment" v-for="(col, idx) in attrs" :key="idx">
        <!-- text input -->
        <el-input
          v-if="col.type === 'text'"
          v-model="filters[col.value]"
          :placeholder="col.label"
          style="width: 200px;"
          class="filter-item text-input"
          @keyup.enter.native="handleFilter"
        />
        <!-- select -->
        <el-select
          v-if="col.type === 'select'"
          v-model="filters[col.value]"
          :placeholder="col.label"
          clearable
          class="filter-item select"
          style="width: 130px"
        >
          <el-option
            v-for="(item, idx) in col.options"
            :key="idx"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- date picker -->
        <el-date-picker
          v-if="col.type === 'date'"
          v-model="filters[col.value]"
          type="date"
          class="filter-item date-picker"
          :placeholder="col.label"
        />
      </div>
      <el-button v-if="attrs.length" class="filter-item btn" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button class="filter-item btn" type="primary" icon="el-icon-plus" @click="handleAdd">
        新建
      </el-button>
    </div>
    <!-- list table -->
    <el-table v-loading="listLoading"
      :data="renderListData(list)"
      style="width: 100%"
      row-key="id"
      border
      fit
      highlight-current-row
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @sort-change="sortChange"
    >
      <!-- <el-table-column
        v-if="list && list.data.length"
        align="left"
        label="序号"
        width="50"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column> -->
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
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- pagination -->
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
import { find, cloneDeep } from 'lodash'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { commonMod, TableData, ITableDataItem, TableColumn, TableColumnOpt } from '@/store/modules/common'
import { getList } from '@/api/common'
import toUrl from './pathToUrl'

@Component
export default class extends Vue {
  private listLoading = false
  private path = ''; // 当前路由
  private url = ''; // api地址
  private filters = {};

  @Watch('$route', {
    immediate: true,
    deep: true
  })
  onRouteChange(to: Route, from: Route) {
    const fromPath = from?.path
    const toPath = to?.path
    const url = toUrl(toPath)

    if (toPath && toPath !== fromPath) {
      this.path = toPath
      this.url = url
      this.getList(url, 1)
    }
  }

  get list() {
    return commonMod.list
  }

  get pagination() {
    return commonMod.list.meta.pagination
  }

  get attrs() {
    return commonMod.list.attrs.filter(attr => attr.filterable)
  }

  // 加载列表
  private async getList(url: string, page: number) {
    this.listLoading = true
    await commonMod.fetchList({ path: url, page })
    this.listLoading = false
  }

  // 加载树形子级数据
  private async load(tree: ITableDataItem, treeNode: object, resolve: Function) {
    const { id } = tree
    const { data: { data } } = await getList(this.url, { page: 1, parentId: id })
    resolve(data)
  }

  private async onPageChange(page: number) {
    this.listLoading = true
    await commonMod.fetchList({ path: this.url, page })
    this.listLoading = false
  }

  private sortChange({ column, prop, order }: { column: object, prop: string, order: string }) {
    console.log(column, prop, order)
  }

  private handleFilter() {
    return null
  }

  private gotoSingleForm() {
    const urlPieces = this.path.split('/')
    urlPieces[urlPieces.length - 1] = 'single'
    const path = urlPieces.join('/')
    this.$router.push(path)
  }

  private handleAdd() {
    const single: { [key: string]: any } = {}

    // 检测单条数据是否有checkbox属性
    for (const attr of commonMod.list.attrs) {
      if (attr.type === 'checkbox') {
        single[attr.value] = []
      }
    }

    // 清空单条记录
    commonMod.setSingle(single)

    // 路由跳转
    this.gotoSingleForm()
  }

  private handleEdit(single: { id: number }) {
    // 设置单条记录
    const data: any = find(this.list.data, (row: { id: number }) => row.id === single.id)
    commonMod.setSingle(data)
    // 路由跳转
    this.gotoSingleForm()
  }

  private renderListData(list: TableData) {
    const data: any[] = cloneDeep(list.data)
    return data.map(row => {
      for (const colName in row) {
        const attr = find(list.attrs, (attr: TableColumn) => attr.value === colName)
        if (attr) {
          if (attr.type === 'radio') {
            const option = find(attr.options, (opt: TableColumnOpt) => opt.value === row[colName])
            if (option) {
              row[colName] = option.label
            }
          }
          if (attr.type === 'checkbox') {
            row[colName] = row[colName].join(',')
          }
        }
      }
      return row
    })
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
    margin-bottom: 20px;

    .filter-item {
      margin-right: 10px;

      &.btn:last-child {
        margin-left: 0;
      }
    }
  }
</style>
