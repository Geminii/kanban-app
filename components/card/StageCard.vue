<template>
  <div class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded">
    <h2
      data-test="stage-title"
      class="text-gray-700 font-semibold font-sans tracking-wide text-lg mb-4"
    >
      {{ stage.title }}
    </h2>

    <!-- Draggable component -->
    <draggable
      v-model="matters"
      :animation="150"
      ghost-class="ghost-card"
      group="cards"
    >
      <!-- Each matter from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
      <matter-card
        v-for="matter in matters"
        :key="matter.id"
        :stage-index="stageIndex"
        :matter="matter"
      />
    </draggable>

    <template v-if="addMatterCard">
      <matter-card
        :stage-index="stageIndex"
        :edit="addMatterCard"
        @editDone="editDone"
      />
    </template>
    <template v-else>
      <button
        type="button"
        data-test="stage-add-matter"
        class="inline-flex items-center pl-2 pr-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 light:hover:text-kanban-lightgreen dark:hover:text-kanban-lightgreen hover:border-kanban-lightgreen focus:outline-none focus:border-light-blue-300"
        @click="addMatterCard = true"
      >
        <icon-add class="h-5 w-5" />
        <span>Add</span>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MatterCard from '~/components/card/MatterCard.vue'
import IconAdd from '~/components/icons/Add.vue'

export default Vue.extend({
  name: 'StageCard' as string,
  components: {
    MatterCard,
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
      addMatterCard: false,
    }
  },
  computed: {
    matters: {
      get() {
        return this.$store.state.kanban.stages[this.stageIndex].cards
      },
      set(value) {
        this.$store.commit(
          'kanban/UPDATE_MATTER',
          { stageIndex: this.stageIndex, matters: value },
          { root: true }
        )
      },
    },
  },
  methods: {
    editDone(): void {
      this.addMatterCard = false
    },
  },
})
</script>

<style scoped>
.ghost-card {
  @apply opacity-25 bg-gray-300;
}
</style>
