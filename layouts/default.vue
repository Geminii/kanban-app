<template>
  <div>
    <Header />
    <main class="lg:block relative py-16 lg:pt-24 overflow-auto h-auto">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '~/components/common/Header.vue'
import Footer from '~/components/common/Footer.vue'

export default Vue.extend({
  components: {
    Header,
    Footer,
  },
})
</script>

<style scoped>
main {
  min-height: calc(100vh - 137px);
}
</style>
