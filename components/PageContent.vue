<template>
  <article class="page-content">
    <template v-if="pageContent">
      <h1>{{pageContent.title}}</h1>
      <div class="page-content-wrapper">
        <figure
          v-if="pageContent.picture.path"
          class="page-content-picture-wrapper landscape"
        >
          <CockpitImage
            :src="pageContent.picture.path"
            sizes="(min-width: 25rem) 25rem, 100vw"
            class="page-content-picture"
          />
        </figure>
        <div
          class="page-content-inner"
          v-html="pageContent.content"
        />
      </div>
    </template>
    <slot />
  </article>
</template>

<script>
  import CockpitImage from "./CockpitImage"

  export default {
    name: 'PageContent',
    components: { CockpitImage },
    props: {
      contentId: {
        type: String,
        required: true
      }
    },
    computed: {
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

<style
  lang="scss"
  scoped
>
  .page-content-wrapper {
    display: flex;
    flex-direction: row-reverse;
  }

  .page-content-inner {
    flex-basis: 20em;
    flex-grow: 1;

    p, li {
      &:not(.full-width) {
        max-width: 50em;
      }
    }
  }

  .page-content-picture-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex-basis: 25em;
    margin: 0 0 0 2em;
  }

  .page-content-picture {
    height: auto;
    width: 100%;
  }

  @media (max-width: 50em) {
    .page-content-wrapper {
      flex-direction: column;
    }
    .page-content-inner {
      flex-basis: 0;
    }
    .page-content-picture-wrapper {
      margin: 0 auto .5em;
      width: 25rem;
      max-width: 100vw;
      flex-basis: auto;
    }
  }

  @media (max-width: 27.5rem) {
    .page-content-picture-wrapper {
      width: 100vw;
      margin: 0 -1.25rem .5em;

      .page-content-picture {
        border-radius: 0;
      }
    }
  }
</style>
