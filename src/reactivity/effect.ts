class ReactiveEffect {
  private _fn: any
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    this._fn()
  }
}
let activeEffect
export function effect(fn) {
  // fn
  const _effect = new ReactiveEffect(fn)

  _effect.run()
}

const targetMap = new Map()
export function track(target, key) {
  // set 不能重复
  // target -> key -> dep

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)

  if (!dep) {
    dep = new Set()
    depsMap.set(target, depsMap)
  }

  dep.add(activeEffect)
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)

  let dep = depsMap.get(key)

  for (const effect of dep) {
    effect.run()
  }
}