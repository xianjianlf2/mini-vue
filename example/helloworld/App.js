import { h } from '../../lib/guide-mini-vue.esm.js'

export const App = {
  render() {
    // ui
    // return h('div', 'hi, ' + this.msg)

    return h(
      'div',
      {
        id: 'root',
        class: ['red', 'hard'],
      },
      [
        h(
          'p',
          {
            class: 'red',
          },
          'hi'
        ),
        h(
          'p',
          {
            class: 'blue',
          },
          'mini-vue'
        ),
      ]
    )
  },

  setup() {
    return {
      msg: 'mini-vue',
    }
  },
}
