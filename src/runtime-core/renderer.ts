import { createComponentInstance, setupComponent } from './component'

export function render(vnode, container) {
  // 调用 patch 方法
  // 方便后面节点做遍历处理

  patch(vnode, container)
}

function patch(vnode, container) {
  // 去处理 组件

  // 判断是不是 element 类型
  processComponent(vnode, container)
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}
function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode)

  setupComponent(instance)
  setupRenderEffect(instance, container)
}
function setupRenderEffect(instance: any, container) {
  const subTree = instance.render()

  patch(subTree, container)

  // vnode -> patch
  // vnode ->element -> mountElement
}
