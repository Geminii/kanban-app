import { shallowMount } from '@vue/test-utils'
import ColorMode from '~/components/ColorMode.vue'

const colorMode = {
  value: 'light',
}

describe('ColorMode', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(ColorMode, {
      mocks: {
        $colorMode: colorMode,
      },
    })

    expect(wrapper.vm).toBeTruthy()
  })
})
