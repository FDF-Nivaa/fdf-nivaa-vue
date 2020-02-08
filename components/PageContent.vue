<template>
  <article class="page-content">
    <template v-if="pageContent">
      <h1>{{pageContent.title}}</h1>
      <div v-html="pageContent.content" />
    </template>
    <slot />
  </article>
</template>

<script>
  export default {
    name: 'PageContent',
    props: {
      contentId: {
        type: String,
        required: true
      }
    },
    computed:{
      pageContent() {
        return this.$store.getters['pages/getByCustomId'](this.contentId)
      }
    },
    mounted() {
      if (!this.pageContent) {
        this.$store.dispatch('pages/fetchByCustomId', this.contentId)
      }
    },
  }
</script>
