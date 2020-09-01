<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>{{ $store.state.count }}</div>

    <button @click="addCount(true)">同步+1</button>
    <button @click="addCount(false)">异步加1+1</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  created() {
    console.log(this)
  },
  components: {
    // HelloWorld
  },

  methods: {

    addCount(sync) {
      if (sync) {
        this.$store.commit('addCount')
        return
      }
      this.$store.dispatch('asyncAddCount')
    },
    
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
