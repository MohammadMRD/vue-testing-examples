import { mount } from '@vue/test-utils'
import MyButton from '@/components/my-button.vue'

describe('MyButton component', () => {
  /**
   *
   * @param {import('@vue/test-utils').ThisTypedMountOptions<Vue>} options
   * @returns {import('@vue/test-utils').Wrapper<Vue>}
   */
  function mountMyButton(options) {
    return mount(MyButton, options)
  }

  it('should render properly', () => {
    const myButton = mountMyButton()

    expect(myButton.exists()).toBe(true)
  })

  it('should render given slot', () => {
    const contentText = 'Random Text'
    const slots = { default: `<strong data-tid="slot-content">${contentText}</strong>` }
    const myButton = mountMyButton({ slots })

    expect(myButton.text()).toBe(contentText)
    expect(myButton.find('[data-tid=slot-content]').exists()).toBe(true)
  })

  it('should support all variants', () => {
    ;['primary', 'secondary'].forEach((variant) => {
      const myButton = mountMyButton({ propsData: { variant } })
      const isSupportVariant = myButton.classes().includes(`c-button--${variant}`)

      expect(isSupportVariant).toBe(true)
    })
  })

  it('should preserve all given html attributes (standard, custom, data-*)', () => {
    const attrs = {
      disabled: 'disabled',
      id: 'random-id',
      type: 'submit',
      tid: 'random-tid',
      'aria-label': 'random-label',
      'data-random-attr': 'random-attr-value',
    }
    const myButton = mountMyButton({ attrs })
    const attributes = myButton.attributes()

    Object.entries(attrs).forEach(([key, value]) => {
      expect(attributes[key]).toEqual(value)
    })
  })

  it('should merge class attribute with its own classes', () => {
    const staticClass = 'random-class'
    const myButton = mountMyButton({ context: { staticClass } })

    expect(myButton.classes()).toEqual([staticClass, 'c-button', 'c-button--primary'])
  })

  it('should call on click handler', () => {
    const handler = jest.fn()
    const context = { on: { click: handler } }
    const myButton = mountMyButton({ context })

    myButton.element.click()

    expect(handler.mock.calls.length).toBe(1)
  })
})
