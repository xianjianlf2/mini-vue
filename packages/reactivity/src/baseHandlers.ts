//高阶函数

import { extend } from '@guide-mini-vue/shared'
import { track, trigger } from './effect'
import { reactive, ReactiveFlags, readonly } from './reactive'

// 优化点1：在初始化的时候只生成一次
// 避免了重复创建getter
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }

    const res = Reflect.get(target, key)

    if (shallow) {
      return res
    }

    if (!isReadonly) {
      track(target, key)
    }

    return res
  }
}
function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)

    trigger(target, key)
    return res
  }
}

export const mutableHandlers = {
  // 缓存
  get,
  set,
}

export const readonlyHandlers = {
  get: readonlyGet,

  set(target, key, value) {
    console.warn(`key:${key} set 失败，因为 target 是 readonly`, target)
    return true
  },
}

export const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet,
})
