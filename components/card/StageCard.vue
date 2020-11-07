<template>
  <div
    class="border border-gray-300 rounded-lg shadow-sm divide-y divide-gray-200"
  >
    <div class="p-4">
      <h2
        data-test="stage-title"
        class="text-lg leading-6 font-semibold text-kanban-gray mb-4"
      >
        {{ stage.title }}
      </h2>

      <!-- MattersCard elements -->

      <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-kanban-lightgreen hover:border-kanban-lightgreen focus:outline-none focus:border-light-blue-300 focus:shadow-outline-blue transition duration-150 ease-in-out"
      >
        <icon-add class="h-5 w-5" />
        <span>Add</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { StageCard } from '~/types/stage-card'
import IconAdd from '~/components/icons/Add.vue'

export default Vue.extend({
  name: 'StageCard' as string,
  components: {
    IconAdd,
  },
  props: {
    stage: {
      type: Object as () => StageCard,
      required: true,
    } as PropOptions<StageCard>,
  },
})
</script>
