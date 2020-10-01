<template>
  <LoadingAnimation v-if="!pageId" />
  <PageContent v-else :content-id="pageId" :use-custom-id="false" />
</template>

<script>
  import PageContent from "../../components/PageContent"
  import LoadingAnimation from "../../components/LoadingAnimation"

  export default {
    components: { LoadingAnimation, PageContent },
    computed: {
      menuItem() {
        return this.$store.getters['menu-items/getBySlug'](this.$route.params.slug)
      },
      pageId() {
        return this.menuItem?.page._id
      }
    }
  }
</script>
