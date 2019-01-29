<template>
  <article>
    <h1>{{event.title}}</h1>
    <div v-html="event.description"></div>
  </article>
</template>

<script>
  import {cockpit as cockpitConfig} from '~/cockpit-config'

  export default {
    asyncData({ app, params, error }) {
      return app.$axios
        .post(
          `${cockpitConfig.url}/api/collections/get/repeatedEvents?token=${cockpitConfig.token}`,
          {
            filter: { _id: params.id }
          }
        )
        .then(response => {
          return { event: response.data.entries[0] }
        }).catch(() => {
          error({
            statusCode: 404,
            message: 'Arrangementet blev ikke fundet'
          })
        })
    }
  }
</script>