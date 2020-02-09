import {
  getSongVkey,
  getSongURL,
  getLyrics
} from '@/api/song'
import {
  ERR_OK
} from '@/api/config'

// 创建Song类构建方法
export default class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image,
    url
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  // 获取歌曲能使用的URL
  getSongUrl() {
    if (this.url) {
      return Promise.resolve(this.url)
    }
    return getSongVkey(this.mid).then((res) => {
      if (res.code === ERR_OK) {
        if (res.data.items.length > 0) {
          let vkey = res.data.items[0].vkey
          if (!vkey) {
            return Promise.reject(new Error('getSongVkey function got vkey is null'))
          }
          let currentSongUrl = getSongURL(this.mid, vkey)
          // this.url = currentSongUrl
          return Promise.resolve(currentSongUrl)
        }
      }
    }).catch((err) => {
      return Promise.reject(err)
    })
  }

  // 获取歌词
  getLyrics() {
    getLyrics(this.mid).then((res) => {
      if (res.retcode === ERR_OK) {
        // this.lyric = Base64.decode(res.lyric)
        console.log(res.lyric)
        Promise.resolve(this.lyric)
      }
    }).catch((err) => {
      return Promise.reject(err)
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    // url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=6925689185&vkey=FC8A2D541E751BD37E80AA099D4762196B6B7E9C26B8AFB70F25C16D30A73E39FC8E4597AFB47483D4747FB5774740FFCACEAE5288D188A3&fromtag=66`
  })
  // http://ws.stream.qqmusic.qq.com/C400001uV2753XqhWU.m4a?guid=5435004746&vkey=F7ADB2C4BF8C0EE59C89BC8ADD8C908C13B35A70417ECC89712F02FAC58E71DE4FB97ACE7DE24CD667A80D991C161AE4F8BE883BE21AB08E&uin=5934&fromtag=66
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}
