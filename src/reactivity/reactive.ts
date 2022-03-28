import { isObject } from './../shared/index'
import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from './baseHandlers'

export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

export function reactive(raw) {
  return createReactiveObject(raw, mutableHandlers)
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandlers)
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY]
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value)
}

export function shallowReadonly(raw) {
  return createReactiveObject(raw, shallowReadonlyHandlers)
}

function createReactiveObject(target, baseHandlers) {
  if (!isObject(target)) {
    console.warn('target ${target} 必须是一个对象')
  }
  return new Proxy(target, baseHandlers)
}
