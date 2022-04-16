import { NodeTypes } from './ast'

export function baseParse(content: string) {
  const context = createParseContext(content)
  return createRoot(parseChildren(context))
}

function parseChildren(context) {
  const nodes: any = []

  // 当遇到{{}} 才处理
  let node
  if (context.source.startsWith('{{')) {
    node = parseInterpolation(context)
  }

  nodes.push(node)

  return nodes
}

function parseInterpolation(context) {
  // 接收 {{message}}

  const openDelimiter = '{{'
  const closeDelimiter = '}}'

  const closeIndex = context.source.indexOf(
    closeDelimiter,
    closeDelimiter.length
  )
  // 推进代码
  advanceBy(context, openDelimiter.length)

  const rawContentLength = closeIndex - openDelimiter.length

  const rawcontent = context.source.slice(0, rawContentLength)
  const content = rawcontent.trim()

  // 删除处理完的字符
  advanceBy(context, rawContentLength + closeDelimiter.length)

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content,
    },
  }
}

function advanceBy(context: any, length: number) {
  context.source = context.source.slice(length)
}

function createRoot(children) {
  return {
    children,
  }
}
function createParseContext(content: string) {
  return {
    source: content,
  }
}
