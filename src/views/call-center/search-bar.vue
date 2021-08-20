<template>
  <div class="filter-container">
    <el-row type="flex">
      <!-- 小区 -->
      <div class="col" v-if="shownColumns.includes('小区')">
        小区:
        <el-select
          v-model="area"
          placeholder="选择小区"
          style="width: 154px;"
        >
          <el-option label="小区一" value="小区一" />
          <el-option label="小区二" value="小区二" />
          <el-option label="小区三" value="小区三" />
        </el-select>
      </div>
      <!-- 楼栋 -->
      <div class="col" v-if="shownColumns.includes('楼栋')">
        楼栋:
        <el-select
          v-model="building"
          placeholder="选择楼栋"
          style="width: 154px;"
        >
          <el-option label="楼栋一" value="楼栋一" />
          <el-option label="楼栋二" value="楼栋二" />
          <el-option label="楼栋三" value="楼栋三" />
        </el-select>
      </div>
      <!-- 房号 -->
      <div class="col" v-if="shownColumns.includes('业主房号')">
        业主房号:
        <el-input
          v-model="house"
          placeholder="输入房号"
          clearable
          style="width: 154px;"
        />
      </div>
      <!-- 手机 -->
      <div class="col" v-if="shownColumns.includes('手机号')">
        手机号:
        <el-input
          v-model="house"
          placeholder="输入手机号"
          clearable
          style="width: 154px;"
        />
      </div>
      <!--  车牌 -->
      <div class="col" v-if="shownColumns.includes('车牌号')">
        车牌号:
        <el-input
          v-model="house"
          placeholder="输入车牌号"
          clearable
          style="width: 154px;"
        />
      </div>
      <el-button type="primary">查询</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ type: Array, default: () => ['小区', '楼栋', '业主放好', '手机号', '车牌号'] }) shownColumns!: String[];

  private area = '' // 小区
  private building = '' // 楼栋
  private house = ''; // 房号
  private mobile = ''; // 业主手机
  private plate = ''; // 车牌
}
</script>

<style lang="scss" socped>
  .filter {
    &-container {
      padding: 25px;
      background: white;
      border-radius: 6px;

      .col {
        margin-right: 15px;
        color: $darkTextColor;
        font-size: 14px;
      }
      button {
        margin-left: 30px;
        font-size: 14px;
      }
    }
  }
</style>
