<template>
  <img
    class="cockpit-image"
    :class="`format-${format}`"
    :src="fullSource"
    :alt="alt"
  >
</template>

<script>
  import config from '~/site.config'

  export const CockpitImageFormat = {
    DEFAULT: 'default',
    ROUND: 'round'
  }

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
      },
      format: {
        type: String,
        required: false,
        default: CockpitImageFormat.DEFAULT,
        validator(format) {
          return Object.values(CockpitImageFormat).includes(format)
        }
      }
    },
    computed: {
      fullSource() {
        return config.cockpitUrl + this.src
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .cockpit-image {
    border-radius: $largeBorderRadius;
    box-shadow: $defaultBoxShadow;
  }
  .format-round {
    border-radius: 100%;
  }
</style>
