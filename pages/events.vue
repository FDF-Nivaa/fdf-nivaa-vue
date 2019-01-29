<template>
  <article>
    <ul>
      <li v-for="event in events">
        <h3>{{event.title}}</h3>
        <div v-html="event.description"></div>
        <p>
          <nuxt-link :to="'/repeated-events/' + event.repeatedEvent._id">
            Læs mere om {{event.repeatedEvent.display}}
          </nuxt-link>
        </p>
      </li>
    </ul>
  </article>
</template>

<script>
  export default {
    computed: {
      events() {
        return this.$store.state.events
      }
    },
    mounted() {
      this.$store.dispatch('clearError')
    },
    fetch({ store }) {
      store.dispatch('fetchEvents')
    },
  }
</script>