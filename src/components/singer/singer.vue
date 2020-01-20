<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSingersList } from '@/api/singer.js'
import { ERR_OK } from '@/api/config.js'
import { createSinger } from '@/common/js/singerClass.js'
import ListView from '@/base/listView/listView.vue'
import { mapMutations } from 'vuex'

const HOT_TITLE = '热门'
const HOT_NUM = 10
export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingersList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._formatSingerList(res.data.list)
        }
      })
    },
    _formatSingerList(list) {
      // 构造map数据
      let map = {
        hot: {
          title: HOT_TITLE,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_NUM) {
          map.hot.items.push(createSinger(item))
        }
        // 填充a～z
        let key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(createSinger(item))
      })

      // 排序map数据
      let hot = []
      let others = []
      for (let key in map) {
        let value = map[key]
        if (value.title.match(/[a-zA-Z]/)) {
          others.push(value)
        } else if (value.title === HOT_TITLE) {
          hot.push(value)
        }
      }
      others.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(others)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped>
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
