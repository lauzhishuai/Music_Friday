import {
  playMode
} from '@/common/js/config'

const state = {
  singer: {},
  playing: false, // 播放状态
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}

export default state
