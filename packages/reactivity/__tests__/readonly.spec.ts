import { isReadonly, readonly, isProxy } from '../src/reactive'

describe('readonly', () => {
  it('happy path', () => {
    //not set

    const original = { foo: 1, bar: { baz: 2 } }
    const wrapped = readonly(original)
    expect(wrapped).not.toBe(original)
    expect(isReadonly(wrapped)).toBe(true)
    expect(isReadonly(original)).toBe(false)
    expect(wrapped.foo).toBe(1)
    expect(isProxy(wrapped)).toBe(true)
  })

  it('warn then call set', () => {
    // console.warn()
    // mock
    console.warn = vi.fn()

    const user = readonly({
      age: 10,
    })

    user.age = 11

    expect(console.warn).toBeCalled()
  })
})
