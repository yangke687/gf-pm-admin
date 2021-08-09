<template>
  <div class="call-center-container">
    <FilterBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilterBar from './search-bar.vue'

@Component({
  name: 'Call-Center',
  components: {
    FilterBar
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
</style>
