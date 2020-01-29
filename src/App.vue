<template>
  <div id="app">
    <my-header></my-header>
    <my-tab></my-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import MyHeader from './components/my-header/my-header'
import MyTab from './components/my-tab/my-tab'
import Player from './components/player/player'

export default {
  components: {
    MyHeader,
    MyTab,
    Player
  }
}
</script>

<style>
</style>
