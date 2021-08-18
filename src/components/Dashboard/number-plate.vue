<template>
  <div class="number-plate-container" v-bind:class="{active}">
    <h1>{{ this.number }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class extends Vue {
  @Prop(String) number!: string;
  @Prop({ type: Boolean, default: true }) active!: boolean;
}
</script>

<style lang="scss" scoped>
  .number-plate {
    &-container {
      display: inline-block;
      padding: 2px;
      color: white;
      background: #606266;
      border-radius: 6px;
      width: 95px;
      text-align: center;

      &.active {
        background: #409EFF;
      }

      h1 {
        margin: 0;
        padding: 5px 12px;
        font-size: 12px;
        font-weight: normal;
        border: 1px solid #FBFCFF;
        border-radius: 4px;
      }
    }
  }
</style>
