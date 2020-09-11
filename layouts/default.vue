<template>
  <div class="page-wrapper">
    <MainNavigation />
    <main class="content">
      <div
        class="error-message"
        v-if="hasError"
      >
        <h2>Ups!</h2>
        <p>{{error.message}}</p>
        <p
          v-if="error.source || error.statusCode"
          class="error-source"
        >{{error.source}}
          <ArrowRightIcon v-if="error.source && error.statusCode" />
          {{error.statusCode}}
        </p>
        <p>
          <FancyButton @click="clearErrorMessage">
            Luk
          </FancyButton>
        </p>
      </div>
      <nuxt />
    </main>
    <SiteFooter />
  </div>
</template>

<script>
  import {ArrowRightIcon} from 'vue-feather-icons'
  import FancyButton, {Variants} from "../components/FancyButton"
  import MainNavigation from '~/components/MainNavigation'
  import SiteFooter from "../components/SiteFooter"

  export default {
    components: {
      ArrowRightIcon,
      FancyButton,
      MainNavigation,
      SiteFooter
    },
    data() {
      return { Variants }
    },
    computed: {
      hasError() {
        return this.error.message || this.error.statusCode
      },
      error() {
        return this.$store.getters['getError']()
      }
    },
    methods: {
      clearErrorMessage() {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .page-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
  }

  .content {
    width: 100%;
    max-width: $maxContentWidth;
    margin: auto;
    padding: 1.3em 1.25em;
    flex-grow: 1;

    /deep/ p, /deep/ ul, /deep/ ol {
      line-height: 1.4em;
    }

    @media (min-width: $largeDisplay) {
      max-width: $maxContentWidthLargeDisplay;
    }

    @supports (padding: env(safe-area-inset-bottom)) {
      padding-left: unquote('max(env(safe-area-inset-left), 1.25em)');
      padding-right: unquote('max(env(safe-area-inset-right), 1.25em)');
    }
  }

  .error-message {
    position: relative;
    padding: 1em 2em;
    background: $fallRed;
    color: white;
    border-radius: $largeBorderRadius;
    box-shadow: $defaultBoxShadow;
    margin: .5em 0 1.5em;

    > h2:first-child {
      margin-top: .5em;
      color: inherit;
    }

    .error-source {
      font-size: .75em;
      opacity: .75;
    }

    .fancy-button {
      color: white;
    }
  }
</style>
