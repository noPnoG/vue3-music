<template>
  <div
    ref="rootRef"
    class="suggest"
    v-loading:[loadingText]="loading"
    v-no-result:[noResultText]="noResult"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-if="singer" @click="selectSinger(singer)">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li
        class="suggest-item"
        v-for="song in songs"
        :key="song.id"
        @click="selectSong(song)"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{ song.singer }}-{{ song.name }}</p>
        </div>
      </li>
      <!-- <div class="suggest-item" v-loading:[loadingText]="pullUpLoading"></div> -->
    </ul>
  </div>
</template>

<script>
import { search } from '@/service/search'
import { processSongs } from '@/service/song'
import { computed, ref, watch } from 'vue'
export default {
  props: {
    query: String,
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const songs = ref([])
    const hasMore = ref(false)
    const singer = ref(null)
    const page = ref(1)
    const loadingText = ref(null)
    const noResultText = ref('为空')
    const loading = computed(() => {
      return !songs.value && songs.value.length === 0
    })
    const noResult = computed(() => {
      return !singer.value && !songs.value.length && !hasMore.value
    })
    watch(
      () => props.query,
      async (val) => {
        if (!val) {
          return
        }
        await searchFirst()
      }
    )
    async function searchFirst () {
      if (!props.query) {
        return
      }
      page.value = 1
      songs.value = []
      singer.value = null
      hasMore.value = true
      const res = await search(props.query, page.value, props.showSinger).catch((err) => {
        console.log(err)
      })
      songs.value = await processSongs(res.songs)
      hasMore.value = res.hasMore
      singer.value = res.singer
    }
    return {
      songs,
      hasMore,
      loading,
      loadingText,
      singer,
      noResult,
      noResultText
    }
  }
}
</script>
<style lang="scss" scoped>
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        [class^='icon-'] {
          font-size: 14px;
          color: $color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text {
          @include no-wrap();
        }
      }
    }
  }
}
</style>
