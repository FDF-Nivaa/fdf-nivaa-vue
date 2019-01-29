<template>
  <article>
    <ul>
      <li v-for="event in repeatedEvents">
        <h3>
          <nuxt-link :to="'/repeated-events/' + event._id">
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
        return this.$store.state.repeatedEvents
      }
    },
    mounted() {
      this.$store.dispatch('clearError')
    },
    fetch({ store }) {
      store.dispatch('fetchRepeatedEvents')
    },
  }
</script>