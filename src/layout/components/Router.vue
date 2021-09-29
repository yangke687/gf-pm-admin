<template>
<section class="vue-router-wrap">
  <router-tab />
</section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator'

@Component({
  name: 'vueRouerWrap'
})
export default class extends Vue {}
</script>
