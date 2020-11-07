<template>
  <footer
    class="fixed bottom-0 left-0 right-0 z-30 bg-light-elevatedSurface dark:bg-dark-elevatedSurface border-t border-light-border dark:border-dark-border px-8 py-2"
  >
    <div class="flex justify-between items-center">
      <p class="flex align-middle font-semibold text-kanban-lightgreen">
        Made with <IconHeart class="ml-1 text-red-500 w-6" />
      </p>

      <div class="flex items-center">
        <a
          href="https://github.com/Geminii/kanban-app"
          target="_blank"
          class="rounded-md hover:text-kanban-lightgreen focus:outline-none transition ease-in-out mr-2"
          :class="
            $colorMode.value === 'dark' ? 'text-white' : 'text-kanban-gray'
          "
        >
          <icon-github />
        </a>
        <color-mode />
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

import IconHeart from '~/components/icons/heart.vue'
import IconGithub from '~/components/icons/github.vue'
import ColorMode from '~/components/ColorMode.vue'

export default Vue.extend({
  components: {
    ColorMode,
    IconHeart,
    IconGithub,
  },
})
</script>
