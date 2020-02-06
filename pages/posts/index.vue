<template>
  <article>
    <h1>Opslag</h1>
    <ContentList :items="posts">
      <template #default="{item: post}">
        <h2>
          <nuxt-link :to="'/posts/' + post._id">
            {{post.title}}
          </nuxt-link>
        </h2>
        <p v-if="post.intro">{{post.intro}}</p>
        <div
          v-else
          v-html="post.content"
        ></div>
        <p v-if="post.intro && post.content">
          <FancyButton :to="`/posts/${post._id}`">Læs mere
            <ChevronRightIcon />
          </FancyButton>
        </p>
      </template>
    </ContentList>
  </article>
</template>

<script>
  import {ChevronRightIcon} from 'vue-feather-icons'
  import ContentList from "../../components/ContentList"
  import FancyButton from "../../components/FancyButton"

  export default {
    name: 'posts.index',
    components: { ChevronRightIcon, ContentList, FancyButton },
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
