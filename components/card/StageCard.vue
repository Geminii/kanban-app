<template>
  <div class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded">
    <div class="flex justify-between mb-4">
      <h2
        data-test="stage-title"
        class="text-gray-700 font-semibold font-sans tracking-wide text-lg"
      >
        {{ stage.title }}
      </h2>
      <span
        class="rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium leading-4 bg-blue-200 text-teal-800"
      >
        {{ matters.length }}
      </span>
    </div>

    <!-- Draggable component -->
    <draggable
      v-model="matters"
      :animation="150"
      ghost-class="ghost-card"
      group="cards"
      :class="!isNewMatter ? 'min-h-75 mb-4' : ''"
      data-test="stage-draggable"
      :disabled="disabledDraggable"
    >
      <!-- Each matter from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
      <matter-card
        v-for="(matter, matterIndex) in matters"
        :key="matter.id"
        :stage-index="stageIndex"
        :matter-index="matterIndex"
        :data="matter"
        @disabledDraggable="disabledDraggableDone"
      />
    </draggable>

    <template v-if="isNewMatter">
      <matter-card
        :stage-index="stageIndex"
        :new-matter="true"
        :action="action"
        @disabledDraggable="disabledDraggableDone"
        @updateDone="updateDone"
      />
    </template>
    <template v-else>
      <button
        type="button"
        data-test="stage-add-matter"
        class="inline-flex items-center pl-2 pr-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-kanban-lightgreen dark:hover:text-kanban-lightgreen hover:border-kanban-lightgreen focus:outline-none focus:border-kanban-lightgreen"
        @click="isNewMatter = true"
      >
        <icon-add class="h-5 w-5" />
        <span>Add</span>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MatterCardComponent from '~/components/card/MatterCard.vue'
import IconAdd from '~/components/icons/Add.vue'
import { MatterCard } from '~/types/matter-card'
import { Action } from '~/types/action'

export default Vue.extend({
  name: 'StageCard' as string,
  components: {
    MatterCard: MatterCardComponent,
    IconAdd,
  },
  props: {
    stage: {
      type: Object,
      required: true,
    },
    stageIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isNewMatter: false,
      action: Action.NEW,
      disabledDraggable: false,
    }
  },
  computed: {
    matters: {
      get(): Array<MatterCard> {
        return this.$store.state.kanban.stages[this.stageIndex].cards
      },
      set(value: String) {
        this.$store.commit(
          'kanban/UPDATE_STAGE_MATTERS',
          { stageIndex: this.stageIndex, matters: value },
          { root: true }
        )
      },
    },
  },
  methods: {
    updateDone(isNewMatter: boolean): void {
      this.isNewMatter = isNewMatter
    },
    disabledDraggableDone(disabledDraggable: boolean): void {
      this.disabledDraggable = disabledDraggable
    },
  },
})
</script>

<style scoped>
.ghost-card {
  @apply opacity-25 bg-gray-300;
}
</style>
