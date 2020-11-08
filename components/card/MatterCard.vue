<template>
  <div
    class="border rounded border-t-4 relative pl-2 py-4 mb-4"
    :class="edit ? 'pr-2' : 'pr-8'"
    :style="`border-color: ${matter.color}`"
  >
    <template v-if="edit">
      <div class="flex justify-between items-center">
        <input
          ref="title"
          v-model="matter.title"
          type="text"
          data-test="matter-input-title"
          class="border rounded border-gray-300 py-2 px-3 w-full transition duration-150 ease-in-out text-indigo-600 font-medium hover:border-kanban-lightgreen focus:border-gray-500 focus:outline-none mr-4"
          placeholder="Title of your matter"
          @keyup.enter="saveCard"
        />
        <verte
          v-model="matter.color"
          v-click-outside="focusFieldIfEmptyTitle"
          menu-position="center"
          picker="square"
          model="hex"
        ></verte>
      </div>
      <div class="flex items-center">
        <button
          type="button"
          data-test="stage-add-matter"
          class="inline-flex items-center mt-2 pl-2 pr-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md light:text-gray-700 dark:text-dark-onSurfacePrimary light:hover:text-orange-500 dark:hover:text-orange-500 hover:border-orange-500 focus:outline-none focus:border-text-orange-500"
          @click="emitDone"
        >
          <icon-cancel class="h-5 w-5" />
          <span>Cancel</span>
        </button>
        <button
          type="button"
          data-test="stage-add-matter"
          class="inline-flex items-center ml-2 mt-2 pl-2 pr-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md light:text-gray-700 dark:text-dark-onSurfacePrimary light:hover:text-kanban-lightgreen dark:hover:text-kanban-lightgreen hover:border-kanban-lightgreen focus:outline-none focus:border-light-blue-300"
          @click="saveCard"
        >
          <icon-save class="h-5 w-5" />
          <span>Save</span>
        </button>
      </div>
    </template>
    <template v-else>
      <h2
        data-test="matter-title"
        class="text-medium leading-5 font-medium text-indigo-600"
      >
        {{ matter.title }}
      </h2>
      <span
        data-test="matter-reference"
        class="absolute text-sm leading-5 text-gray-500 top-0 right-6"
      >
        #{{ matter.reference }}
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { mapActions } from 'vuex'
import { MatterCard } from '~/types/matter-card'
import IconCancel from '~/components/icons/Cancel.vue'
import IconSave from '~/components/icons/Save.vue'
import { generateHexColor } from '~/utils/generator'

export default Vue.extend({
  name: 'MatterCard' as string,
  components: {
    IconCancel,
    IconSave,
  },
  props: {
    parentStageIndex: {
      type: Number,
      required: true,
    },
    matter: {
      type: Object as () => MatterCard,
      default() {
        return {
          id: '',
          title: '',
          reference: 0,
          order: 0,
          color: generateHexColor(),
        }
      },
    } as PropOptions<MatterCard>,
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isValidFormCard(): Boolean {
      return this.matter.title !== ''
    },
  },
  mounted() {
    if (this.edit) {
      this.focusTitleField()
    }
  },
  methods: {
    ...mapActions({
      createMatterCard: 'kanban/createTask',
    }),
    focusTitleField() {
      const title: any = this.$refs.title
      title.focus()
    },
    saveCard(): void {
      if (this.edit && this.isValidFormCard) {
        this.createMatterCard({
          parentStageIndex: this.parentStageIndex,
          matter: this.matter,
        })
        this.emitDone()

        // catch back-end error to display toaster message ;)
      }
    },
    emitDone(): void {
      this.$emit('editDone', false)
    },
    focusFieldIfEmptyTitle(): void {
      if (this.edit && this.matter.title === '') {
        this.focusTitleField()
      }
    },
  },
})
</script>
