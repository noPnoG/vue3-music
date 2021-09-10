<template>
  <div class="user-center" v-no-result:[noResultText]="noResult">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <div class="switch-wrap">
      <switches
        :items="['我喜欢的', '最近播放']"
        v-model="currentIndex"
      ></switches>
    </div>
    <div class="play-btn" v-show="currentList.length">
      <i class="icon-play"></i>
      <span class="text" @click="random" >随机播放全部</span>
    </div>
    <div class="list-wrap">
      <scroll class="list-scroll" v-if="currentIndex === 1">
          <div class="list-inner">
 <song-list
          :songs="playHistory"
          @select="selectSong"
        ></song-list>
          </div>

      </scroll>
      <scroll class="list-scroll" v-if="currentIndex === 0">
          <div class="list-inner">
<song-list
          :songs="favoriteList"
          @select="selectSong"
        ></song-list>
          </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Switches from '@/components/base/switches/switches.vue'
import SongList from '@/components/song-list/song-list.vue'
import Scroll from '@/components/wrap-scroll'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    Switches,
    SongList,
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    noResult() {
      return this.currentIndex === 0
        ? !this.favoriteList.length
        : !this.playHistory.length
    },
    currentList() {
      return this.currentIndex === 0 ? this.favoriteList : this.playHistory
    },
    noResultText() {
      return this.currentIndex === 0 ? '暂无数据' : '你还有没有播放音乐'
    },
    ...mapState(['playHistory', 'favoriteList'])
  },
  methods: {
    ...mapActions(['addsong', 'randomPlay']),
    back() {
      this.$router.back()
    },
    selectSong({ song }) {
      this.addsong(song)
    },
    random() {
      this.randomPlay(this.currentList)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: $color-background;
  .back {
    position: absolute;
    left: 10px;
    top: 10px;
    .icon-back {
      font-size: 20px;
      color: $color-theme;
    }
  }
  .switch-wrap {
    margin: 10px 0 30px 0;
  }
  .play-btn {
    margin: 0 auto;
    border: 1px solid $color-text-l;
    padding: 7px 0;
    width: 135px;
    border-radius: 100px;
    color: $color-text-l;
    font-size: $font-size-small;
    text-align: center;
    .icon-play {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      font-size: 16px;
    }
    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
    }
  }
  .list-wrap {
    position: absolute;
    top: 110px;
    bottom: 0px;
    width: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
      .list-inner {
        padding: 20px 30px;
      }
    }
  }
}
</style>
