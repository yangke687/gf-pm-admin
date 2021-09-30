<template>
  <el-dialog
    :title="form && form.id ? '编辑' : '新建'"
    :visible="visible"
    class="form-container"
    @close="onCancel"
  >
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
        <!-- radio -->
        <el-radio-group
          v-else-if="attr.type === 'radio'"
          v-model="form[attr.value]"
        >
          <el-radio
            v-for="(opt, idx) in attr.options"
            :label="opt.value"
            :key="idx"
          >
            {{opt.label}}
          </el-radio>
        </el-radio-group>
        <!-- checkbox -->
        <el-checkbox-group
          v-else-if="attr.type === 'checkbox'"
          v-model="form[attr.value]">
          <el-checkbox
            v-for="(opt, idx) in attr.options"
            :label="opt.label"
            :key="idx"
          />
        </el-checkbox-group>
        <!-- tree -->
        <el-select :value="form[attr.value]" v-if="attr.type === 'tree'">
          <el-option style="height: auto; padding: 0;"
            :label="treeNodeLabel"
            :value="form[attr.value]"
          >
            <el-tree
              class="tree"
              :data="attr.options"
              :props="treeProps"
              :indent="10"
              @node-click="data => handleTreeNodeClick(data, attr.value)"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          提交
        </el-button>
        <el-button @click="onCancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { commonMod, ITableCol, ETableColShow, ISingle } from '@/store/modules/common'

@Component
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) visible!: boolean;
  @Prop({ type: String }) submitUrl!: string;

  private treeNodeLabel = null

  // 树形组件配置参数
  private treeProps = {
    children: 'children',
    label: 'name'
  }

  get attrs(): ITableCol[] {
    return commonMod.list.attrs.filter(attr => attr.show.includes(ETableColShow.FORM) && attr.type !== 'hidden')
  }

  private onCancel() {
    this.$emit('onClose')
  }

  private async onSubmit() {
    let code

    // 新建实体
    if (!this.form.id) {
      const res = await commonMod.create({
        path: this.submitUrl,
        formData: this.form
      })
      code = res.code
    }

    // 编辑实体
    if (this.form.id) {
      const res = await commonMod.update({
        path: this.submitUrl,
        formData: this.form
      })
      code = res.code
    }

    if (code === 0) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })

      // 重置表单
      commonMod.setSingle({})

      // 关闭弹窗
      this.$emit('onClose')

      // 重新加载列表
      this.$emit('onSuccess')
    }
  }

  private handleTreeNodeClick(data: any, attrVal: string) {
    this.treeNodeLabel = data.name
    // this.form[attrVal] = data.id
    commonMod.setSingle({ ...this.form, [attrVal]: data.id })
  }

  get form(): ISingle {
    return commonMod.single
  }
}
</script>

<style lang="scss" scoped>
  .tree {
    color: #1f2d3d;
    font-weight: normal;
  }
</style>
