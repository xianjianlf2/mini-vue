import { isObject } from './../shared/index'
import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // 调用 patch 方法
  // 方便后面节点做遍历处理

  patch(vnode, container)
}

function patch(vnode, container) {
  // 去处理 组件
  // TODO 判断是不是 element 类型
  // 如何区分 element 类型和 Component类型
  // processElement()
  console.log(vnode.type)
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}

function processElement(vnode: any, container: any) {
  // element 分为初始化和更新
  mountElement(vnode, container)
}

function mountElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type))

  const { children } = vnode

  // 处理子节点
  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    // vnode
    // 传入容器  应该是挂载到父节点上面
    mountChildren(vnode, el)
  }

  // props
  const { props } = vnode
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }
  // 父容器 挂载节点
  container.append(el)
}

function mountChildren(vnode, container) {
  // 数组里面都是vnode
  // 需要遍历下去
  vnode.children.forEach((v) => {
    patch(v, container)
  })
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}
function mountComponent(initialVNode: any, container) {
  const instance = createComponentInstance(initialVNode)

  setupComponent(instance)
  setupRenderEffect(instance, initialVNode, container)
}

function setupRenderEffect(instance: any, initialVNode, container) {
  const { proxy } = instance
  // 绑定
  const subTree = instance.render.call(proxy)

  patch(subTree, container)

  // vnode -> patch
  // vnode ->element -> mountElement

  // element -> mount 所有的element处理完成
  initialVNode.el = subTree.el

  initialVNode.el = subTree.el
}