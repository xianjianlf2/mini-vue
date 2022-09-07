// mini-vue 的出口

export * from '@guide-mini-vue/runtime-dom'
import { baseCompile } from '@guide-mini-vue/compiler-core'
import * as runtimeDom from '@guide-mini-vue/runtime-dom'
import { registerRuntimeCompiler } from '@guide-mini-vue/runtime-dom'

// 需要一个render函数
function compileToFunction(template) {
  const { code } = baseCompile(template)
  const render = new Function('Vue', code)(runtimeDom)
  return render
}

registerRuntimeCompiler(compileToFunction)
