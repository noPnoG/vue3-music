import { PLAY_MODE, HISTORY_KEY } from '@/assets/js/constant'
import { load } from '@/assets/js/array-store'
const state = {
  sequenceList: [],
  playList: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: [],
  searchHistory: load(HISTORY_KEY),
  playHistory: []
}

export default state
