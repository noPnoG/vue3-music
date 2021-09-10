import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from '@/components/base/loading/directive'
import noResultDirective from '@/components/base/no-result/directive'
// 引入全局样式文件
import '@/assets/scss/index.scss'
import { load, setAll } from '@/assets/js/array-store.js'
import { PLAY_KEY, FAVORITE_KEY } from '@/assets/js/constant.js'
import { processSongs } from '@/service/song.js'
const playHistory = load(PLAY_KEY)
if (playHistory.length > 0) {
  processSongs(playHistory).then(songs => {
    store.commit('setPlayHistory', songs)
    setAll(PLAY_KEY, songs)
  })
}
const favoriteList = load(FAVORITE_KEY)
if (favoriteList.length > 0) {
  processSongs(favoriteList).then(songs => {
    store.commit('setFavoriteList', songs)
    setAll(FAVORITE_KEY, songs)
  })
}

createApp(App).use(store).use(router).use(lazyPlugin, {
  loading: require('@/assets/images/default.png')
}
).directive('loading', loadingDirective).directive('no-result', noResultDirective).mount('#app')
