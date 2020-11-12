import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import vClickOutside from 'v-click-outside'
import Verte from 'verte'
import flushPromises from 'flush-promises'
import MatterCard from '~/components/card/MatterCard.vue'
import defaultStages from '~/data/default-stages'
import ConfigHandler from '~/data/default-config-handler'
import { Action } from '~/types/action'
Vue.use(vClickOutside)
Vue.use(Verte)

const stageIndex = 0
const matter = defaultStages.stages[stageIndex].cards[0]
const $toast = {
  success() {
    return 'Success'
  },
  error() {
    return 'Error'
  },
}

const localVue = createLocalVue()
localVue.use(Vuex)

async function editTitle(wrapperMatter) {
  // click on title to edit the matter
  wrapperMatter.find('[data-test=matter-title]').trigger('click')
  await wrapperMatter.vm.$nextTick()
}

describe('MatterCard', () => {
  describe('Existing matter', () => {
    let wrapperMatter

    beforeEach(() => {
      wrapperMatter = shallowMount(MatterCard, {
        propsData: {
          stageIndex,
          data: matter,
        },
        mocks: {
          $toast,
        },
        localVue,
        store: new Vuex.Store({
          getters: {
            'kanban/displayOptions'() {
              return {
                displayColors: false,
                displayReferences: false,
              }
            },
          },
          actions: {
            'kanban/updateMatter'() {
              return Promise.resolve()
            },
            'kanban/deleteMatter'() {
              return Promise.resolve()
            },
          },
        }),
      })
    })

    test('has a title', () => {
      expect(wrapperMatter.find('[data-test=matter-title]').text()).toMatch(
        matter.title
      )
    })

    test('has a reference', () => {
      expect(wrapperMatter.find('[data-test=matter-reference]').text()).toMatch(
        `#${matter.reference}`
      )
    })

    test("don't apply border color style if display options colors to false", () => {
      expect(
        wrapperMatter.find('[data-test=matter-card]').attributes('style')
      ).toBeFalsy()
    })

    test("don't show reference if display options references to false", () => {
      expect(
        wrapperMatter.find('[data-test=matter-reference]').isVisible()
      ).toBeFalsy()
    })

    test('edit a matter emit updateDone event', async () => {
      await editTitle(wrapperMatter)

      wrapperMatter.vm.matter.title = 'An edited matter'
      wrapperMatter
        .find('[data-test=matter-input-title]')
        .trigger('keyup.enter')
      await wrapperMatter.vm.$nextTick()
      await flushPromises()

      expect(wrapperMatter.emitted('updateDone')).toHaveLength(1)
      expect(wrapperMatter.emitted('updateDone')[0]).toEqual([false])
    })

    test('edit a card with title then color must not focus title field', async () => {
      await editTitle(wrapperMatter)

      wrapperMatter.find('[data-test=matter-input-title]').trigger('blur')
      await wrapperMatter.vm.$nextTick()

      // Simulate an outside click out of the color box
      wrapperMatter.vm.focusFieldIfEmptyTitle()
      await wrapperMatter.vm.$nextTick()

      expect(
        wrapperMatter
          .find('[data-test=matter-input-title]')
          .attributes('aria-activedescendant')
      ).toBeFalsy()
    })

    test('disabled draggable behavior if color picker opened', async () => {
      await editTitle(wrapperMatter)

      wrapperMatter.find('[data-test=matter-colorpicker]').trigger('click')
      await wrapperMatter.vm.$nextTick()

      expect(wrapperMatter.emitted('disabledDraggable')).toHaveLength(1)
      expect(wrapperMatter.emitted('disabledDraggable')[0]).toEqual([true])
    })

    test('success when deleting an existing matter', async () => {
      await editTitle(wrapperMatter)

      wrapperMatter.find('[data-test=matter-delete]').trigger('click')
      await wrapperMatter.vm.$nextTick()

      wrapperMatter.find('[data-test=matter-confirmation]').trigger('click')
      await wrapperMatter.vm.$nextTick()
      await flushPromises()

      expect(wrapperMatter.vm.$toast.success()).toEqual('Success')
    })

    test('error when deleting an existing matter', async () => {
      // Create new matter to reject promise on deleting matter
      wrapperMatter = shallowMount(MatterCard, {
        propsData: {
          stageIndex,
          data: matter,
        },
        mocks: {
          $toast,
        },
        localVue,
        store: new Vuex.Store({
          getters: {
            'kanban/displayOptions'() {
              return {
                displayColors: false,
                displayReferences: false,
              }
            },
          },
          actions: {
            'kanban/deleteMatter'() {
              return Promise.reject(new Error())
            },
          },
        }),
      })

      await editTitle(wrapperMatter)

      wrapperMatter.find('[data-test=matter-delete]').trigger('click')
      await wrapperMatter.vm.$nextTick()

      wrapperMatter.find('[data-test=matter-confirmation]').trigger('click')
      await wrapperMatter.vm.$nextTick()
      await flushPromises()

      expect(wrapperMatter.vm.$toast.error()).toEqual('Error')
    })
  })

  describe('New matter', () => {
    let wrapperNewMatter

    beforeEach(() => {
      wrapperNewMatter = shallowMount(MatterCard, {
        propsData: {
          stageIndex,
          newMatter: true,
          action: Action.NEW,
        },
        mocks: {
          $toast,
        },
        localVue,
        store: new Vuex.Store({
          getters: {
            'kanban/displayOptions'() {
              return {
                displayColors: true,
                displayReferences: true,
              }
            },
          },
          actions: {
            'kanban/createMatter'() {
              return Promise.resolve()
            },
          },
        }),
      })
    })

    test('create a card if valid form emit updateDone event', async () => {
      wrapperNewMatter.vm.matter.title = 'A simple matter'
      wrapperNewMatter
        .find('[data-test=matter-input-title]')
        .trigger('keyup.enter')
      await wrapperNewMatter.vm.$nextTick()
      await flushPromises()

      expect(wrapperNewMatter.emitted('updateDone')).toHaveLength(1)
      expect(wrapperNewMatter.emitted('updateDone')[0]).toEqual([false])
    })

    test('create a card must focus field title', () => {
      expect(
        wrapperNewMatter
          .find('[data-test=matter-input-title]')
          .attributes('aria-activedescendant')
      ).toBeTruthy()
    })

    test('create a card must focus field title if color has been chosen before to write a title', () => {
      /// Simulate an outside click out of the color box
      wrapperNewMatter.vm.focusFieldIfEmptyTitle()

      expect(
        wrapperNewMatter
          .find('[data-test=matter-input-title]')
          .attributes('aria-activedescendant')
      ).toBeTruthy()
    })
    test('invalid form must have a border color', async () => {
      wrapperNewMatter.find('[data-test=matter-add]').trigger('click')
      await wrapperNewMatter.vm.$nextTick()

      expect(wrapperNewMatter.vm.formError).toBeTruthy()
    })

    test('invalid form must have a border color', async () => {
      wrapperNewMatter.find('[data-test=matter-add]').trigger('click')
      await wrapperNewMatter.vm.$nextTick()

      expect(wrapperNewMatter.vm.formError).toBeTruthy()
    })
  })

  describe('Error handling', () => {
    let wrapperError

    beforeEach(() => {
      wrapperError = shallowMount(MatterCard, {
        propsData: {
          stageIndex,
          newMatter: true,
          action: Action.NEW,
        },
        mocks: {
          $toast,
        },
        localVue,
        store: new Vuex.Store({
          getters: {
            'kanban/displayOptions'() {
              return {
                displayColors: true,
                displayReferences: true,
              }
            },
          },
          actions: {
            'kanban/createMatter'() {
              return Promise.reject(Error)
            },
          },
        }),
      })
    })

    test(`Catch error when creating ${ConfigHandler.MATTER_TITLE_ERROR} matter`, async () => {
      wrapperError.vm.matter.title = ConfigHandler.MATTER_TITLE_ERROR
      wrapperError.find('[data-test=matter-input-title]').trigger('keyup.enter')
      await wrapperError.vm.$nextTick()
      await flushPromises()

      expect(wrapperError.emitted().updateDone).toBeFalsy()
    })
  })
})
