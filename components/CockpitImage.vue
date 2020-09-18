<template>
  <img
    class="cockpit-image"
    :class="`format-${format}`"
    :src="fullSource"
    :srcset="sourceSet"
    :sizes="sizes"
    :alt="alt"
  />
</template>

<script>
  import config from '~/site.config'
  import queryString from "query-string"

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
      sizes: {
        type: String,
        default: '50vw'
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
    data() {
      return {
        widths: [100, 200, 360, 600, 800, 1024]
      }
    },
    computed: {
      fullSource() {
        return config.cockpitUrl + this.src
      },
      sourceSet() {
        const sourceSet = this.widths.map(size => this.createSourceUrl(size))

        sourceSet.push(this.fullSource)

        return sourceSet.join(', ')
      },
    },
    methods: {
      createSourceUrl(width) {
        const params = {
          token: process.env.cockpitToken,
          src: this.src,
          o: 1,
          q: 56
        }

        if (width) {
          params.w = width
          params.m ='fitToWidth'
        }

        return `${config.cockpitUrl}/api/cockpit/image?${queryString.stringify(params)} ${width}w`
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
