import { shallowMount } from '@vue/test-utils'
import StageCard from '~/components/card/StageCard.vue'

const emptyStage = {
  title: 'To do',
  matters: [],
}

describe('StageCard', () => {
  test('is a Vue instance', () => {
    const wrapper = shallowMount(StageCard, {
      propsData: {
        stage: emptyStage,
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('has a title', () => {
    const wrapper = shallowMount(StageCard, {
      propsData: {
        stage: emptyStage,
      },
    })
    expect(wrapper.find('[data-test=stage-title]').text()).toMatch(
      emptyStage.title
    )
  })
})
