<template>
  <article>
    <ul>
      <li v-for="event in events">
        <h3>
          <nuxt-link :to="'/events/' + event._id">
            {{event.title}}
          </nuxt-link>
        </h3>
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
        return this.$store.state.events.list
      }
    },
    async fetch({ store }) {
      store.dispatch('clearError')
      await store.dispatch('events/fetchAll')
    },
  }
</script>
