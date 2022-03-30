import { hasOwn } from '../shared/index'

const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
  $slots: (i) => i.slots,
}

export const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    // setupState 里面获取对象
    const { setupState, props } = instance
    if (key in setupState) {
      return setupState[key]
    }

    if (hasOwn(setupState, key)) {
      return setupState[key]
    } else if (hasOwn(props, key)) {
      return props[key]
    }

    const publicGetter = publicPropertiesMap[key]
    if (publicGetter) {
      return publicGetter(instance)
    }

    // setup => options data
    // $data
  },
}
