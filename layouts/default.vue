<template>
  <div class="page-wrapper">
    <MainNavigation />
    <main>
      <div
        class="error-message"
        v-if="hasError"
      >
        <h2 v-if="error.statusCode">Fejl {{error.statusCode}}</h2>
        <p>{{error.message}}</p>
        <p>
          <button type="button" @click="clearErrorMessage">Luk</button>
        </p>
      </div>
      <nuxt />
    </main>
  </div>
</template>

<script>
  import MainNavigation from '~/components/MainNavigation'

  export default {
    components: {
      MainNavigation
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

<style lang="less">
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  body {
    background: #c8d5e7;
    font-family: Ubuntu, verdana, sans-serif;
  }

  .error-message {
    padding: 1.5em;
    background: rgba(190, 0, 0, 0.35);
    margin: .5em 0 1.5em;
  }
</style>
