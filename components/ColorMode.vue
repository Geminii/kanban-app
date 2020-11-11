<template>
  <button
    aria-label="Color Mode"
    class="rounded-md hover:text-kanban-lightgreen focus:outline-none"
    :class="$colorMode.value === 'dark' ? 'text-white' : 'text-kanban-gray'"
    @click="
      $colorMode.value === 'dark'
        ? ($colorMode.value = 'light')
        : ($colorMode.value = 'dark')
    "
  >
    <icon-sun v-if="$colorMode.value === 'light'" />
    <icon-moon v-else />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
import IconSun from '~/components/icons/Sun.vue'
import IconMoon from '~/components/icons/Moon.vue'

export default Vue.extend({
  name: 'ColorMode' as string,
  components: {
    IconSun,
    IconMoon,
  },
})
</script>
