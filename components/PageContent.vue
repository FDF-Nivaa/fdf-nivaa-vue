<template>
  <article class="page-content">
    <template v-if="pageContent">
      <h1>{{ pageContent.title }}</h1>
      <p v-if="pageContent.intro" class="page-intro">{{ pageContent.intro }}</p>
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
        <div class="page-content-inner" v-html="pageContent.content" />
      </div>
    </template>
    <slot />
  </article>
</template>

<script>
import CockpitImage from './CockpitImage'

export default {
  name: 'PageContent',
  components: { CockpitImage },
  props: {
    contentId: {
      type: String,
      required: true,
    },
    useCustomId: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    pageContent() {
      const getter = this.useCustomId ? 'getByCustomId' : 'getById'

      return this.$store.getters[`pages/${getter}`](this.contentId)
    },
  },
  mounted() {
    if (!this.pageContent) {
      const action = this.useCustomId ? 'fetchByCustomId' : 'fetchById'

      this.$store.dispatch(`pages/${action}`, this.contentId)
    }
  },
}
</script>

<style lang="scss" scoped>
.page-content {
  max-width: 50em;
  margin: auto;
}

.page-intro {
  margin: 1em 0;
  font-weight: 500;
  font-size: 1.2em;
}

.page-content-wrapper {
  display: flex;
  flex-direction: row-reverse;
}

.page-content-inner {
  flex-basis: 20em;
  flex-grow: 1;

  ::v-deep {
    p,
    li {
      &:not(.full-width) {
        max-width: 40em;
      }
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
    margin: 0 auto 0.5em;
    width: 25rem;
    max-width: 100vw;
    flex-basis: auto;
  }
}

@media (max-width: 27.5rem) {
  .page-content-picture-wrapper {
    width: 100vw;
    margin: 0 -1.25rem 0.5em;

    .page-content-picture {
      border-radius: 0;
    }
  }
}
</style>
