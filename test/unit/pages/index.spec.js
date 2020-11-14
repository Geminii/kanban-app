import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Index from '~/pages/Index.vue'
import initialStages from '~/data/default-stages'

const nbDefaultStages = initialStages().stages.length
const localVue = createLocalVue()
localVue.use(Vuex)
const actions = {}

const store = new Vuex.Store({
  modules: {
    kanban: {
      namespaced: true,
      state: initialStages(),
      getters: {},
      actions,
    },
  },
})

describe('Index', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(Index, {
      localVue,
      store,
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test(`has ${nbDefaultStages} default stages`, () => {
    const wrapper = shallowMount(Index, {
      localVue,
      store,
    })
    expect(wrapper.findAll('stage-card-stub').length).toEqual(nbDefaultStages)
  })
})
