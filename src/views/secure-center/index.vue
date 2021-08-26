<template>
  <div class="secure-center-container">
    <FilterBar :shownColumns="['车牌号']" />
    <!-- 车辆信息 -->
    <div class="table-container">
      <el-table
        :data="assets"
        :cell-style="bodyCellStyle"
        :header-cell-style="headerCellStyle"
        style="width: 100%">
      >
        <el-table-column
          prop="plateNum"
          label="车牌号">
        </el-table-column>
         <el-table-column
          prop="houseNum"
          label="房号">
        </el-table-column>
         <el-table-column
          prop="assetType"
          label="类型">
        </el-table-column>
         <el-table-column
          prop="pos"
          label="位置">
        </el-table-column>
         <el-table-column
          prop="ownerType"
          label="车主类型">
        </el-table-column>
         <el-table-column
          prop="carStatus"
          label="车辆状态">
        </el-table-column>
      </el-table>
    </div>
    <!-- 车辆/车位各种记录 -->
    <div class="tab-container">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="放行管理" name="first" class="owner-tab">
          <el-table
            :data="records"
            :cell-style="bodyCellStyle"
            :header-cell-style="headerCellStyle"
            style="width: 100%">
            <el-table-column
              prop="plateNum"
              label="车牌号">
            </el-table-column>
            <el-table-column
              prop="ownerType"
              label="车主类型">
            </el-table-column>
            <el-table-column
              prop="plateType"
              label="车牌类型">
            </el-table-column>
            <el-table-column
              prop="plateColor"
              label="车牌颜色">
            </el-table-column>
            <el-table-column
              prop="entrance"
              label="入口 ">
            </el-table-column>
             <el-table-column
              prop="inAt"
              label="进场时间 ">
            </el-table-column>
             <el-table-column
              prop="isAllowIn"
              label="是否放行 ">
            </el-table-column>
            <el-table-column
              prop="isIn"
              label="是否入场">
            </el-table-column>
            <el-table-column
              prop="inType"
              label="入场类型">
            </el-table-column>
            <el-table-column
              prop="denyInReason"
              label="未入场原因">
            </el-table-column>
            <el-table-column
              prop="allowInReason"
              label="放行原因">
            </el-table-column>
            <el-table-column
              prop="createdBy"
              label="操作人">
            </el-table-column>
            <el-table-column
              prop="createdAt"
              label="操作时间">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="收费记录" name="second" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="在场车辆" name="third" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="停车历史记录" name="forth" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="巡更任务" name="fifth" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="巡更问题" name="sixth" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilterBar from '@/views/call-center/search-bar.vue'
import { ParkingSpace, DashboardModule } from '@/store/modules/dashboard'

@Component({
  components: {
    FilterBar
  }
})
export default class extends Vue {
  private bodyCellStyle = {
    'border-width': 0
  }

  private headerCellStyle = {
    color: 'black',
    background: '#F2F6FC',
    'border-width': 0
  }

  private activeTab= 'first'

  get assets(): ParkingSpace[] {
    return DashboardModule.parkingData
  }

  get records() {
    return DashboardModule.parkingRecords;
  }
}
</script>

<style lang="scss" scoped>
  .secure-center {
    &-container {
      .table-container {
        margin-top: 30px;
      }

      .tab-container {
        margin-top: 30px;
        background: white;
      }
    }
  }
</style>
