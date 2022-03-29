import { Foo } from './Foo.js'
import { h } from '../../lib/guide-mini-vue.esm.js'

export const App = {
  name: 'App',
  render() {
    return h('div', {}, [
      h('div', {}, 'hi,' + this.msg),
      h(Foo, {
        // emit
        onAdd(a, b) {
          console.log('onAdd', a, b)
        },
        // add-foo -> addFoo
        onAddFoo() {
          console.log('onAddFoo')
        },
      }),
    ])
  },

  setup() {
    return {}
  },
}
