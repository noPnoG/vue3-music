import { PLAY_KEY } from '@/assets/js/constant.js'
import { useStore } from 'vuex'
import { save } from '@/assets/js/array-store.js'
export default function usePlayHistory() {
  const store = useStore()
  function savePlay(song) {
    const maxlen = 200
    const songs = save(song, PLAY_KEY, (item) => {
      return item.id === song.id
    }, maxlen)
    store.commit('setPlayHistory', songs)
  }
  return { savePlay }
}
