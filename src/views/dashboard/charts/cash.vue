<template>
  <div class="chart-container">
    <div class="chart-header">
      <h4>现金流</h4>
      <el-select v-model="year" placeholder="请选择" style="width: 100px;">
      <el-option
        v-for="item in years"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
  </el-select>
    </div>
    <div class="flex">
      <div id="myChart" ref="myChart"></div>
    </div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { Component, Vue, Ref } from 'vue-property-decorator'
import { DashboardModule } from '@/store/modules/dashboard'

@Component
export default class extends Vue {
  @Ref('myChart') readonly div!: HTMLDivElement

  private year = 2021

  private years = [
    { label: '2021', value: 2021 },
    { label: '2020', value: 2020 },
    { label: '2019', value: 2019 }
  ]

  mounted() {
    this.draw(this.cashData)
  }

  get cashData() {
    return DashboardModule.cashData
  }

  private draw(data: any) {
    const myChart = echarts.init(this.div)
    myChart.setOption(data)
  }
}
</script>

<style lang="scss" scoped>
  .chart-container {
    background: white;
    border-radius: 6px;

    .chart-header {
      @include flex-justify-space-between;
      @include flex-align-items-center;
      padding: 10px 18px;
      border-bottom: 1px solid $grayBorderColor;

      h4 {
        margin: 0;
        color: $darkTextColor;
        font-size: 18px;
      }
    }

    .flex{
      @include flex-justify-center;

      #myChart {
        width: 100%;
        height: 350px;
      }
    }
  }
</style>
