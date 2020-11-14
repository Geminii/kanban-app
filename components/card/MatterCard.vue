<template>
  <div
    data-test="matter-card"
    class="border rounded border-t-4 relative pl-2 py-4 mb-4 bg-white"
    :class="isNewItem ? 'pr-2' : 'cursor-move pr-8'"
    :style="borderColor"
  >
    <div v-if="editing">
      <div v-if="confirmDelete" class="flex justify-center items-center">
        <button
          type="button"
          data-test="matter-no-confirmation"
          class="inline-flex items-center mt-2 pl-2 pr-4 py-2 border bg-red-100 hover:bg-red-200 text-sm leading-5 font-medium rounded-md text-red-500 hover:shadow-md focus:outline-none"
          @click="confirmDelete = false"
        >
          <icon-cancel class="h-5 w-5" />
          <span>No</span>
        </button>
        <button
          type="button"
          data-test="matter-confirmation"
          class="inline-flex items-center ml-6 mt-2 pl-2 pr-4 py-2 border text-kanban-lightgreen text-sm leading-5 font-medium rounded-md bg-green-100 hover:bg-green-200 hover:shadow-md focus:outline-none"
          @click="deleteCard"
        >
          <icon-save class="h-5 w-5" />
          <span>Yes</span>
        </button>
      </div>
      <div v-else>
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
          <button
            type="button"
            class="focus:outline-none"
            data-test="matter-colorpicker"
            @click="disabledDraggable(true)"
          >
            <verte
              v-model="matter.color"
              menu-position="center"
              picker="square"
              model="hex"
              @close="disabledDraggable(false)"
            ></verte>
          </button>
        </div>
        <div class="flex flex-wrap items-center">
          <button
            v-if="action === 'UPDATE'"
            type="button"
            data-test="matter-delete"
            class="inline-flex items-center mt-2 pl-2 pr-4 py-2 border bg-red-100 hover:bg-red-200 text-sm leading-5 font-medium rounded-md text-red-500 hover:shadow-md focus:outline-none"
            @click="confirmDelete = true"
          >
            <icon-delete class="h-5 w-5" />
            <span>Delete</span>
          </button>
          <button
            type="button"
            data-test="matter-cancel"
            class="inline-flex items-center ml-2 mt-2 pl-2 pr-4 py-2 border bg-orange-100 hover:bg-orange-200 text-sm leading-5 font-medium rounded-md text-orange-500 hover:shadow-md focus:outline-none"
            @click="cancelCard"
          >
            <icon-cancel class="h-5 w-5" />
            <span>Cancel</span>
          </button>
          <button
            type="button"
            data-test="matter-add"
            class="inline-flex items-center ml-2 mt-2 pl-2 pr-4 py-2 border text-kanban-lightgreen text-sm leading-5 font-medium rounded-md bg-green-100 hover:bg-green-200 hover:shadow-md focus:outline-none"
            @click="saveCard"
          >
            <icon-save class="h-5 w-5" />
            <span>Save</span>
          </button>
        </div>
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
      v-show="displayOptions.displayReferences && action === 'UPDATE'"
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
import IconDelete from '~/components/icons/Delete.vue'
import IconCancel from '~/components/icons/Cancel.vue'
import IconSave from '~/components/icons/Save.vue'
import { generateHexColor } from '~/utils/generator'

export default Vue.extend({
  name: 'MatterCard' as string,
  components: {
    IconDelete,
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
      confirmDelete: false,
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
  watch: {
    data() {
      this.matter = Object.assign({}, this.data)
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
      deleteMatter: 'kanban/deleteMatter',
      isDraggable: 'kanban/updateDraggable',
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
    async deleteCard() {
      await this.deleteMatter({
        stageIndex: this.stageIndex,
        matterIndex: this.matterIndex,
      })
        .then(() => {
          this.$toast.success('Matter deleted successfully')
        })
        .catch(() => {
          this.$toast.error(
            `An error occured when deleting ${this.matter.title}...`
          )
        })
    },
    editAndFocusTitleField(): void {
      this.editing = true
      this.$nextTick(() => {
        this.focusTitleField()
      })
    },
    cancelCard(): void {
      this.matter = Object.assign({}, this.data)
      this.updateDone()
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
    disabledDraggable(disabled: boolean) {
      this.$emit('disabledDraggable', disabled)
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
