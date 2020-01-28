<template>
  <component class="fancy-button" :is="tagName" :type="type" :to="linkTo">
    <slot/>
  </component>
</template>

<script>
  export default {
    props: {
      href: {
        type: String,
        required: false
      },
      linkTo: {
        type: String,
        required: false
      }
    },
    computed: {
      isLink() {
        return !!(this.href || this.linkTo)
      },
      tagName() {
        if (this.linkTo) {
          return 'nuxt-link'
        }
        if (this.href) {
          return 'a'
        }

        return 'button'
      },
      type() {
        return this.isLink ? null : 'button'
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fancy-button {
    background: $duskBlue;
    border-radius: $defaultBorderRadius;
    padding: .5em .75em;
    text-decoration: none;
    color: $backgroundColor;
    box-shadow: $defaultBoxShadow;
    transition: background .2s ease-out;

    @media (hover: hover) {
      &:hover {
        background: mix($backgroundColor, $duskBlue, 10%);
      }
    }
  }
</style>
