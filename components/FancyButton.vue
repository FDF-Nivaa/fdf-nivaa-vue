<template>
  <component
    class="fancy-button"
    :class="variant"
    :is="tagName"
    :type="type"
    :to="to"
  >
    <slot />
  </component>
</template>

<script>
  export const Variants = {
    FLAT: 'flat',
    GHOST: 'ghost'
  }
  export default {
    props: {
      href: {
        type: String,
        required: false
      },
      to: {
        type: String,
        required: false
      },
      variant: {
        type: String,
        required: false,
        default: Variants.GHOST,
        validator(variant) {
          return Object.values(Variants).includes(variant)
        }
      }
    },
    computed: {
      isLink() {
        return !!(this.href || this.to)
      },
      tagName() {
        if (this.to) {
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

<style
  lang="scss"
  scoped
>
  .fancy-button {
    display: inline-block;
    background: $duskBlue;
    border: 1px solid $duskBlue;
    border-radius: $defaultBorderRadius;
    padding: .5em .75em;
    text-decoration: none;
    color: $backgroundColor;
    transition: background .2s ease-out;
    font-family: $mainFont;
    cursor: pointer;
    font-size: .9375em;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;

    @media (min-width: 50rem) {
      font-size: .8125em;
    }

    &.ghost {
      background: transparent;
      color: $duskBlue;
      border-color: currentColor;

      @media (hover: hover) {
        &:hover {
          background: mix(transparent, $duskBlue, 90%);
        }
      }
    }

    &.flat {
      box-shadow: $defaultBoxShadow;

      @media (hover: hover) {
        &:hover {
          background: mix(transparent, $duskBlue, 10%);
        }
      }
    }

    > svg.feather {
      height: 1em;
    }
  }
</style>
