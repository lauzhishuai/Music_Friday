import jsonp from '@/common/js/jsonp'
import {
  commonParams,
  options
} from './config'
import axios from 'axios'

export function getRecommend() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
  let url = '/api/getDiscList'
  let data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })
  return axios.get(url, {
    params: data
  }).then(function (response) {
    return Promise.resolve(response.data)
  }).catch(function (error) {
    console.log(error)
  })
}
