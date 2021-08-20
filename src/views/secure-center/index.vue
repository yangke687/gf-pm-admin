<template>
  <div class="secure-center-container">
    <FilterBar :shownColumns="['车牌号']" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilterBar from '@/views/call-center/search-bar.vue'

@Component({
  components: {
    FilterBar
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
</style>
