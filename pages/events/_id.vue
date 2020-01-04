<template>
  <article>
    <h1>{{event.title}}</h1>
    <div v-html="event.description"></div>
  </article>
</template>

<script>
  export default {
    data(params) {
      return { id: params.id }
    },
    computed: {
      event() {
        return this.$store.getters['events/getById'](this.$route.params.id)
      }
    },
    async fetch({ params, store }) {
      store.dispatch('clearError')
      await store.dispatch('events/fetchById', params.id)
    },
  }
</script>
