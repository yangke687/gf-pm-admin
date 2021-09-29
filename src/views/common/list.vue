<template>
  <div class="list-container">
    <!-- 搜索栏 -->
    <div class="filter-container">
      <div class="fragment" v-for="(col, idx) in FilterableAttrs" :key="idx">
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
      <el-button v-if="FilterableAttrs.length" class="filter-item btn" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="filter-item btn"
        v-for="btn in FilterBarBtns"
        :key="btn.action"
        @click="handleBtnClick(btn)"
      >
        {{ btn.name }}
      </el-button>
    </div>
    <!-- 列表 -->
    <div class="table-container">
      <el-table v-loading="listLoading"
        :data="renderListData(list)"
        style="width: 100%"
        row-key="id"
        highlight-current-row
        lazy
        :load="load"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :cell-style="bodyCellStyle"
        :header-cell-style="headerCellStyle"
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
          v-for="(attr, idx) in ListAttrs"
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
    </div>
    <!-- 分页 -->
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

    <!-- 新建/编辑 实体弹窗 -->
    <Modal
      :visible="modalShown"
      :submitUrl="submitUrl"
      @onClose="closeModal"
      @onSuccess="getList(listUrl, 1)"
    />
  </div>
</template>

<script lang="ts">
import { find, cloneDeep } from 'lodash'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { commonMod, ITable, ITableItem, ITableCol, ITableColOpt, ETableColShow, IFilterBarBtn } from '@/store/modules/common'
import { getList } from '@/api/common'
import toUrl from './path-to-url'
import Modal from './modal-single.vue'

@Component({
  components: {
    Modal
  }
})
export default class extends Vue {
  // 列表加载状态
  private listLoading = false

  // 当前路由
  private path = ''

  // 过滤列表数据搜索条件
  private filters = {};

  // 获取列表数据的地址
  private listUrl = ''

  // 新建/编辑实体弹窗表单的提交地址
  private submitUrl = ''

  // 弹窗控制开关
  private modalShown = false

  private bodyCellStyle = {
    'border-width': 0
  }

  private headerCellStyle = {
    color: 'black',
    background: '#F2F6FC',
    'border-width': 0
  }

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
      this.listUrl = url
      this.getList(url, 1)
    }
  }

  get list() {
    return commonMod.list
  }

  get pagination() {
    return commonMod.list.meta.pagination
  }

  // 列表字段
  get ListAttrs() {
    return commonMod.list.attrs.filter(attr => attr.show.includes(ETableColShow.LIST) && attr.type !== 'hidden')
  }

  // 可查询字段
  get FilterableAttrs() {
    return commonMod.list.attrs.filter(attr => attr.filterable)
  }

  // 搜索栏按钮
  get FilterBarBtns() {
    return commonMod.list.butList
  }

  // 操作列按钮
  get OpBtns() {
    return commonMod.list.optList
  }

  // 加载列表数据
  private async getList(url: string, page: number) {
    this.listLoading = true
    await commonMod.fetchList({ path: url, page })

    // 加载特殊列 options 备选数据
    const attrs = commonMod.list.attrs.filter(attr => attr.url)
    for (const attr of attrs) {
      await commonMod.fetchAttrOptions(attr)
    }

    this.listLoading = false
  }

  // 加载树形子级数据
  private async load(tree: ITableItem, treeNode: object, resolve: Function) {
    const { id } = tree
    const { data: { data } } = await getList(this.listUrl, { page: 1, parentId: id })
    resolve(data)
  }

  // 翻页
  private async onPageChange(page: number) {
    this.listLoading = true
    await commonMod.fetchList({ path: this.listUrl, page })
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

  // 按钮点击
  private handleBtnClick(btn: IFilterBarBtn) {
    const { action } = btn

    // 新建实体弹窗
    if (action === 'add') {
      this.handleAdd()
      this.modalShown = true
      // 设置表单提交地址
      this.submitUrl = btn.url
    }

    // 编辑实体弹窗
    if (action === 'edit') {
      this.modalShown = true
    }
  }

  // 新建实体
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
  }

  // 编辑实体
  private handleEdit(single: { id: number }) {
    // 设置单条记录
    const data: any = find(this.list.data, (row: { id: number }) => row.id === single.id)
    commonMod.setSingle(data)
    // 路由跳转
    this.gotoSingleForm()
  }

  private renderListData(list: ITable) {
    const data: any[] = cloneDeep(list.data)
    return data.map(row => {
      for (const colName in row) {
        const attr = find(list.attrs, (attr: ITableCol) => attr.value === colName)
        if (attr) {
          if (attr.type === 'radio') {
            const option = find(attr.options, (opt: ITableColOpt) => opt.value === row[colName])
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

  private closeModal() {
    this.modalShown = false
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
    padding: 25px;
    margin-bottom: 20px;
    background: white;
    border-radius: 6px;

    .filter-item {
      margin-right: 10px;

      &.btn:last-child {
        margin-left: 0;
      }
    }
  }
</style>
