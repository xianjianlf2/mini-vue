import { h, renderSlots } from '../../lib/guide-mini-vue.esm.js'

export const Foo = {
  setup() {
    return {}
  },
  render() {
    const foo = h('p', {}, 'foo')

    // renderSlots
    console.log(this.$slots)

    // 获取渲染元素
    // 获取到渲染的位置
    // 具名插槽
    // 作用域 插槽

    const age = 18
    return h('div', {}, [
      renderSlots(this.$slots, 'header', { age }),
      foo,
      renderSlots(this.$slots, 'footer'),
    ])
    // return h('div', {}, [
    //   renderSlots(this.$slots, 'header', {
    //     age,
    //   }),
    //   foo,
    //   renderSlots(this.$slots, 'footer'),
    // ])
  },
}
