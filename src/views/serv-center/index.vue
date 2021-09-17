<template>
  <div class="call-center-container">
    <!--- 搜索栏 -->
    <FilterBar />

    <!-- 资产 -->
    <el-row class="asset-container" :gutter="30">
      <!-- 房屋信息 -->
      <el-col :span="16">
        <el-row>
          <el-col :span="8">
            <House />
          </el-col>
          <el-col class="buttons-group" :span="16">
            <el-row>
              <!-- 去收费 -->
              <el-col :span="8" class="fee">
                <h3>2022-05-27</h3>
                <h6>物业费到期时间</h6>
                <el-button type="primary" @click="openModalCharge">
                  去收费
                </el-button>
                <h5>押金退还时间: 2022-07-01</h5>
              </el-col>
              <!-- 报工单 -->
              <el-col :span="8">
                <el-button type="secondary">报工单</el-button>
              </el-col>
              <!-- 车牌 -->
              <el-col :span="8" class="number-plate">
                <NumberPlate number="云APD666" />
                <NumberPlate number="云APX777" />
                <NumberPlate number="云AQY888" :active="false" />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <!-- 车位信息 -->
      <el-col :span="8">
        <Parking />
      </el-col>
    </el-row>

    <!-- 业主信息 -->
    <Owner />

    <!-- 收费弹窗 -->
    <ModalCharge
      :visible="modalChargeShown"
      @onClose="closeModalCharnge"
    />
    <!-- 报工单弹窗 -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilterBar from '@/views/call-center/search-bar.vue'
import Owner from '@/views/call-center/owner-summaries.vue'
import House from '@/components/Dashboard/owner-house.vue'
import Parking from '@/components/Dashboard/owner-parking.vue'
import NumberPlate from '@/components/Dashboard/number-plate.vue'
import ModalCharge from './modal-charge.vue'

@Component({
  name: 'Call-Center',
  components: {
    FilterBar,
    Owner,
    House,
    Parking,
    NumberPlate,
    ModalCharge,
  }
})
export default class extends Vue {
  private modalChargeShown = false

  private openModalCharge(): void {
    this.modalChargeShown = true
  }

  private closeModalCharnge(): void {
    this.modalChargeShown = false
  }
}
</script>

<style lang="scss" scoped>
  .asset-container {
    margin-top: 30px;

    .el-row {
      display: flex;

      .buttons-group {
        background: white;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;

        .el-row {
          height: 100%;

          .el-col {
            @include flex-align-items-center;
            @include flex-justify-center;
            @include flex-vertical;
            margin: 34px 0;
            border-left: 1px solid $lightGrayBorderColor;

            &.fee {
              h3, h5, h6 {
                margin: 0;
              }

              h3 {
                margin-bottom: 10px;
                color: $darkTextColor;
                font-size: 22px;
              }

              h6 {
                margin-bottom: 20px;
                color: $darkGrayTextColor;
                font-size: 14px;
              }

              h5 {
                margin-top: 30px;
                color: $redTextColor;
                font-size: 14px;
                font-weight: normal;
              }
            }

            &.number-plate {
              display: block;
              padding: 10px 15px;

              > * {
                margin: 0 10px 10px 0;
              }
            }

            h1 {
              margin: 0;
              color: #303133;
              font-size: 36px;
            }

            span {
              color: #999999;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
</style>
