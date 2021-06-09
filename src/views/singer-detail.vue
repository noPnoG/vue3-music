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
    background: $color-background;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
}

</style>
