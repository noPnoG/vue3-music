<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"> </search-input>
    </div>
    <scroll class="search-content" v-show="!query" ref="scroll">
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li
              class="item"
              v-for="item in hotKeys"
              :key="item.id"
              @click="addQuery(item.key)"
            >
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <confirm
            ref="confirmRef"
            text="是否清空所有搜索历史"
            confirm-btn-text="清空"
            @confirm="clearSearch"
          ></confirm>
          <search-list
            :searches="searchHistory"
            @select="addQuery"
            @delete="removeSearch"
          ></search-list>
        </div>
      </div>
    </scroll>
    <div class="search-result" v-show="query">
      <suggest
        :query="query"
        @select-song="selectSong"
        @select-singer="selectSinger"
      ></suggest>
    </div>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Scroll from '@/components/wrap-scroll'
import SearchInput from '@/components/search/search-input'
import Suggest from '@/components/search/suggest'
import { ref, computed, watch, nextTick } from 'vue'
import { getHotKeys } from '@/service/search'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { SINGER_KEY } from '@/assets/js/constant'
import storage from 'good-storage'
import Confirm from '@/components/base/confirm/confirm'
import SearchList from '@/components/base/search-list/search-list'
import useSearchHIstory from '@/components/search/use-search-history.js'
export default {
  components: {
    SearchInput,
    Suggest,
    Scroll,
    Confirm,
    SearchList
  },
  setup() {
    const query = ref('')
    const hotKeys = ref([])
    const store = useStore()
    const router = useRouter()
    const selectedSinger = ref(null)
    const confirmRef = ref(null)
    const scroll = ref(null)
    getHotKeys().then((res) => {
      hotKeys.value = res.hotKeys
    })
    function addQuery(key) {
      console.log(key)
      query.value = key
    }
    const searchHistory = computed(() => {
      return store.state.searchHistory
    })
    const { removeSearch, addSearch, clearSearch } = useSearchHIstory()
    function selectSong(song) {
      addSearch(song.name)
      store.dispatch('addsong', song)
    }
    function selectSinger(singer) {
      addSearch(singer.name)
      selectedSinger.value = singer
      cacheSinger(singer)
      router.push({
        path: `/search/${singer.mid}`
      })
    }
    watch(query, async (newQuery) => {
      if (!newQuery) {
        await nextTick()
        scroll.value.scroll.refresh()
      }
    })
    function cacheSinger(singer) {
      storage.session.set(SINGER_KEY, singer)
    }
    function showConfirm() {
      confirmRef.value.show()
    }

    return {
      scroll,
      selectSong,
      selectSinger,
      query,
      hotKeys,
      addQuery,
      confirmRef,
      showConfirm,
      clearSearch,
      searchHistory,
      removeSearch,
      selectedSinger
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
  .search-content {
    flex: 1;
    overflow: hidden;
    .hot-keys {
      margin: 0 20px 20px 20px;
      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
    .search-history {
      position: relative;
      margin: 0 20px;
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;
        .text {
          flex: 1;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  }
  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
