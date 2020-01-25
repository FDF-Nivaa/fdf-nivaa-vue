<template>
  <article>
    <h1>{{post.title}}</h1>
    <p
      v-if="post.intro"
      class="post-intro"
    >{{post.intro}}</p>
    <div
      v-html="post.content"
      class="post-content"
    ></div>
  </article>
</template>

<script>
  export default {
    data(params) {
      return { id: params.id }
    },
    computed: {
      post() {
        return this.$store.getters['posts/getById'](this.$route.params.id)
      }
    },
    async fetch({ params, store }) {
      store.dispatch('clearError')
      await store.dispatch('posts/fetchById', params.id)
    },
  }
</script>
<style scoped>
  .post-intro {
    margin: 1em 0;
    font-weight: 500;
    font-size: 1.2em;
  }
</style>
