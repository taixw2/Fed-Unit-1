import Vue from './vue'

const vm = new Vue({
    data() {
        return {
            msg: "123"
        }
    },
    el: '#root'
})
window.vm = vm
