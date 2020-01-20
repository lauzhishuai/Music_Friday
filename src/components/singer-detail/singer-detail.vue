<template>
  <transition name="slide">
    <music-list :bg-image="bgImage" :title="title" :songs="song"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer.js'
import { ERR_OK } from '@/api/config.js'
import { createSong } from '@/common/js/songClass.js'
import MusicList from '@/components/music-list/music-list'

export default {
  data() {
    return {
      song: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created() {
    this._getSingerDetail(this.singer)
  },
  components: {
    MusicList
  },
  methods: {
    _getSingerDetail(singer) {
      getSingerDetail(singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.song = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'

.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
