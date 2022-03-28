import { h } from '../../lib/guide-mini-vue.esm.js'

window.self = null
export const App = {
  render() {
    // ui
    // return h('div', 'hi, ' + this.msg)
    window.self = this
    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
      },
      // setupState
      // this.$el
      // 解决问题：使用Proxy代理对象来完成挂载
      'hi,' + this.msg
      // [
      //   h(
      //     'p',
      //     {
      //       class: 'red',
      //     },
      //     'hi'
      //   ),
      //   h(
      //     'p',
      //     {
      //       class: 'blue',
      //     },
      //     'mini-vue'
      //   ),
      // ]
    )
  },

  setup() {
    return {
      msg: 'mini-vue',
    }
  },
}
