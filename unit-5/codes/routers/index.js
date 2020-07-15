function $(ele) {
  return {
    on(event, target, handler) {
      ele.addEventListener(event, function (event) {
        if (typeof target === 'function') {
          target(event)
          return
        }
        const nodeName = event.target.nodeName
        if (nodeName === target || nodeName === target.toUpperCase()) {
          handler.call(event.target, event)
        }
      })
    },
  }
}

function autoRender(fn) {
  autoRender.currentRun = fn
  fn()
  autoRender.currentRun = null
}

function observer(obj) {
  const funMap = {}
  return new Proxy(obj, {
    set(target, key, value) {
      Reflect.set(target, key, value)
      if (funMap[key]) {
        funMap[key].forEach((fn) => fn())
      }
    },
    get(target, key) {
      if (!autoRender.currentRun) {
        return Reflect.get(target, key)
      }
      funMap[key] = funMap[key]
        ? [autoRender.currentRun, ...funMap[key]]
        : [autoRender.currentRun]
      return Reflect.get(target, key)
    },
  })
}

const data = observer({ currentPage: '' })

$(document).on('click', 'a', function (event) {
  event.preventDefault()
  const href = this.getAttribute('href')
  const replace = this.getAttribute('replace')

  data.currentPage = replace || href
  if (replace) {
    history.replaceState({ path: replace }, '', replace)
    return
  }
  history.pushState({ path: href }, '', href)
})

$(window).on('popstate', function (e) {
  data.currentPage = history.state.path || ''
})

const routers = {
  '/': function component() {
    document.getElementById('router-view').textContent = '首页'
  },
  '/other': function component() {
    document.getElementById('router-view').textContent = '其他页面'
  },
  '/404': function component() {
    document.getElementById('router-view').textContent = '404'
  },
}

autoRender(function () {
  const component = routers[data.currentPage]
  console.log('component', data.currentPage)
  if (component) {
    component()
    return
  }

  routers['/404']()
})
