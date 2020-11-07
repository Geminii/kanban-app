import { shallowMount } from '@vue/test-utils'
import Index from '~/pages/Index.vue'

describe('Index', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Index)
    expect(wrapper.vm).toBeTruthy()
  })
})
