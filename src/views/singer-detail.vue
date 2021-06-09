<template>
  <div class="singer-detail">singer-detail</div>
</template>

<script>
import { getSingerDetail } from '@/service/singer'
export default {
  props: {
    singer: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  async created () {
    console.log(this.singer)
    const singer = await getSingerDetail(this.singer)
    console.log(singer)
  }
}
</script>

<style lang="scss" scoped>
.singer-detail{
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $color-background;
}
</style>
