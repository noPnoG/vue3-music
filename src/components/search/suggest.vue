<template>
  <div ref="rootRef" class="suggest">
    <!-- v-loading:[loadingText]="loading"
    v-no-result:[noResultText]="noResult" -->
    <ul class="suggest-list">
      <!-- <li class="suggest-item" v-if="singer" @click="selectSinger(singer)">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li> -->
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
import { ref, watch } from 'vue'
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
    watch(
      () => props.query,
      (val) => {
        if (val) {
          search(val).then((res) => {
            songs.value = res.songs
            hasMore.value = res.hasMore
          })
        }
      }
    )

    return {
      songs,
      hasMore
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
