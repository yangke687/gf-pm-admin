<template>
  <div id="myChart" ref="myChart"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { Component, Vue, Ref } from 'vue-property-decorator'
import { DashboardModule } from '@/store/modules/dashboard'

@Component
export default class extends Vue {
  @Ref('myChart') readonly div!: HTMLDivElement

  mounted() {
    this.draw(this.cashData)
  }

  get cashData() {
    return DashboardModule.cash
  }

  private draw(data: any) {
    const myChart = echarts.init(this.div)
    myChart.setOption(data)
  }
}
</script>

<style lang="scss" scoped>
  #myChart {
    width: 100%;
    height: 400px;
  }
</style>
