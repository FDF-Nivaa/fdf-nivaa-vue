<template>
  <article>
    <ul>
      <li v-for="event in repeatedEvents">
        <h3>{{event.title}}</h3>
        <div v-html="event.description"></div>
      </li>
    </ul>
  </article>
</template>

<script>
  import axios from 'axios'
  import {cockpit as cockpitConfig} from '~/cockpit-config'

  export default {
    data() {
      return {
        repeatedEvents: []
      }
    },
    asyncData() {
      return axios
        .get(`${cockpitConfig.url}/api/collections/get/repeatedEvents?token=${cockpitConfig.token}`)
        .then(response => {
          return {
            repeatedEvents: response.data.entries || []
          }
        })
    }
  }
</script>