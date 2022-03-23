//高阶函数

import { track, trigger } from './effect'

// 优化点1：在初始化的时候只生成一次
// 避免了重复创建getter
const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)

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
