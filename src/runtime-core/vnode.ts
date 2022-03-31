import { ShapeFlags } from '../shared/ShapeFlags'

export const Fragment = Symbol('Fragment')
export const Text = Symbol('Fragment')

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    shapeFlag: getShapeFlag(type),
    el: null,
  }

  // children
  if (typeof children === 'string') {
    vnode.shapeFlag |= vnode.shapeFlag | ShapeFlags.TEXT_CHILDREN
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }

  // 组件+ children Object
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (typeof children === 'object') {
      vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN
    }
  }

  return vnode
}

function getShapeFlag(type) {
  return typeof type === 'string'
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT
}
export function createTextVNode(text: string) {
  return createVNode(Text, {}, text)
}
