<template>
  <header
    class="fixed top-0 left-0 right-0 z-30 bg-light-elevatedSurface dark:bg-dark-elevatedSurface border-b border-light-border dark:border-dark-border h-16 lg:h-24"
  >
    <div
      class="flex relative mx-auto px-4 sm:px-8 justify-between items-center lg:py-6 h-full"
    >
      <nuxt-link class="flex items-center" to="/">
        <icon-brand
          class="h-12 text-light-onSurfacePrimary dark:text-dark-onSurfacePrimary transition-colors ease-linear"
        />
        <h1
          class="font-medium light:text-kanban-gray dark:text-white text-2xl ml-4"
        >
          Kanban Application
        </h1>
      </nuxt-link>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import IconBrand from '~/components/icons/brand.vue'

export default Vue.extend({
  name: 'Header' as string,
  components: {
    IconBrand,
  },
})
</script>
