import patch from './patch'
import { Provider } from './store'
import Home from './home'

patch(document.getElementById('app'), Provider({ children: [Home] }))
