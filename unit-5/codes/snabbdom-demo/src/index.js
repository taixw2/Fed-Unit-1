import patch from './patch'
// import { Provider } from './store'
// import Home from './home'

import { h } from 'snabbdom/build/package/h'

patch(document.getElementById('app'), h('div#app', []))
