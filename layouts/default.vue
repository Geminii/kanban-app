<template>
  <div>
    <Header />
    <main class="lg:block relative pt-16 lg:pt-24">
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
