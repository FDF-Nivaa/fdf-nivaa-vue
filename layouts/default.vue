<template>
  <div class="page-wrapper">
    <MainNavigation />
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
  import MainNavigation from '~/components/MainNavigation'

  export default {
    components: {
      MainNavigation
    }
  }
</script>

<style>
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
</style>
