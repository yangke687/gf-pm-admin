<!-- 业主信息汇总 -->
<template>
  <div class="owner-container">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="业主信息" name="first" class="owner-tab">
        <div class="owner">
          <el-row type="flex">
            <el-col class="col" :span="3">
              业主: {{ owner.name }}
              <i class="el-icon-edit" @click="openOwnerDialog"></i>
            </el-col>
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
        <el-empty description="暂无数据" :image-size="64"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="通话记录" name="thrid">
        <el-empty description="暂无数据" :image-size="64"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="收费信息" name="fourth">
        <el-empty description="暂无数据" :image-size="64"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="车辆信息" name="fifth">
        <el-empty description="暂无数据" :image-size="64"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="装修信息" name="sixth">
        <el-empty description="暂无数据" :image-size="64"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="车辆白名单" name="seventh">
        <el-empty description="暂无数据" :image-size="64"></el-empty>
      </el-tab-pane>
    </el-tabs>
    <!-- 编辑业主信息弹窗 -->
    <el-dialog
      title="编辑"
      :visible="ownerDialogShown"
      class="owner-form"
      @close="closeOwnerDialog"
    >
      <el-row>
        <!-- 第一列 -->
        <el-col :span="12">
          <el-row class="form-row">
            <label>业主姓名</label>
            <el-input style="width: 250px;" :value="owner.name" />
          </el-row>
          <el-row class="form-row">
            <label>证件类型</label>
            <el-radio-group :value="owner.idType">
              <el-radio label="身份证">身份证</el-radio>
              <el-radio label="护照">护照</el-radio>
            </el-radio-group>
          </el-row>
          <el-row class="form-row">
            <label>证件号码</label>
            <el-input style="width: 250px;" :value="owner.idNum" />
          </el-row>
          <el-row class="form-row">
            <label>性别</label>
            <el-radio-group :value="owner.gender">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-row>
          <el-row class="form-row">
            <label>名族</label>
            <el-input style="width: 250px;" :value="owner.nation" />
          </el-row>
        </el-col>
        <!-- 第二列 -->
        <el-col :span="12">
          <el-row class="form-row">
            <label>户籍地址</label>
            <el-input style="width: 250px;" />
          </el-row>
          <el-row class="form-row">
            <label>工作单位</label>
            <el-input style="width: 250px;" />
          </el-row>
          <el-row class="form-row">
            <label>紧急联系人</label>
            <el-input style="width: 250px;" />
          </el-row>
          <el-row class="form-row">
            <label>紧急联系方式</label>
            <el-input style="width: 250px;" />
          </el-row>
          <el-row class="form-row">
            <label>备注</label>
            <el-input style="width: 250px;" type="textarea" />
          </el-row>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOwnerDialog">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Owner, DashboardModule } from '@/store/modules/dashboard'

@Component
export default class extends Vue {
  private activeTab= 'first'
  private ownerDialogShown = false

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

  private openOwnerDialog() {
    this.ownerDialogShown = true
  }

  private closeOwnerDialog() {
    this.ownerDialogShown = false
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

          i {
            margin-left: 5px;
            font-size: 14px;
            font-weight: bold;
            color: $iconBlueColor;
            cursor: pointer;
          }
        }
      }

      .owner-form {
        .form-row {
          display: flex;
          margin-bottom: 30px;
          align-items: center;

          > * {
            &:first-child {
              margin-right: 35px;
              width: 90px;
            }
          }
        }
      }
    }
  }
</style>
