import { isReactive, reactive,isProxy } from '../reactive'

describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 1 }

    const observed = reactive(original)
    expect(observed).not.toBe(original)

    expect(observed.foo).toBe(1)
    // 验证Proxy
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(original)).toBe(false)
    expect(isProxy(observed)).toBe(true)
  })
})
