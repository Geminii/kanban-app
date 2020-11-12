<template>
  <div class="container px-4 sm:px-8 m-auto">
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6"
    >
      <div class="mb-4 sm:mb-0">
        <p class="font-extrabold text-xl text-purple-700">Matters Pipeline</p>
        <button
          class="inline text-white rounded-full bg-indigo-500 uppercase px-2 text-xs font-bold focus:outline-none"
          @click="resetKanban"
        >
          Reset
        </button>
      </div>

      <div class="flex justify-end">
        <options-dropdown />
      </div>
    </div>
    <div
      class="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3"
    >
      <stage-card
        v-for="(stage, indexStage) of kanban.stages"
        :key="stage.id"
        :stage="stage"
        :stage-index="parseInt(indexStage)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import StageCard from '~/components/card/StageCard.vue'
import OptionsDropdown from '~/components/dropdown/OptionsDropdown.vue'

export default Vue.extend({
  components: {
    StageCard,
    OptionsDropdown,
  },
  computed: {
    ...mapState(['kanban']),
  },
  methods: {
    ...mapActions({
      resetKanban: 'kanban/resetKanban',
    }),
  },
})
</script>
