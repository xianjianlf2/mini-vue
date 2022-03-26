import { render } from './renderer'
import { createVNode } from './vnode'

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // 先 vnode
      // component -> vnode
      // 所有的逻辑操作都基于 vnode 处理

      const vnode = createVNode(rootComponent)

      render(vnode, rootContainer)
    },
  }
}
