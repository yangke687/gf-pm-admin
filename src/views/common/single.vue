<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
    >
      <el-form-item
        :label="attr.label"
        v-for="(attr, idx) in attrs"
        :key="idx"
      >
        <!-- text input -->
        <el-input
          v-if="attr.type === 'text'"
          v-model="form[attr.value]"
        />
        <!-- text area -->
        <el-input
          v-else-if="attr.type === 'textarea'"
          v-model="form[attr.value]"
          type="textarea"
        />
        <!-- select -->
        <el-select
          v-else-if="attr.type === 'select'"
          v-model="form[attr.value]"
          placeholder="请选择"
        >
          <el-option
            v-for="(opt, idx) in attr.options"
            :key="idx"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
        <!-- datepicker -->
        <el-date-picker
          v-else-if="attr.type === 'date'"
          v-model="form[attr.value]"
          type="date"
          placeholder="请选择"
        />
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          提交
        </el-button>
        <el-button @click="goBack">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { commonMod, TableColumn } from '@/store/modules/common'

@Component
export default class extends Vue {
  private form = {}

  get list() {
    return commonMod.list
  }

  get attrs(): TableColumn[] {
    return commonMod.list.attrs
  }

  private async getList() {
    const { path } = this.$router.currentRoute
    const urlPieces = path.split('/');
    urlPieces[urlPieces.length - 1] = 'list'
    const newPath = urlPieces.join('/')
    await commonMod.fetchList({ path: newPath, page: 1 })
  }

  private goBack() {
    this.$router.go(-1)
  }

  created() {
    // 如果列表数据为空, 加载
    if (!this.list || !this.list.data || this.list.data.length === 0) {
      this.getList()
    }
    // 加载单条数据
    this.form = commonMod.single
  }
}
</script>
