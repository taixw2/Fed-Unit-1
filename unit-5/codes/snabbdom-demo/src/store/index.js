import { h } from 'snabbdom/build/package/h'
import { createStore } from 'redux'
import patch from '../patch'
import reducer from './reducer'

let store = createStore(reducer)
let vnode = null

function mountChildren(children) {
  return children.map((Child) => Child())
}

export const Provider = function (props) {
  if (props.store) {
    store = props.store
  }

  vnode = h('div', props, mountChildren(props.children))
  store.subscribe(() => {
    vnode = patch(vnode, h('div', props, mountChildren(props.children)))
  })
  return vnode
}

export const connect = function (mapStateToProps, mapDispatchToProps) {
  let states = {}
  let actions = {}
  return (WrapComponent) => {
    return (props) => {
      if (typeof mapStateToProps === 'function') {
        states = mapStateToProps(store.getState())
      }
      if (typeof mapDispatchToProps === 'function') {
        actions = mapDispatchToProps(store.dispatch)
      }
      return WrapComponent({
        ...states,
        ...actions,
        ...props,
        dispatch: store.dispatch,
      })
    }
  }
}
