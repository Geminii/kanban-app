import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import vClickOutside from 'v-click-outside'
import MatterCard from '~/components/card/MatterCard.vue'
import defaultStages from '~/data/default-stages'
Vue.use(vClickOutside)

const parentStageIndex = 0
const matter = defaultStages.stages[parentStageIndex].cards[0]

const localVue = createLocalVue()
localVue.use(Vuex)

const actions = {
  'kanban/createTask': jest.fn(),
}

const store = new Vuex.Store({
  actions,
})

describe('MatterCard', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(MatterCard, {
      propsData: {
        parentStageIndex,
        matter,
      },
      localVue,
      store,
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('has a title', () => {
    const wrapper = shallowMount(MatterCard, {
      propsData: {
        parentStageIndex,
        matter,
      },
      localVue,
      store,
    })
    expect(wrapper.find('[data-test=matter-title]').text()).toMatch(
      matter.title
    )
  })

  test('has a reference', () => {
    const wrapper = shallowMount(MatterCard, {
      propsData: {
        parentStageIndex,
        matter,
      },
      localVue,
      store,
    })
    expect(wrapper.find('[data-test=matter-reference]').text()).toMatch(
      `#${matter.reference}`
    )
  })

  test('event done emitted if invalid form', async () => {
    const wrapper = shallowMount(MatterCard, {
      propsData: {
        parentStageIndex,
        edit: true,
      },
      localVue,
      store,
    })

    wrapper.vm.matter.title = ''
    wrapper.find('[data-test=matter-input-title]').trigger('keyup.enter')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('editDone')).toHaveLength(1)
    expect(wrapper.emitted('editDone')[0]).toEqual([false])
  })

  test('create a card if valid form', async () => {
    const wrapper = shallowMount(MatterCard, {
      propsData: {
        parentStageIndex,
        edit: true,
      },
      localVue,
      store,
    })

    wrapper.vm.matter.title = 'A simple matter'
    wrapper.find('[data-test=matter-input-title]').trigger('keyup.enter')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('editDone')).toHaveLength(1)
    expect(wrapper.emitted('editDone')[0]).toEqual([false])
  })
})
