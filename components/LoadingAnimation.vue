<template>
  <span class="loading-animation" :class="`${variant}-variant ${size}`">
    <LogoOutline />
  </span>
</template>

<script>
  import LogoOutline from "./LogoOutline"

  export default {
    name: 'LoadingAnimation',
    components: { LogoOutline },
    props: {
      variant: {
        type: String,
        default: 'block',
        validator(value) {
          return ['block', 'inline'].includes(value)
        }
      },
      size: {
        type: String,
        default: 'medium',
        validator(value) {
          return ['small', 'medium', 'large'].includes(value)
        }
      }
    }
  }
</script>

<style
  lang="less"
  scoped
>
  .loading-animation {
    width: 3em;
    justify-content: space-around;
    color: @duskBlue;

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
    width: .75em;
    height: .75em;
    animation: pulse 1s infinite ease-in-out alternate;
  }

  @keyframes pulse {
    0% {
      transform: scale(.7);
      opacity: .4;
    }
    100% {
      transform: scale(1);
      opacity: .8;
    }
  }
</style>
