<!-- 业主车位信息 -->
<template>
  <div class="owner-parking-container">
    <div class="label">
      关联资产
    </div>
    <ul class="content">
      <li>
        <div class="main">
          <span>房源: 都铎城邦（云秀）1号院874</span>
          <span>[车位]</span>
        </div>
        <div class="help-block">
          <span>物业费到期时间：</span>
          <span>2021-05-27</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
  .owner-parking {
    &-container {
      position: relative;
      background: white;
      height: 225px;
      border-radius: 6px;

      .label {
        padding: 10px 30px;
        position: absolute;
        left: 0;
        top: 0;
        background-color: $labelBgColor;
        color: white;
        font-size: 15px;
        border-radius: 6px 0px 28px 0px;
      }

      .content {
        margin: 0;
        padding: 50px 20px;

        > li {
          @include flex-justify-space-between;
          font-size: 14px;

          .main {
            span:last-child {
              margin-left: 5px;
              color: #1A936F;
            }
          }

          .help-block {
            span:first-child {
              color: #909399;
            }
            span:last-child {
              color: #FE5F55;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
