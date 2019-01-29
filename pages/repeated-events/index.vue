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
  import {cockpit as cockpitConfig} from '~/cockpit-config'

  export default {
    asyncData({ app, error }) {
      return app.$axios
        .get(`${cockpitConfig.url}/api/collections/get/repeatedEvents?token=${cockpitConfig.token}`)
        .then(response => {
          return {
            repeatedEvents: response.data.entries
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