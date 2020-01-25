<template>
  <article>
    <h1>{{ageGroup.title}}</h1>
    <div
      v-html="ageGroup.description"
    ></div>
  </article>
</template>

<script>
  export default {
    data(params) {
      return { id: params.id }
    },
    computed: {
      ageGroup() {
        return this.$store.getters['age-groups/getById'](this.$route.params.id)
      }
    },
    async fetch({ params, store }) {
      store.dispatch('clearError')
      await store.dispatch('age-groups/fetchById', params.id)
    },
  }
</script>
<style scoped>
</style>
