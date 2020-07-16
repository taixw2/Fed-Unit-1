interface Watcher {
  update(): void
}

export default class Dep {
  static target?: Watcher

  subs: Watcher[]

  constructor() {
    this.subs = []
  }

  addSubs(watcher: Watcher) {
    this.subs.push(watcher)
  }

  notify() {
    this.subs.forEach((watch) => watch.update())
  }
}
