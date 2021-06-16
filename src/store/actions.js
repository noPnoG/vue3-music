import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'
export function selectPlay ({ commit }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.sqeuence)
  commit('setSqeuenceList', list)
  commit('setCurrentIndex', index)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlayList', list)
}

export function randomPlay ({ commit }, list) {
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSqeuenceList', list)
  commit('setCurrentIndex', 0)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlayList', shuffle(list))
}
