<template>
  <span class="loading-animation" :class="`${variant}-variant ${size}`">
    <LogoOutline class="dot dot1" />
    <LogoOutline class="dot dot2" />
    <LogoOutline class="dot dot3" />
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

  .dot {
    display: block;
    width: .75em;
    height: .75em;
    animation: animation 1.4s infinite ease-in-out both;
  }

  .dot1 {
    animation-delay: -0.32s;
  }

  .dot2 {
    animation-delay: -0.16s;
  }

  @keyframes animation {
    0%, 80%, 100% {
      transform: scale(.7);
      opacity: 0;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
