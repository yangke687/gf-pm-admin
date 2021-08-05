<template>
  <ul class="notice-list root">
    <li class="notice-list-item" v-for="(notice, idx) in noticeData" :key="idx">
      <h5>{{ notice.title }}</h5>
      <span class="timestamp">
        {{ moment(notice.createdAt).format('YYYY-MM-DD') }}
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { DashboardModule } from '@/store/modules/dashboard'

@Component({
  name: 'Notice',
})
export default class extends Vue {
  get noticeData() {
    return DashboardModule.noticeData
  }
}
</script>

<style lang="scss" scoped>
  .root{
    background: white;
    min-height: 295px;
    border-radius: 6px;
  }

  .notice-list {
    margin: 0;
    padding: 0;
    padding-top: 25px;

    .notice-list-item {
      @include flex-justify-space-between;
      padding: 14px 10px;

      h5 {
        margin: 0;
        color: $darkTextColor;
        font-size: 14px;
      }

      .timestamp {
        color: #909399;
        font-size: 14px;
      }
    }
  }
</style>
