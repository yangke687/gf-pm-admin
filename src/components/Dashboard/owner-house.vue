<!-- 业主房源信息 -->
<template>
  <div class="owner-house-container building-bg">
    <div class="label">
      房屋信息
    </div>
    <ul class="content">
      <li>都铎城邦（云秀）1号院1-1-1-601</li>
      <li>建筑面积：152.67</li>
      <li>套内面积：127.69</li>
      <li>赠送面积：0</li>
    </ul>
  </div>
</template>

<script lang="ts">
</script>

<style lang="scss" scoped>
  .owner-house {
    &-container {
      @include flex-align-items-center;
      padding: 0 20px;
      position: relative;
      height: 225px;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;

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
        padding: 0;
        margin-top: 30px;
        list-style: none;
        font-size: 14px;
        color: white;

        > li {
          white-space: nowrap;
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
