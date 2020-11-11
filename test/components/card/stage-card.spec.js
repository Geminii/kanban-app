import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'
import Draggable from 'vuedraggable'
import StageCard from '~/components/card/StageCard.vue'
import defaultStages from '~/data/default-stages'

Vue.component('draggable', Draggable)

const localVue = createLocalVue()
localVue.use(Vuex)
const mutations = {
  UPDATE_STAGE_MATTERS: jest.fn(),
}
const actions = {}

const store = new Vuex.Store({
  modules: {
    kanban: {
      namespaced: true,
      state: defaultStages,
      getters: {},
      mutations,
      actions,
    },
  },
})

const emptyStage = {
  title: 'To do',
  matters: [],
}

const mattersStage = {
  title: 'Doing',
  cards: defaultStages.stages[0].cards,
}
const countMatters = mattersStage.cards.length

describe('StageCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(StageCard, {
      propsData: {
        stageIndex: 0,
        stage: emptyStage,
      },
      localVue,
      store,
    })
  })

  test('has a title', () => {
    expect(wrapper.find('[data-test=stage-title]').text()).toMatch(
      emptyStage.title
    )
  })

  test(`has ${countMatters} matters in stage`, () => {
    expect(wrapper.findAll('matter-card-stub').length).toEqual(countMatters)
  })

  test(`add matter into stage`, async () => {
    const addMatterButton = wrapper.find('[data-test=stage-add-matter]')
    addMatterButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test=stage-add-matter]').exists()).toBeFalsy()
    expect(wrapper.findAll('matter-card-stub').length).toEqual(countMatters + 1)
  })

  test(`get edit done matter event`, async () => {
    const addMatterButton = wrapper.find('[data-test=stage-add-matter]')
    addMatterButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test=stage-add-matter]').exists()).toBeFalsy()

    wrapper.vm.updateDone()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test=stage-add-matter]').exists()).toBeTruthy()
  })

  test('disabled draggable behavior if a matter emit disabledDraggable event', async () => {
    wrapper.vm.disabledDraggableDone(true)
    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('[data-test=stage-draggable]').attributes('disabled')
    ).toBeTruthy()
  })

  test(`insert a matter inside a stage`, async () => {
    const newMatter = {
      id: 'a4202556-8421-40e9-b05d-7774b586b3f3',
      title: 'My new matter',
      reference: 1,
      order: 0,
      color: '#347be5',
    }

    // Change matters in a stage of the store
    store.state.kanban.stages = [
      {
        id: 'b56e0c52-fe4e-4de3-a335-af046bbc078l',
        title: 'To do',
        order: 0,
        cards: [newMatter],
      },
    ]

    // Trigger new matters in stage
    wrapper.setData({
      matters: [newMatter],
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.matters.length).toEqual(1)
  })
})
