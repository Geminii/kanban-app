import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import OptionsDropdown from '~/components/dropdown/OptionsDropdown.vue'
Vue.use(vClickOutside)

const localVue = createLocalVue()
localVue.use(Vuex)

const displayOptions = {
  displayColors: true,
  displayReferences: true,
}

const getters = {
  displayOptions() {
    return displayOptions
  },
}

const mutations = {
  DISPLAY_OPTION: jest.fn(),
}

const store = new Vuex.Store({
  modules: {
    kanban: {
      namespaced: true,
      state: {
        stages: {},
        displayOptions,
      },
      getters,
      mutations,
      actions: {},
    },
  },
})

async function openDropdown(wrapper) {
  wrapper.find('[data-test=options-dropdown]').trigger('click')
  await wrapper.vm.$nextTick()
}

describe('OptionsDropdown', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(OptionsDropdown, {
      localVue,
      store,
    })
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('open options dropdown', () => {
    openDropdown(wrapper).then(() => {
      expect(
        wrapper.find('[data-test=options-dropdown-open]').isVisible()
      ).toBeTruthy()
    })
  })

  test('close options dropdown', async () => {
    // Dropdown need to be open
    wrapper.setData({ isDropdownOpen: true })
    await wrapper.vm.$nextTick()

    // Then simulate an outside click to close dropdown
    wrapper.vm.closeDropdown()
    await wrapper.vm.$nextTick()

    expect(
      wrapper.find('[data-test=options-dropdown-open]').isVisible()
    ).toBeFalsy()
  })

  test("don't display option colors", () => {
    openDropdown(wrapper).then(() => {
      wrapper.find('[data-test=options-dropdown-colors]').trigger('click')
      expect(mutations.DISPLAY_OPTION).toHaveBeenCalled()
    })
  })

  test("don't display option references", () => {
    openDropdown(wrapper).then(() => {
      wrapper.find('[data-test=options-dropdown-references]').trigger('click')
      expect(mutations.DISPLAY_OPTION).toHaveBeenCalled()
    })
  })
})
