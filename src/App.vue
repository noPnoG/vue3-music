<template>
  <m-header></m-header>
  <tab></tab>
  <router-view :style="viewStyle" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
  <router-view v-slot="{ Component }" name="UserCenter">
      <transition appear name="slide">
        <keep-alive>
        <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  <player></player>
</template>

<script>
import Header from '@/components/header/header'
import Tab from '@/components/tab/tab'
import Player from '@/components/player/player'
import { mapState } from 'vuex'
export default {
  components: {
    MHeader: Header,
    Tab,
    Player
  },
  computed: {
    ...mapState(['playList']),
    viewStyle () {
      const bottom = this.playList.length ? '60px' : '0'
      return { bottom }
    }
  }
}
</script>

<style>

</style>
