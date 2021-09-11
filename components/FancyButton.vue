<template>
  <component
    :is="tagName"
    class="fancy-button"
    :class="variant"
    :type="type"
    :to="to"
  >
    <slot />
  </component>
</template>

<script>
export const Variants = {
  FLAT: 'flat',
  GHOST: 'ghost',
}

export default {
  props: {
    href: {
      type: String,
      required: false,
      default: '',
    },
    to: {
      type: String,
      required: false,
      default: '',
    },
    variant: {
      type: String,
      required: false,
      default: Variants.GHOST,
      validator(variant) {
        return Object.values(Variants).includes(variant)
      },
    },
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

<style lang="scss" scoped>
.fancy-button {
  display: inline-block;
  background: $duskBlue;
  border: 1px solid $duskBlue;
  border-radius: $defaultBorderRadius;
  padding: 0.5em 0.75em;
  text-decoration: none;
  color: $backgroundColor;
  transition: background 0.2s ease-out;
  font-family: $mainFont;
  cursor: pointer;
  font-size: 0.9375em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;

  @media (min-width: 50rem) {
    font-size: 0.8125em;
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
