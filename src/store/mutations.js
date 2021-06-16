const mutations = {
  setPlayingState (state, playing) {
    state.playing = playing
  },
  setSqeuenceList (state, list) {
    state.sqeuenceList = list
  },
  setPlayList (state, list) {
    state.playList = list
  },
  setPlayMode (state, mode) {
    state.mode = mode
  },
  setCurrentIndex (state, index) {
    state.currentIndex = index
  },
  setFullScreen (state, fullScreen) {
    state.fullScreen = fullScreen
  }
}

export default mutations
