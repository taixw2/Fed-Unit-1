import { h } from 'snabbdom/build/package/h'
import Header from './components/header'
import List from './components/list'
import Menu from './components/menu'

const Container = () => {
  return h(
    'div#container-content',
    { style: { width: '600px', margin: '0 auto' } },
    [Header(), Menu(), List()]
  )
}

export default function Home() {
  return h(
    'div#container',
    { style: { background: '#1d1c19', height: '100vh' } },
    [Container()]
  )
}
