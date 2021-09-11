<template>
  <article>
    <h1>{{ event.title }}</h1>
    <div v-html="event.description"></div>
  </article>
</template>

<script>
export default {
  data(params) {
    return { id: params.id }
  },
  async fetch({ params, store }) {
    store.dispatch('clearError')
    await store.dispatch('repeated-events/fetchById', params.id)
  },
  computed: {
    event() {
      return this.$store.getters['repeated-events/getById'](
        this.$route.params.id
      )
    },
  },
}
</script>
