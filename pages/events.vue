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
  import {cockpit as cockpitConfig} from '~/cockpit-config'

  export default {
    data() {
      return {
        events: []
      }
    },
    asyncData({ app }) {
      return app.$axios
        .get(`${cockpitConfig.url}/api/collections/get/events?token=${cockpitConfig.token}`)
        .then(response => {
          return {
            events: response.data.entries || []
          }
        }).catch(() => {
          error({
            statusCode: 404,
            message: 'Ingen arrangementer fundet'
          })
        })
    }
  }
</script>