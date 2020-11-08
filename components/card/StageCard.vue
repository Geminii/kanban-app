<template>
  <div
    class="border border-light-border dark:border-dark-border rounded-lg shadow-sm divide-y divide-gray-200"
  >
    <div class="p-4">
      <h2
        data-test="stage-title"
        class="text-lg leading-6 font-semibold light:text-kanban-gray dark:text-dark-onSurfacePrimary mb-4"
      >
        {{ stage.title }}
      </h2>

      <matter-card
        v-for="matter of stage.cards"
        :key="matter.id"
        :parent-stage-index="stageIndex"
        :matter="matter"
      />

      <template v-if="addCard">
        <matter-card
          :parent-stage-index="stageIndex"
          :edit="addCard"
          @editDone="editDone"
        />
      </template>
      <template v-else>
        <button
          type="button"
          data-test="stage-add-matter"
          class="inline-flex items-center pl-2 pr-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md light:text-gray-700 dark:text-dark-onSurfacePrimary light:hover:text-kanban-lightgreen dark:hover:text-kanban-lightgreen hover:border-kanban-lightgreen focus:outline-none focus:border-light-blue-300"
          @click="addCard = true"
        >
          <icon-add class="h-5 w-5" />
          <span>Add</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { StageCard } from '~/types/stage-card'
import MatterCard from '~/components/card/MatterCard.vue'
import IconAdd from '~/components/icons/Add.vue'

export default Vue.extend({
  name: 'StageCard' as string,
  components: {
    MatterCard,
    IconAdd,
  },
  props: {
    stageIndex: {
      type: Number,
      required: true,
    },
    stage: {
      type: Object as () => StageCard,
      required: true,
    } as PropOptions<StageCard>,
  },
  data() {
    return {
      addCard: false,
    }
  },
  methods: {
    editDone(): void {
      this.addCard = false
    },
  },
})
</script>
