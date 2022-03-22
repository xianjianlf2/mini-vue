class ReactiveEffect {
  private _fn: any
  constructor(fn, public scheduler?) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    return this._fn()
  }
}
let activeEffect
export function effect(fn, options: any = {}) {
  // fn
  const _effect = new ReactiveEffect(fn, options.scheduler)

  _effect.run()

  // 把 _effect.run 这个方法返回
  // 让用户可以自行选择调用的时机（调用 fn）
  return _effect.run.bind(_effect)
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
    depsMap.set(key, dep)
  }

  dep.add(activeEffect)
}

export function trigger(target, key) {
  let depsMap = targetMap.get(target)

  let dep = depsMap.get(key)

  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler()
    } else {
      effect.run()
    }
  }
}
