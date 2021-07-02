<template>
  <div class="singer" v-loading="!singers.length">
    <index-list
      :data="singers"
      @select="selectSinger"
    ></index-list>
    <router-view v-slot="{Component}">
      <transition appear name="slide">
        <component :is="Component" :siner="selectedSinger"/>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-List/indexList.vue'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
export default {
  components: {
    IndexList
  },
  data () {
    return {
      singers: [],
      selectedSinger: null
    }
  },
  async created () {
    const data = await getSingerList()
    this.singers = data.singers
  },
  methods: {
    selectSinger (singer) {
      this.selectedSinger = singer
      this.cacheSinger(singer)
      this.$router.push({ path: `/singer/${singer.mid}` })
    },
    cacheSinger (singer) {
      storage.session.set(SINGER_KEY, singer)
    }
  }

}
</script>

<style lang='scss' scoped>
.singer{
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
