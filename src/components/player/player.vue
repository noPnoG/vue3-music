<template>
  <div class="player">
      <div class="normal-player" v-show="fullScreen">
          <div class="background">
              <img :src="currentSong.pic" >
          </div>
          <div class="top">
              <div class="back" @click="goback">
                  <i class="icon-back"></i>
              </div>
              <h1 class="title">{{currentSong.name}}</h1>
              <h1 class="subtitle">{{currentSong.singer}}</h1>
          </div>
      </div>
  </div>
  <audio ref="audioRef"></audio>
</template>

<script>
import { computed, ref, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const audioRef = ref(null)
    const fullScreen = computed(() => store.state.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)

    watch(currentSong, (newSong) => {
      if (!newSong.id || !newSong.url) { return }
      const audioEl = audioRef.value
      audioEl.src = newSong.url
      audioEl.play()
    })
    function goback () {
      store.commit('setFullScreen', false)
    }
    return {
      fullScreen,
      currentSong,
      audioRef,
      goback
    }
  }
}
</script>

<style lang="scss" scoped>
 .player{
     .normal-player{
         position: fixed;
         top: 0;
         right: 0;
         bottom:0;
         left:0;
         z-index: 150;
         background: $color-background;
     }
     .background{
         position: absolute;
         left: 0;
         top: 0;
         width: 100%;
         height: 100%;
         z-index: -1;
         opacity: 0.6;
         filter: blur(20px);
         img{
             width: 100%;
             height: 100%;
         }
     }
     .top {
        position: relative;
        margin-bottom: 25px;
        .back {
          position: absolute;
          top: 0;
          left: 6px;
          z-index: 50;
        }
        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
        .title {
          width: 70%;
          margin: 0 auto;
          line-height: 40px;
          text-align: center;
          @include no-wrap();
          font-size: $font-size-large;
          color: $color-text;
        }
        .subtitle {
          line-height: 20px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-text;
        }
      }
 }
</style>
