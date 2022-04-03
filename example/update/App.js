import { h, ref } from '../../lib/guide-mini-vue.esm.js'

window.self = null
export const App = {
  setup() {
    const count = ref(0)

    const onClick = () => {
      count.value++
    }

    return {
      count,
      onClick,
    }
  },
  render() {
    console.log(this.count)
    return h(
      'div',
      {
        id: 'root',
      },
      [
        // 依赖收集
        h('div', {}, 'count:' + this.count),
        h(
          'button',
          {
            onClick: this.onClick,
          },
          'click'
        ),
      ]
    )
  },
}
