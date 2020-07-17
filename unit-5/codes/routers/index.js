const data = observer({ currentPage: '' })

/**
 * Route Map
 */
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

const model = localStorage.getItem('model') || 'hash'

/**
 * event proxy
 */
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

/**
 * watcher
 */
function autoRender(fn) {
  autoRender.currentRun = fn
  fn()
  autoRender.currentRun = null
}

/**
 * observer
 */
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

/**
 * Render
 */
autoRender(function () {
  const component = routers[data.currentPage]
  if (component) {
    component()
    return
  }

  routers['/404']()
})

$(window).on('popstate', function (e) {
  if (model === 'hash') return
  data.currentPage = history.state.path || ''
})

$(window).on('hashchange', function (e) {
  if (model === 'history') return
  data.currentPage = location.hash.substr(1)
})

$(document).on('click', 'button', function (event) {
  localStorage.setItem('model', event.target.id)
  location.href = location.origin
})

$(document).on('click', 'a', function (event) {
  event.preventDefault()
  const href = this.getAttribute('href')
  const replace = this.getAttribute('replace')
  const type = replace ? 'replace' : 'href'

  if (model === 'history') {
    historyHandler(type === 'replace' ? replace : href, type)
    return
  }
  // 不支持 replace
  hashHandler(href, type)
})

/**
 * history handler
 *
 * @param {*} href
 * @param {*} type
 */
function historyHandler(href, type = 'push') {
  data.currentPage = href
  if (type === 'replace') {
    history.replaceState({ path: href }, '', href)
    return
  }
  history.pushState({ path: href }, '', href)
}

/**
 * hash handler
 * @param {*} href
 * @param {*} type
 */
function hashHandler(href, type = 'push') {
  if (type === 'replace') {
    console.warn('current model no support replace')
  }
  location.hash = '#' + href
}

function onLoad() {
  if (model === 'hash') {
    data.currentPage = location.hash.substr(1)
    return
  }
  data.currentPage = location.pathname
}

onLoad()
