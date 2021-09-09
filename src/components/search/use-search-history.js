import { useStore } from 'vuex'
import { HISTORY_KEY } from '@/assets/js/constant.js'
import { save, remove, clear } from '@/assets/js/array-store.js'
export default function useSearchHIstory() {
  const store = useStore()
  const maxlen = 200
  function addSearch(query) {
    const items = save(
      query,
      HISTORY_KEY,
      (item) => {
        return query === item
      },
      maxlen
    )

    store.commit('setSearchHistory', items)
  }

  function removeSearch(query) {
    const items = remove(HISTORY_KEY, (item) => {
      return query === item
    })
    store.commit('setSearchHistory', items)
  }
  function clearSearch() {
    clear(HISTORY_KEY)
    store.commit('setSearchHistory', [])
  }
  return {
    addSearch,
    removeSearch,
    clearSearch
  }
}
