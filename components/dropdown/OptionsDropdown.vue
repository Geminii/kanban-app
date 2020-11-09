<template>
  <div class="relative inline-block text-left">
    <div>
      <span class="rounded-md shadow-sm">
        <button
          id="options-menu"
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 pl-4 pr-2 py-2 bg-white text-sm leading-5 font-medium text-gray-700 light:hover:text-kanban-lightgreen dark:hover:text-kanban-lightgreen focus:outline-none focus:border-blue-300 focus:shadow-outline-blue hover:border-kanban-lightgreen"
          aria-haspopup="true"
          aria-expanded="true"
          data-test="options-dropdown"
          @click="isDropdownOpen = !isDropdownOpen"
        >
          Display options
          <chevron-up v-if="isDropdownOpen" class="ml-2 h-5 w-5" />
          <chevron-down v-else class="ml-2 h-5 w-5" />
        </button>
      </span>
    </div>

    <!-- Options -->
    <div
      v-show="isDropdownOpen"
      data-test="options-dropdown-open"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg"
    >
      <div
        class="rounded-md bg-white shadow-xs"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div
          aria-options="options-dropdown-list"
          class="flex flex-col px-4 py-2"
        >
          <label
            class="inline-flex items-center text-sm leading-5 text-gray-700 hover:text-gray-900 mb-2 cursor-pointer"
            role="menuitem"
          >
            <input
              v-model="displayColors"
              type="checkbox"
              data-test="options-dropdown-colors"
              class="form-checkbox h-5 w-5 active:border-gray-300 active:outline-none active:shadow-none focus:outline-none focus:shadow-none focus:border-gray-300 text-orange-600"
            />
            <span class="ml-2 text-orange-600">Show colors</span>
          </label>
          <label
            class="inline-flex items-center text-sm leading-5 text-gray-700 hover:text-gray-900 cursor-pointer"
            role="menuitem"
          >
            <input
              v-model="displayReferences"
              type="checkbox"
              data-test="options-dropdown-references"
              class="form-checkbox h-5 w-5 active:border-gray-300 active:outline-none active:shadow-none focus:outline-none focus:shadow-none focus:border-gray-300 text-gray-600"
              checked
            />
            <span class="ml-2 text-gray-700">Show references</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ChevronDown from '~/components/icons/chevron/ChevronDown.vue'
import ChevronUp from '~/components/icons/chevron/ChevronUp.vue'

export default Vue.extend({
  name: 'OptionsDropdown' as string,
  components: {
    ChevronDown,
    ChevronUp,
  },
  data() {
    return {
      isDropdownOpen: false,
      vcoConfig: {
        handler: this.handler,
        middleware: this.middleware,
        events: ['dblclick', 'click'],
        // Note: The default value is true, but in case you want to activate / deactivate
        //       this directive dynamically use this attribute.
        isActive: true,
        // Note: The default value is true. See "Detecting Iframe Clicks" section
        //       to understand why this behaviour is behind a flag.
        detectIFrame: true,
        // Note: The default value is false. Sets the capture option for EventTarget addEventListener method.
        //       Could be useful if some event's handler calls stopPropagation method preventing event bubbling.
        capture: false,
      },
    }
  },
  computed: {
    displayColors: {
      get(): Boolean {
        return this.$store.state.kanban.displayOptions.displayColors
      },
      set(value: Boolean) {
        this.$store.commit('kanban/DISPLAY_OPTION', {
          option: 'displayColors',
          isVisible: value,
        })
      },
    },
    displayReferences: {
      get(): Boolean {
        return this.$store.state.kanban.displayOptions.displayReferences
      },
      set(value: Boolean) {
        this.$store.commit('kanban/DISPLAY_OPTION', {
          option: 'displayReferences',
          isVisible: value,
        })
      },
    },
  },
  methods: {
    closeDropdown(): void {
      this.isDropdownOpen = false
    },
  },
})
</script>
