<template>
  <img
    :src="fullSource"
    :alt="alt"
  >
</template>

<script>
  import {cockpit as cockpitConfig} from '~/cockpit-config'
  export default {
    name: 'CockpitImage',
    props: {
      src: {
        type: String,
        required: true
      },
      alt: {
        type: String,
        default: ''
      }
    },
    computed: {
      fullSource() {
        return cockpitConfig.url + this.src
      }
    }
  }
</script>
