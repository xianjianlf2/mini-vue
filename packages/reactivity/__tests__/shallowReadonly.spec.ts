import { isReadonly, shallowReadonly } from '../src/reactive'

describe('shallowReadonly', () => {
  test('should not make non-reactive properties reactive', () => {
    const props = shallowReadonly({ n: { foo: 1 } })
    expect(isReadonly(props)).toBe(true)
    expect(isReadonly(props.n)).toBe(false)
  })

  it('should call console.warn when set', () => {
    console.warn = vi.fn()
    const user = shallowReadonly({
      age: 10,
    })

    user.age = 11
    expect(console.warn).toHaveBeenCalled()
  })
  it('warn then call set', () => {
    // console.warn()
    // mock
    console.warn = vi.fn()

    const user = shallowReadonly({
      age: 10,
    })

    user.age = 11

    expect(console.warn).toBeCalled()
  })
})
