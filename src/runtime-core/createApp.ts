import { createVNode } from './vnode'

// 导出一个render
export function createAppAPI(render) {
  return function createApp(rootComponent) {
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
}
