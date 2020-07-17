import Vue from './vue'

const vm = new Vue({
  data() {
    return {
      msg: '123',
      num: 0,
    }
  },
  el: '#root',

  methods: {
    increment() {
      this.num++
    },
  },
})

// window.vm = vm
