import { ShapeFlags } from '../shared/ShapeFlags'
import { isObject } from './../shared/index'
import { createComponentInstance, setupComponent } from './component'
import { Fragment, Text } from './vnode'

export function render(vnode, container) {
  // 调用 patch 方法
  // 方便后面节点做遍历处理

  patch(vnode, container, null)
}

function patch(vnode, container, parentComponent) {
  const { type, shapeFlag } = vnode
  // ShapeFlags
  // 标识 虚拟节点 属于哪个

  // Fragment => 只渲染 children
  switch (type) {
    case Fragment:
      processFragment(vnode, container, parentComponent)
      break
    case Text:
      processText(vnode, container)
      break

    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container, parentComponent)
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container, parentComponent)
      }
      break
  }
}

function processElement(vnode: any, container: any, parentComponent) {
  // element 分为初始化和更新
  mountElement(vnode, container, parentComponent)
}

function mountElement(vnode: any, container: any, parentComponent) {
  const el = (vnode.el = document.createElement(vnode.type))

  const { children, shapeFlag } = vnode

  // 处理子节点
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    // text children
    el.textContent = children
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    // vnode
    // 传入容器  应该是挂载到父节点上面
    mountChildren(vnode, el, parentComponent)
  }

  // props
  const { props } = vnode
  for (const key in props) {
    const val = props[key]
    // 具体的 click => 抽象出来  通用
    // on + Event name

    const isOn = (key: string) => /^on[A-Z]/.test(key)
    if (isOn(key)) {
      const event = key.slice(2).toLowerCase()
      el.addEventListener(event, val)
    } else {
      el.setAttribute(key, val)
    }
  }
  // 父容器 挂载节点
  container.append(el)
}

function mountChildren(vnode, container, parentComponent) {
  // 数组里面都是vnode
  // 需要遍历下去
  vnode.children.forEach((v) => {
    patch(v, container, parentComponent)
  })
}

function processComponent(vnode: any, container: any, parentComponent) {
  mountComponent(vnode, container, parentComponent)
}
function mountComponent(initialVNode: any, container, parentComponent) {
  const instance = createComponentInstance(initialVNode, parentComponent)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance: any, initialVNode, container) {
  const { proxy } = instance
  // 绑定
  const subTree = instance.render.call(proxy)

  patch(subTree, container, instance),
    // vnode -> patch
    // vnode ->element -> mountElement

    // element -> mount 所有的element处理完成
    (initialVNode.el = subTree.el)

  initialVNode.el = subTree.el
}

function processFragment(vnode: any, container: any, parentComponent) {
  mountChildren(vnode, container, parentComponent)
}

function processText(vnode: any, container: any) {
  const { children } = vnode

  const textNode = (vnode.el = document.createTextNode(children))

  container.append(textNode)
}
