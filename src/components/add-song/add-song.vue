<template>
  <teleport to="body">
    <transition name="slide">
      <div class="add-song" v-show="visible">
        <div class="header">
          <h1 class="title">添加歌曲到列表</h1>
          <span class="close" @click="hide">
            <i class="icon-close"></i>
          </span>
        </div>
        <div class="input-wrap">
          <search-input v-model="query"></search-input>
        </div>
        <div v-show="!query">
          <switches :items="['最近播放', '搜索历史']" v-model="currentIndex">
          </switches>
          <div class="list-wrapper">
            <scroll
              class="list-scroll"
              ref="scrollRef"
              v-if="currentIndex === 0"
            >
              <div class="list-inner">
                <song-list :songs="playHistory" @select="selectSongBySongList"></song-list>
              </div>
            </scroll>
            <scroll
              class="list-scroll"
              ref="scrollRef"
              v-if="currentIndex === 1"
            >
              <search-list
                class="list-inner"
                :searches="searchHistory"
                :showDelete="false"
              @select="addQuery"
              ></search-list>
            </scroll>
          </div>
        </div>

        <div class="suggest-wrap" v-show="query">
          <suggest :query="query" :showSinger="false" @selectSong="selectSongBySuggest"></suggest>
        </div>
        <message ref="messageRef">
          <div class="message-title">
            <i class="icon-ok"></i>
            <span class="text">1首歌曲已经添加到播放列表</span>
          </div>
        </message>
      </div>
    </transition>
  </teleport>
</template>

<script>
import Suggest from '../search/suggest.vue'
import Scroll from '@/components/base/scroll/scroll'
import Message from '@/components/base/message/message'
import SearchInput from '../search/search-input.vue'
import { computed, ref, watch, nextTick } from 'vue'
import Switches from '../base/switches/switches.vue'
import SongList from '../song-list/song-list.vue'
import { useStore } from 'vuex'
import SearchList from '../base/search-list/search-list.vue'
import useSearchHistory from '@/components/search/use-search-history'
export default {
  components: {
    Suggest,
    SearchInput,
    Switches,
    SongList,
    SearchList,
    Scroll,
    Message
  },
  setup() {
    const visible = ref(false)
    const query = ref('')
    const currentIndex = ref(0)
    const store = useStore()
    const scrollRef = ref(null)
    const messageRef = ref(null)
    const searchHistory = computed(() => {
      return store.state.searchHistory
    })
    const playHistory = computed(() => {
      return store.state.playHistory
    })
    const { saveSearch } = useSearchHistory()
    watch(query, async () => {
      await nextTick()
      refreshScroll()
    })
    async function show() {
      visible.value = true
      await nextTick()
      refreshScroll()
    }
    function selectSongBySuggest(song) {
      addSong(song)
      saveSearch(query.value)
    }
    function selectSongBySongList({ song }) {
      addSong(song)
    }
    function addSong(song) {
      store.dispatch('addsong', song)
      showMessage()
    }
    function showMessage() {
      messageRef.value.show()
    }
    function hide() {
      visible.value = false
    }
    function refreshScroll() {
      scrollRef.value.scroll.refresh()
    }
    function addQuery(s) {
      query.value = s
    }
    return {
      visible,
      hide,
      show,
      query,
      currentIndex,
      searchHistory,
      playHistory,
      scrollRef,
      addQuery,
      selectSongBySongList,
      selectSongBySuggest,
      messageRef
    }
  }
}
</script>

<style lang="scss" scoped>
.add-song {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
  z-index: 300;
  .header {
    position: relative;
    height: 44px;
    text-align: center;
    .title {
      font-size: $font-size-large;
      color: $color-text;
      line-height: 44px;
    }
    .close {
      position: absolute;
      top: 0px;
      right: 0px;
      .icon-close {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: $color-theme;
      }
    }
  }
  .input-wrap {
    margin: 20px;
  }
  .suggest-wrap {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }
  .list-wrapper {
    position: absolute;
    top: 165px;
    bottom: 0;
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
.message-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 4px;
    }
    .text {
      font-size: $font-size-medium;
      color: $color-text;
    }
  }
</style>
