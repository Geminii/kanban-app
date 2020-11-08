import { shallowMount } from '@vue/test-utils'
import StageCard from '~/components/card/StageCard.vue'
import defaultStages from '~/data/default-stages'

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
  test('is a Vue instance', () => {
    const wrapper = shallowMount(StageCard, {
      propsData: {
        stageIndex: 0,
        stage: emptyStage,
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('has a title', () => {
    const wrapper = shallowMount(StageCard, {
      propsData: {
        stageIndex: 0,
        stage: emptyStage,
      },
    })
    expect(wrapper.find('[data-test=stage-title]').text()).toMatch(
      emptyStage.title
    )
  })

  test(`has ${countMatters} matters in stage`, () => {
    const wrapper = shallowMount(StageCard, {
      propsData: {
        stageIndex: 0,
        stage: mattersStage,
      },
    })
    expect(wrapper.findAll('matter-card-stub').length).toEqual(countMatters)
  })

  test(`add matter into stage`, async () => {
    const wrapper = shallowMount(StageCard, {
      propsData: {
        stageIndex: 0,
        stage: mattersStage,
      },
    })

    const addMatterButton = wrapper.find('[data-test=stage-add-matter]')
    addMatterButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test=stage-add-matter]').exists()).toBeFalsy()
    expect(wrapper.findAll('matter-card-stub').length).toEqual(countMatters + 1)
  })

  test(`get edit done matter event`, async () => {
    const wrapper = shallowMount(StageCard, {
      propsData: {
        stageIndex: 0,
        stage: mattersStage,
      },
    })
    const addMatterButton = wrapper.find('[data-test=stage-add-matter]')
    addMatterButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test=stage-add-matter]').exists()).toBeFalsy()

    wrapper.vm.editDone()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test=stage-add-matter]').exists()).toBeTruthy()
  })
})
