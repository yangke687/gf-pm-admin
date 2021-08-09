<!-- 业主信息汇总 -->
<template>
  <div class="owner-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="业主信息" name="first" class="owner-tab">
        <div class="owner">
          <el-row type="flex">
            <el-col class="col" :span="3">业主: {{ owner.name }}</el-col>
            <el-col class="col" :span="3">性别: {{ owner.gender }}</el-col>
          </el-row>
          <el-row type="flex">
            <el-col class="col" :span="3">电话: {{ owner.phone }}</el-col>
            <el-col class="col" :span="6">证件号码: {{ owner.idNum }}</el-col>
          </el-row>
          <h3>家庭成员信息</h3>
          <el-table
            :data="owner.dependents"
            :cell-style="bodyCellStyle"
            :header-cell-style="headerCellStyle"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="idNum"
              label="证件号码">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="工单信息" name="second">
      </el-tab-pane>
      <el-tab-pane label="通话记录" name="thrid">
      </el-tab-pane>
      <el-tab-pane label="收费信息" name="fourth">
      </el-tab-pane>
      <el-tab-pane label="车辆信息" name="fifth">
      </el-tab-pane>
      <el-tab-pane label="装修信息" name="sixth">
      </el-tab-pane>
      <el-tab-pane label="车辆白名单" name="seventh">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Owner, DashboardModule } from '@/store/modules/dashboard'

@Component
export default class extends Vue {
  private activeTab= 'first'

  private bodyCellStyle = {
    'border-width': 0
  }

  private headerCellStyle = {
    color: 'black',
    background: '#F2F6FC',
    'border-width': 0
  }

  get owner(): Owner {
    return DashboardModule.ownerData
  }
}
</script>

<style lang="scss" scoped>
  .owner {
    &-container {
      margin-top: 30px;
      background-color: white;

      .owner-tab {
        padding: 20px;

        .owner {
          color: $darkerTextColor;
          font-size: 14px;

          .el-row {
            padding: 10px 0;
          }
        }
      }
    }
  }
</style>
