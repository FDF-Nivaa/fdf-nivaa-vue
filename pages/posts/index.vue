<template>
  <article>
    <h1>Opslag</h1>
    <ul>
      <li v-for="post in posts">
        <h3>
          <nuxt-link :to="'/posts/' + post._id">
            {{post.title}}
          </nuxt-link>
        </h3>
        <p v-if="post.intro">{{post.intro}}</p>
        <div v-else v-html="post.content"></div>
        <p v-if="post.intro && post.content"><nuxt-link :to="`/posts/${post._id}`">Læs mere</nuxt-link></p>
      </li>
    </ul>
  </article>
</template>

<script>
  export default {
    name: 'posts.index',
    computed: {
      posts() {
        return this.$store.state.posts.list
      }
    },
    async fetch({ store }) {
      store.dispatch('clearError')
      await store.dispatch('posts/fetchAll')
    },
  }
</script>
