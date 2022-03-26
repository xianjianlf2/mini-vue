export const App = {
  // <template></template>
  // render

  render() {
    //UI 逻辑
    return h('div', 'hi,' + this.msg)
  },

  setup() {
    // composition api

    return {
      msg: 'mini-vue',
    }
  },
}
