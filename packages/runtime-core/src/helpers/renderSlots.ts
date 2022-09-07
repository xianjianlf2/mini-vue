import { createVNode, Fragment } from '../vnode'

export function renderSlots(slots, name, props) {
  const slot = slots[name]

  if (slot) {
    // function
    if (typeof slot === 'function') {
      // children 不可以有array
      // Fragment  特殊标识
      return createVNode(Fragment, {}, slot(props))
    }
  }
  // 传入 slots 创建虚拟节点
}
