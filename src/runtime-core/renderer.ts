import { effect } from '../reactivity/effect'
import { ShapeFlags } from '../shared/ShapeFlags'
import { isObject } from './../shared/index'
import { createComponentInstance, setupComponent } from './component'
import { createAppAPI } from './createApp'
import { Fragment, Text } from './vnode'

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options

  function render(vnode, container) {
    // 调用 patch 方法
    // 方便后面节点做遍历处理

    patch(null, vnode, container, null)
  }

  //  n1 代表prev
  //  n2 代表current
  function patch(n1, n2, container, parentComponent) {
    const { type, shapeFlag } = n2
    // ShapeFlags
    // 标识 虚拟节点 属于哪个

    // Fragment => 只渲染 children
    switch (type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent)
        break
      case Text:
        processText(n1, n2, container)
        break

      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent)
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent)
        }
        break
    }
  }

  function processElement(n1, n2: any, container: any, parentComponent) {
    // element 分为初始化和更新
    if (!n1) {
      mountElement(n2, container, parentComponent)
    } else {
      patchElement(n1, n2, container)
    }
  }

  function patchElement(n1, n2, container) {
    console.log('patchElement')
    console.log('n1', n1)
    console.log('n2', n2)
  }

  function mountElement(vnode: any, container: any, parentComponent) {
    const el = (vnode.el = hostCreateElement(vnode.type))

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

      // const isOn = (key: string) => /^on[A-Z]/.test(key)
      // if (isOn(key)) {
      //   const event = key.slice(2).toLowerCase()
      //   el.addEventListener(event, val)
      // } else {
      //   el.setAttribute(key, val)
      // }

      hostPatchProp(el, key, val)
    }
    // 父容器 挂载节点
    // container.append(el)

    hostInsert(el, container)
  }

  function mountChildren(vnode, container, parentComponent) {
    // 数组里面都是vnode
    // 需要遍历下去
    vnode.children.forEach((v) => {
      patch(null, v, container, parentComponent)
    })
  }

  function processComponent(n1, n2: any, container: any, parentComponent) {
    mountComponent(n2, container, parentComponent)
  }
  function mountComponent(initialVNode: any, container, parentComponent) {
    const instance = createComponentInstance(initialVNode, parentComponent)

    setupComponent(instance)
    setupRenderEffect(instance, initialVNode, container)
  }

  function setupRenderEffect(instance: any, initialVNode, container) {
    // 依赖收集
    effect(() => {
      if (!instance.isMounted) {
        console.log('init')
        const { proxy } = instance
        // 绑定
        const subTree = (instance.subTree = instance.render.call(proxy))
        console.log(subTree)
        patch(null, subTree, container, instance)
        // vnode -> patch
        // vnode ->element -> mountElement

        // element -> mount 所有的element处理完成

        initialVNode.el = subTree.el
        instance.isMounted = true
      } else {
        console.log('update')
        const { proxy } = instance
        // 绑定
        const subTree = instance.render.call(proxy)
        const prevSubTree = instance.subTree
        instance.subTree = subTree

        patch(prevSubTree, subTree, container, instance)
      }
    })
  }

  function processFragment(n1, n2: any, container: any, parentComponent) {
    mountChildren(n2, container, parentComponent)
  }

  function processText(n1, n2: any, container: any) {
    const { children } = n2

    const textNode = (n2.el = document.createTextNode(children))

    container.append(textNode)
  }

  return {
    createApp: createAppAPI(render),
  }
}
