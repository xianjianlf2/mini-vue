import { camelize, toHandlerKey } from '@guide-mini-vue/shared'

export function emit(instance, event, ...args) {
  console.log('emit  ' + event)

  // instance.props ->event

  const { props } = instance

  // TPP
  // 先写一个特定的行为 =》 重构成通用的行为
  // add

  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]

  handler & handler(...args)
}
