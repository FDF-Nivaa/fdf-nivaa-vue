<template>
  <article>
    <ul>
      <li v-for="event in repeatedEvents">
        <h3>
          <nuxt-link :to="'/calendar/repeated-events/' + event._id">
            {{event.title}}
          </nuxt-link>
        </h3>
        <div v-html="event.description"></div>
      </li>
    </ul>
  </article>
</template>

<script>
  export default {
    computed: {
      repeatedEvents() {
        return this.$store.state['repeated-events'].list
      }
    },
    async fetch({ store }) {
      store.dispatch('clearError')
      await store.dispatch('repeated-events/fetchAll')
    },
  }
</script>
