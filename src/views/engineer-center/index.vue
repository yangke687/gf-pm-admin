<template>
  <div class="engineer-center-container">
    <div class="tab-container">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="保养记录" name="first" class="owner-tab">
          <!-- 搜索栏 -->
          <div class="search-bar row">
            <div class="col">
              设备名称:
               <el-input
                placeholder="请输入"
                clearable
                style="width: 154px;"
              />
            </div>
            <div class="col">
              保养类型:
               <el-select
                placeholder="请选择"
                style="width: 154px;"
              >
                <el-option label="一级保养" value="一级保养" />
                <el-option label="二级保养" value="二级保养" />
                <el-option label="三级保养" value="三级保养" />
              </el-select>
            </div>
            <div class="col">
              保养状态:
               <el-select
                placeholder="请选择"
                style="width: 154px;"
              >
                <el-option label="已完成" value="已完成" />
                <el-option label="未完成" value="未完成" />
              </el-select>
            </div>
            <el-button type="primary">查询</el-button>
          </div>
          <!--  -->
          <div class="table-container">
            <el-table
              :data="records"
              :cell-style="bodyCellStyle"
              :header-cell-style="headerCellStyle"
              style="width: 100%">
                <el-table-column
                  prop="project"
                  label="所属项目（楼盘）">
                </el-table-column>
                <el-table-column
                  prop="devNo"
                  label="设备编码">
                </el-table-column>
                <el-table-column
                  prop="devCat"
                  label="设备类别">
                </el-table-column>
                <el-table-column
                  prop="devName"
                  label="设备名称">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="保养类型">
                </el-table-column>
                <el-table-column
                  prop="devPos"
                  label="设备位置">
                </el-table-column>
                <el-table-column
                  prop="standard"
                  label="保养标准">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="保养状态">
                </el-table-column>
                <el-table-column
                  prop="maintainedAt"
                  label="保养日期">
                </el-table-column>
                <el-table-column
                  prop="maintainer"
                  label="保养人">
                </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="维修记录" name="second" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="巡查记录" name="third" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="设备类型管理" name="forth" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="设备信息" name="fifth" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="设备分类导入" name="sixth" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="设备信息导入" name="seventh" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="维保信息推送" name="eighth" class="owner-tab">
          <el-empty description="暂无数据" :image-size="64"></el-empty>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DashboardModule } from '@/store/modules/dashboard'

@Component
export default class extends Vue {
  private activeTab = 'first';

  private bodyCellStyle = {
    'border-width': 0
  }

  private headerCellStyle = {
    color: 'black',
    background: '#F2F6FC',
    'border-width': 0
  }

  get records() {
    return DashboardModule.devMaintainData
  }
}
</script>

<style lang="scss" scoped>
  .engineer-center{
    &-container{
      background: white;

      .search-bar {
        display: flex;
        padding: 20px 26px;

        .col {
          margin-right: 15px;
          color: $darkTextColor;
          font-size: 14px;
        }
      }

      .table-container {
        padding: 0 26px;
      }
    }
  }
</style>
