<template>
  <div
    class="border rounded border-t-4 relative pl-2 pr-8 py-4 mb-4"
    :style="`border-color: ${matter.color}`"
    v-click-outside="saveCard"
  >
    <template v-if="edit">
      <input
        ref="title"
        v-model="matter.title"
        type="text"
        data-test="matter-input-title"
        class="border rounded border-gray-300 py-2 px-3 w-full transition duration-150 ease-in-out text-indigo-600 font-medium focus:border-gray-500 focus:outline-none"
        placeholder="Title of your matter"
        @keyup.enter="saveCard"
      />
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

export default Vue.extend({
  name: 'MatterCard' as string,
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
          color: '#000000',
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
      const title: any = this.$refs.title
      title.focus()
    }
  },
  methods: {
    ...mapActions({
      createMatterCard: 'kanban/createTask',
    }),
    saveCard(): void {
      if (this.edit && this.isValidFormCard) {
        this.createMatterCard({
          parentStageIndex: this.parentStageIndex,
          matter: this.matter,
        })

        // catch back-end error to display toaster message ;)
      }

      this.$emit('editDone', false)
    },
  },
})
</script>
