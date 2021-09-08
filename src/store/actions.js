import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/util'
export function selectPlay ({ commit }, { list, index }) {
  commit('setPlayMode', PLAY_MODE.sequence)
  commit('setSequenceList', list)
  commit('setCurrentIndex', index)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlayList', list)
}

export function randomPlay ({ commit }, list) {
  commit('setPlayMode', PLAY_MODE.random)
  commit('setSequenceList', list)
  commit('setCurrentIndex', 0)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
  commit('setPlayList', shuffle(list))
}

export function changeMode ({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id
  if (mode === PLAY_MODE.random) {
    commit('setPlayList', shuffle(state.sequenceList))
  } else {
    commit('setPlayList', state.sequenceList)
  }

  const index = state.playList.findIndex((song) =>
    song.id === currentId
  )
  commit('setCurrentIndex', index)
  commit('setPlayMode', mode)
}

export function removeSong ({ state, commit }, song) {
  const sequenceList = state.sequenceList.slice()
  const playList = state.playList.slice()
  const sequenceIndex = sequenceList.findIndex((item) => item.id === song.id)
  const playIndex = playList.findIndex((item) => item.id === song.id)

  if (sequenceIndex < 0 || playIndex < 0) {
    return
  }
  sequenceList.splice(sequenceIndex, 1)
  playList.splice(playIndex, 1)
  let currentIndex = state.currentIndex
  if (playIndex < currentIndex || currentIndex === playList.length) {
    currentIndex--
  }
  commit('setSequenceList', sequenceList)
  commit('setPlayList', playList)
  commit('setCurrentIndex', currentIndex)

  if (!playList.length) {
    commit('setPlayingState', false)
  }
}

export function clearPlayList ({ commit }) {
  commit('setPlayList', [])
  commit('setSequenceList', [])
  commit('setCurrentIndex', 0)
  commit('setPlayingState', false)
}

export function addsong ({ commit, state }, song) {
  const sequenceList = state.sequenceList.slice()
  const playList = state.playList.slice()
  let currentIndex = state.currentIndex
  const playIndex = findIndex(playList, song)

  if (playIndex > -1) {
    currentIndex = playIndex
  } else {
    playList.push(song)
    currentIndex = playList.length - 1
  }

  const sequenceIndex = findIndex(sequenceList, song)
  if (sequenceIndex === -1) {
    sequenceList.push(song)
  }
  commit('setSequenceList', sequenceList)
  commit('setPlayList', playList)
  commit('setCurrentIndex', currentIndex)
  commit('setPlayingState', true)
  commit('setFullScreen', true)
}

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
