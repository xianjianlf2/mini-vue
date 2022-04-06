/*
 * @Author: your name
 * @Date: 2022-04-03 17:23:44
 * @LastEditTime: 2022-04-04 01:12:11
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mini-vue\example\patchChildren\App.js
 */
import { h } from '../../lib/guide-mini-vue.esm.js'

import ArrayToText from './ArrayToText.js'
import TextToText from './TextToText.js'
import TextToArray from './TextToArray.js'
import ArrayToArray from './ArrayToArray.js'

export default {
  name: 'App',
  setup() {},

  render() {
    return h('div', { tId: 1 }, [
      h('p', {}, '主页'),
      // array => text
      // h(ArrayToText),
      // text => text
      // h(TextToText),
      // text => array
      // h(TextToArray),
      /// array => array
      h(ArrayToArray)
    ])
  },
}
