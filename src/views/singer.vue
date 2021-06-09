<template>
  <div class="singer" v-loading="!singers.length">
    <index-list
      :data="singers"
      @select="selectSinger"
    ></index-list>
    <router-view :singer="selectedSinger">
    </router-view>
     <!--  <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"/>
      </transition> -->
  </div>
</template>

<script>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/base/index-List/indexList.vue'
export default {
  components: {
    IndexList
  },
  data () {
    return {
      singers: [],
      Component: {},
      selectedSinger: {}
    }
  },
  async created () {
    const data = await getSingerList()
    this.singers = data.singers
  },
  methods: {
    selectSinger (item) {
      this.selectedSinger = item
      this.$router.push({ path: `/singer/${item.id}` })
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
