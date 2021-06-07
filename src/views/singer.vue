<template>
  <div class="singer" v-loading="!singers.length">
    <index-list
      :data="singers"
    ></index-list>
      <!-- @select="selectSinger" -->
    <!-- <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"/>
      </transition>
    </router-view> -->
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
      Component: {}
    }
  },
  async created () {
    const data = await getSingerList()
    console.log(data)
    this.singers = data.singers
  },
  methods: {
    selectSinger () {}
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
