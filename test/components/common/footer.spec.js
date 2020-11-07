import { shallowMount, createLocalVue } from '@vue/test-utils'
import Footer from '~/components/common/Footer.vue'

const colorMode = {
  value: 'light',
}

describe('Footer', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Footer, {
      mocks: {
        $colorMode: colorMode,
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
