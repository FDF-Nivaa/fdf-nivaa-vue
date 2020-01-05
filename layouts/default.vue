<template>
  <div class="page-wrapper">
    <MainNavigation />
    <main class="content">
      <div
        class="error-message"
        v-if="hasError"
      >
        <h2 v-if="error.statusCode">Fejl {{error.statusCode}}</h2>
        <p>{{error.message}}</p>
        <p>
          <button
            type="button"
            @click="clearErrorMessage"
          >Luk
          </button>
        </p>
      </div>
      <nuxt />
    </main>
    <SiteFooter />
  </div>
</template>

<script>
  import MainNavigation from '~/components/MainNavigation'
  import SiteFooter from "../components/SiteFooter"

  export default {
    components: {
      MainNavigation,
      SiteFooter
    },
    computed: {
      hasError() {
        return this.$store.state.error.message || this.$store.state.error.statusCode
      },
      error() {
        return this.$store.state.error
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
  lang="less"
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
    max-width: @maxContentWidth;
    margin: auto;
    padding: 1.3em 1.25em;
    flex-grow: 1;

    p, ul, ol {
      line-height: 1.4em;
    }
  }

  .page-footer {
    position: relative;
    padding: 3rem 3rem 2.5rem;

    @media (max-width: @maxContentWidth) {
      padding: 2.5rem 2rem 2rem;
    }

    @media (max-width: 30em) {
      padding: 2.5rem 1.5rem 2rem;
    }
  }

  .error-message {
    padding: 1.5em;
    background: rgba(190, 0, 0, 0.35);
    margin: .5em 0 1.5em;
  }
</style>
