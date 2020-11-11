<template>
  <div
    data-test="matter-card"
    class="border rounded border-t-4 relative pl-2 py-4 mb-4 bg-white transition duration-500 ease-out-in"
    :class="isNewItem ? 'pr-2' : 'cursor-move pr-8'"
    :style="borderColor"
  >
    <div v-if="editing">
      <div class="flex justify-between items-center">
        <input
          ref="title"
          v-model="matter.title"
          type="text"
          data-test="matter-input-title"
          :aria-activedescendant="isFocusTitle"
          class="border rounded border-gray-300 py-2 px-3 w-full text-indigo-600 text-sm font-semibold font-sans tracking-wide hover:border-kanban-lightgreen focus:border-gray-500 focus:outline-none mr-4 leading-3"
          :class="{
            'focus:border-red-700': formError && matter.title === '',
          }"
          placeholder="Title of your matter"
          @keyup.enter="saveCard"
          @blur="isFocusTitle = false"
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
          data-test="matter-cancel"
          class="inline-flex items-center mt-2 pl-2 pr-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 light:hover:text-orange-500 dark:hover:text-orange-500 hover:border-orange-500 focus:outline-none focus:border-text-orange-500"
          @click="updateDone"
        >
          <icon-cancel class="h-5 w-5" />
          <span>Cancel</span>
        </button>
        <button
          type="button"
          data-test="matter-add"
          class="inline-flex items-center ml-2 mt-2 pl-2 pr-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 light:hover:text-kanban-lightgreen dark:hover:text-kanban-lightgreen hover:border-kanban-lightgreen focus:outline-none focus:border-light-blue-300"
          @click="saveCard"
        >
          <icon-save class="h-5 w-5" />
          <span>Save</span>
        </button>
      </div>
    </div>
    <h2
      v-else
      data-test="matter-title"
      class="border border-transparent leading-5 text-gray-700 py-2 px-3 font-semibold font-sans tracking-wide text-sm cursor-text"
      @click="editAndFocusTitleField"
    >
      {{ matter.title }}
    </h2>
    <span
      v-show="displayOptions.displayReferences"
      data-test="matter-reference"
      class="absolute text-sm text-gray-600 top-0 right-6"
    >
      #{{ matter.reference }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { MatterCard } from '~/types/matter-card'
import { Action } from '~/types/action'
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
    stageIndex: {
      type: Number,
      required: true,
    },
    matterIndex: {
      type: Number,
      default: 0,
    },
    data: {
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
    newMatter: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String as () => Action,
      default: Action.UPDATE,
    } as PropOptions<Action>,
  },
  data() {
    return {
      editing: false,
      isFocusTitle: false,
      formError: false,
      matter: {} as MatterCard,
    }
  },
  computed: {
    ...mapGetters({
      displayOptions: 'kanban/displayOptions',
    }),
    isValidFormCard(): boolean {
      return this.matter.title.trim() !== ''
    },
    borderColor(): string {
      return this.displayOptions.displayColors
        ? `border-color: ${this.matter.color}`
        : ''
    },
    isNewItem(): boolean {
      return this.action === Action.NEW
    },
  },
  mounted(): void {
    this.editing = this.isNewItem || this.newMatter
    this.matter = Object.assign({}, this.data)
    this.$nextTick(() => {
      if (this.editing) {
        this.focusTitleField()
      }
    })
  },
  methods: {
    ...mapActions({
      createMatter: 'kanban/createMatter',
      updateMatter: 'kanban/updateMatter',
    }),
    async saveCard() {
      this.formError = false

      if (this.editing && this.isValidFormCard) {
        try {
          if (this.isNewItem) {
            await this.createMatter({
              stageIndex: this.stageIndex,
              matter: this.matter,
            }).then(() => {
              this.updateDone()
              this.$toast.success('Matter created successfully')
            })
          } else {
            await this.updateMatter({
              stageIndex: this.stageIndex,
              matterIndex: this.matterIndex,
              matter: this.matter,
            }).then(() => {
              this.updateDone()
              this.$toast.success('Matter updated successfully')
            })
          }
        } catch {
          this.$toast.error(`An error occured for ${this.matter.title}...`)
        }
      } else {
        this.formError = true
      }
    },
    editAndFocusTitleField(): void {
      this.editing = true
      this.$nextTick(() => {
        this.focusTitleField()
      })
    },
    updateDone(): void {
      this.editing = false
      this.$emit('updateDone', false)
    },
    focusTitleField(): void {
      const title: any = this.$refs.title
      title.focus()
      this.isFocusTitle = true
    },
    focusFieldIfEmptyTitle(): void {
      if (this.matter.title === '') {
        this.focusTitleField()
      }
    },
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
