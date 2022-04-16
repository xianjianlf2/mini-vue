import { NodeTypes } from './ast'

const enum TagType {
  Start,
  End,
}

export function baseParse(content: string) {
  const context = createParseContext(content)
  return createRoot(parseChildren(context))
}

function parseChildren(context) {
  const nodes: any = []

  // 当遇到{{}} 才处理
  let node
  const s = context.source

  if (s.startsWith('{{')) {
    node = parseInterpolation(context)
  } else if (s[0] === '<') {
    if (/[a-z]/i.test(s[1])) {
      node = parseElement(context)
    }
  }

  if (!node) {
    node = parseText(context)
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

  const rawContent = parseTextData(context, rawContentLength)

  const content = rawContent.trim()

  advanceBy(context, closeDelimiter.length)

  // 删除处理完的字符

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
function parseElement(context: any) {
  // 解析 tag
  const element = parseTag(context, TagType.Start)

  parseTag(context, TagType.End)
  return element
}

function parseTag(context: any, type: TagType) {
  const match: any = /^<\/?([a-z]*)/i.exec(context.source)
  const tag = match[1]

  // 删除处理完成的代码
  advanceBy(context, match[0].length)
  advanceBy(context, 1)

  if (type === TagType.End) return

  return {
    type: NodeTypes.ELEMENT,
    tag: tag,
  }
}
function parseText(context: any): any {
  // 获取 context
  const content = parseTextData(context, context.source.length)
  return {
    type: NodeTypes.TEXT,
    content,
  }
}

function parseTextData(context: any, length) {
  const content = context.source.slice(0, length)
  // 推进
  advanceBy(context, content.length)
  return content
}
