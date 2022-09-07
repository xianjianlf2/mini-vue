import { h, ref } from '../../lib/guide-mini-vue.esm.js'

window.self = null
export const App = {
  setup() {
    const props = ref({
      foo: 'foo',
      bar: 'bar',
    })

    const onChangePropsDemo1 = () => {
      props.value.foo = 'new-foo'
    }
    const onChangePropsDemo2 = () => {
      props.value.foo = undefined
    }
    const onChangePropsDemo3 = () => {
      props.value = {
        foo: 'foo',
      }
    }

    return {
      props,
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3,
    }
  },
  render() {
    return h(
      'div',
      {
        id: 'root',
        ...this.props,
      },
      [
        h(
          'button',
          {
            onClick: this.onChangePropsDemo1,
          },
          'changeProps - 值改变了 - 修改'
        ),

        h(
          'button',
          {
            onClick: this.onChangePropsDemo2,
          },
          'changeProps - 值变成了 undefined - 删除'
        ),

        h(
          'button',
          {
            onClick: this.onChangePropsDemo3,
          },
          'changeProps - key 在新的里面没有了 - 删除'
        ),
      ]
    )
  },
}
