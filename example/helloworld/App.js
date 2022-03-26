import { h } from '../../lib/guide-mini-vue.esm.js'

export const App = {
  render() {
    // ui
    return h('div', 'hi, ' + this.msg)
  },

  setup() {
    return {
      msg: 'mini-vue',
    }
  },
}
