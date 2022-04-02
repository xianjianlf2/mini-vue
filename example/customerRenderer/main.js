import { createRenderer } from '../../lib/guide-mini-vue.esm.js'
import { App } from './App.js'

console.log(PIXI)
// https://pixijs.io/guides/basics/getting-started.html
const game = new PIXI.Application({ width: 500, height: 500 })

document.body.append(game.view)

const renderer = createRenderer({
  createElement(type) {
    if (type === 'rect') {
      const rect = new PIXI.Graphics()
      rect.beginFill(0xff0000)
      rect.drawRect(0, 0, 200, 100)
      rect.endFill()

      return rect
    }
  },

  patchProp(el, key, val) {
    el[key] = val
  },

  insert(el, parent) {
    // PIXI 中的API
    parent.addChild(el)
  },
})

// const rootContainer = document.querySelector('#app')
// createApp(App).mount(rootContainer)

renderer.createApp(App).mount(game.stage)
