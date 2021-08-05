<template>
  <div class="chart-container">
    <div class="chart-header">
      <h4>收入统计</h4>
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

  mounted() {
    this.draw(this.incomeData)
  }

  get incomeData() {
    return DashboardModule.incomes
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
      padding: 19px 18px;
      border-bottom: 1px solid $grayBorderColor;

      h4 {
        margin: 0;
        color: $darkTextColor;
        font-size: 18px;
      }
    }

    .flex{
      @include flex-justify-space-center;

      #myChart {
        width: 100%;
        height: 350px;
      }
    }
  }
</style>
