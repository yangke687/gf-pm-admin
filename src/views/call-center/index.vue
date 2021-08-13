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
              <el-col :span="8">
                <el-button type="primary">报工单</el-button>
              </el-col>
              <el-col :span="8">
                <h1>0</h1>
                <span>待回访</span>
              </el-col>
              <el-col :span="8">
                <el-icon class="el-icon-video-pause el-icon" />
                <span>暂停</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <!-- 车位信息 -->
      <el-col :span="8">
      </el-col>
    </el-row>

    <!-- 业主信息 -->
    <Owner />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilterBar from './search-bar.vue'
import Owner from './owner-summaries.vue'
import House from '@/components/Dashboard/owner-house.vue'

@Component({
  name: 'Call-Center',
  components: {
    FilterBar,
    Owner,
    House
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
  .asset-container {
    margin-top: 30px;

    .el-row {
      display: flex;

      .buttons-group {
        background: white;

        .el-row {
          height: 100%;

          .el-col {
            @include flex-align-items-center;
            @include flex-justify-center;
            @include flex-vertical;
            margin: 34px 0;
            border-left: 1px solid $lightGrayBorderColor;

            h1 {
              margin: 0;
              color: #303133;
              font-size: 36px;
            }

            .el-icon {
              font-size: 36px;
              font-weight: bold;
              margin-bottom: 3px;
              color: #293462;
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
