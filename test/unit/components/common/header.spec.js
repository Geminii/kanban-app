import { shallowMount, createLocalVue } from '@vue/test-utils'
import Header from '~/components/common/Header.vue'

const localVue = createLocalVue()
localVue.component('nuxt-link', {
  props: ['to'],
  template: '<a href="#"><slot>NuxtLink</slot></a>',
})

describe('Header', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Header, {
      stubs: ['nuxt-link'],
      localVue,
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
