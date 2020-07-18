import { h } from 'snabbdom/build/package/h'

export default () =>
  h(
    'div#header',
    { style: { color: '#cecdb1', fontSize: '50px', padding: '20px 0 10px' } },
    'Top 10 Movies'
  )
