<template>
  <span class="loading-animation" :class="`${variant}-variant ${size}`">
    <LogoOutline />
  </span>
</template>

<script>
import LogoOutline from './LogoOutline'

export default {
  name: 'LoadingAnimation',
  components: { LogoOutline },
  props: {
    variant: {
      type: String,
      default: 'block',
      validator(value) {
        return ['block', 'inline'].includes(value)
      },
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['small', 'medium', 'large'].includes(value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.loading-animation {
  width: 3em;
  justify-content: space-around;
  align-items: center;
  justify-items: center;
  color: $duskBlue;

  &.block-variant {
    margin: 2em auto;
    display: flex;
  }
  &.inline-variant {
    display: inline-flex;
  }

  &.small {
  }

  &.medium {
    font-size: 1.75rem;
  }

  &.large {
    font-size: 2.5rem;
  }
}

.logo-outline {
  display: block;
  width: 0.75em;
  height: 0.75em;
  animation: pulse 1s infinite ease-in-out alternate;
}

@keyframes pulse {
  0% {
    transform: scale(0.7);
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}
</style>
