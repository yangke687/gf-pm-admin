<template>
  <div class="call-center-container">
    <FilterBar />
    <Owner />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FilterBar from './search-bar.vue'
import Owner from './owner-summaries.vue'

@Component({
  name: 'Call-Center',
  components: {
    FilterBar,
    Owner
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
</style>
