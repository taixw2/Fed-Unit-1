import Vue from 'vue'
import App from './App.vue'
import Vuex from './sample-vuex'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
  },

  mutations: {
    addCount(state) {
      state.count += 1
    },
  },

  actions: {
    asyncAddCount(context) {
      setTimeout(() => {
        context.commit('addCount')
      }, 1000)
    },
  },
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
