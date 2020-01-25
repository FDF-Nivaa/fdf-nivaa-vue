<template>
  <article>
    <h1>Mød lederne</h1>
    <ul>
      <li v-for="person in staff">
        <h3>
          <nuxt-link :to="'/staff/' + person._id">
            {{person.name}}
          </nuxt-link>
        </h3>
        <div v-html="person.description"></div>
      </li>
    </ul>
  </article>
</template>

<script>
  export default {
    computed: {
      staff() {
        return this.$store.state['staff'].list
      }
    },
    async fetch({ store }) {
      store.dispatch('clearError')
      await store.dispatch('staff/fetchAll')
    },
  }
</script>
