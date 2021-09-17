<template>
  <el-dialog
    title="收费"
    :visible="visible"
    class="charge-form"
    @close="closeFunc"
    width="1110px"
  >
    <!-- 收费信息 -->
    <el-row>
      <h2>收费信息</h2>
      <div class="block">
        <el-row class="form-row">
          <label>房源号</label>
          <el-checkbox-group v-model="houseIds">
            <el-checkbox label="2-16-1-101"></el-checkbox>
            <el-checkbox label="2-2-2-201"></el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row class="form-row">
          <label>缴费类型</label>
          <el-checkbox-group v-model="chargeTypes">
            <el-checkbox label="通用"></el-checkbox>
            <el-checkbox label="代收代缴"></el-checkbox>
            <el-checkbox label="其他"></el-checkbox>
          </el-checkbox-group>
        </el-row>
      </div>
    </el-row>
    <!-- 合计缴费 -->
    <el-row>
      <h2>合计缴费</h2>
      <div class="block">
        <el-row class='form-row dahsed-bottom-border'>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>单价</th>
                <th>面积</th>
                <th>应缴金额</th>
                <th>减免金额</th>
                <th>折扣</th>
                <th>折扣金额</th>
                <th>数量</th>
                <th>起止日期</th>
                <th>应收金额</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,idx) in areaFees" :key="idx">
                <td>{{ row.name }}</td>
                <td>{{ row.unitPrice }}</td>
                <td>{{ row.area }}</td>
                <td>{{ row.shouldPayAmount }}</td>
                <td>{{ row.reducedAmount }}</td>
                <td>{{ row.discount }}</td>
                <td>{{ row.discountAmount }}</td>
                <td>
                  <input v-model="row.period" style="width: 40px;" maxlength="2" />
                </td>
                <td>{{ row.duration }}</td>
                <td>{{ row.shouldRecvAmount }}</td>
                <td>
                  <input v-model="row.remark" />
                </td>
              </tr>
            </tbody>
          </table>
        </el-row>
        <el-row class='form-row dahsed-bottom-border'>
          <table>
            <thead>
              <tr>
                <th width="100"></th>
                <th>单价</th>
                <th>单位</th>
                <th>月份</th>
                <th>上月数</th>
                <th>本月数</th>
                <th>使用数量</th>
                <th>应缴金额</th>
                <th>应收金额</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,idx) in monthlyFees" :key="idx">
                <td>{{ row.name }}</td>
                <td>{{ row.unitPrice }}</td>
                <td>{{ row.unit }}</td>
                <td>{{ row.month }}</td>
                <td>{{ row.lastMonthValue }}</td>
                <td>{{ row.thisMonthValue }}</td>
                <td>{{ row.deltaValue }}</td>
                <td>{{ row.shouldPayAmount }}</td>
                <td>{{ row.shouldRecvAmount }}</td>
                <td>
                  <input v-model="row.remark" />
                </td>
              </tr>
            </tbody>
          </table>
        </el-row>
        <!-- 合计 -->
        <el-rw :gutter="20">
          <el-col :span="4">
            应缴金额: 3240.11
          </el-col>
          <el-col :span="4">
            减免金额: 0
          </el-col>
          <el-col :span="4">
            折扣金额: 0
          </el-col>
          <el-col :span="4">
            预存金额: 0
          </el-col>
          <el-col :span="4">
            预存折扣: 0
          </el-col>
          <el-col :span="4">
            应收金额: <font color="#EB2929"><b>3240.11</b></font>
          </el-col>
        </el-rw>
      </div>
    </el-row>
    <!-- 支付方式 -->
    <el-row>
      <h2>支付方式</h2>
      <div class="block">
        <el-row class="form-row">
          <el-checkbox-group v-model="paymentTypes">
            <el-checkbox label="现金"></el-checkbox>
            <el-checkbox label="POS机储蓄卡"></el-checkbox>
            <el-checkbox label="网银转账"></el-checkbox>
            <el-checkbox label="POS机信用卡"></el-checkbox>
            <el-checkbox label="扫码付"></el-checkbox>
            <el-checkbox label="支付宝"></el-checkbox>
            <el-checkbox label="微信转账"></el-checkbox>
          </el-checkbox-group>
        </el-row>
        <el-row class="form-row flex-wrap" v-if="paymentTypes.length > 0">
          <div v-for="(py, idx) in paymentTypes"
            class="form-row-col flex-wrap"
            :key="idx"
          >
            <label>{{ py }}:</label>
            <input />
          </div>
        </el-row>
        <el-row class="form-row"
          :class="{'form-row-negative-top-margin': paymentTypes.length > 0}">
          <label>特殊优惠:</label>
          <el-radio-group v-model="isDiscounted">
            <el-radio label="是" value="isDiscounted"></el-radio>
            <el-radio label="否" value="isDiscounted"></el-radio>
          </el-radio-group>
        </el-row>
        <el-row class="form-row">
          <label style="min-width: auto; margin-right: 5px;">
            备注:
          </label>
          <input style="flex: 1;" />
        </el-row>
      </div>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="success">生成缴费通知单</el-button>
      <el-button type="primary">提交收费</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IAreaFee, IMonthlyFee, DashboardModule } from '@/store/modules/dashboard'

@Component
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) visible!: Boolean;

  private houseIds: string[] = []; // 房源
  private chargeTypes: string[] = []; // 缴费类型
  private paymentTypes: string[] = []; // 支付方式
  private isDiscounted: Boolean = false; // 是否特殊优惠

  private closeFunc(): void {
    this.$emit('onClose')
  }

  get areaFees(): IAreaFee[] {
    return DashboardModule.areaFeesData
  }

  get monthlyFees(): IMonthlyFee[] {
    return DashboardModule.monthlyFeedsData
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    margin: 15px 0;
    font-size: 16px;
    color: black;
  }

  input {
    border: 0;
    border-bottom: 1px solid #CECECE;
    outline: 0;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .el-row {
    &:first-child {
      h2 {
        margin-top: 0;
      }
    }
  }

  .block {
    padding: 15px 30px;

    .form-row-negative-top-margin {
      margin-top: -20px;
    }

    .form-row {
      @include flex-align-items-center;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      > label {
        margin-right: 25px;
        min-width: 60px;
      }

      .form-row-col {
        @include flex-align-items-center;
        margin-bottom: 20px;

        > label {
          flex: 1;
        }

        input {
          flex: 0;
          width: 80px;
          margin-right: 45px;
          text-align: center;
        }
      }
    }
  }

  table {
    tr {
      td, th {
        padding: 5px 10px;
        text-align: left;
      }
    }
  }

  .dahsed-bottom-border {
    padding-bottom: 22px;
    border-bottom: dashed 1px #ccc;
  }
</style>
