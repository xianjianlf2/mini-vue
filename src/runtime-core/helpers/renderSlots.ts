import { createVNode } from '../vnode'

export function renderSlots(slots, name,props) {
  const slot = slots[name]

  if (slot) {
    // function
    if (typeof slot === 'function') {
      return createVNode('div', {}, slot(props))
    }
  }
  // 传入 slots 创建虚拟节点
}
