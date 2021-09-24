<template>
  <article class="error-page">
    <h1 class="page-heading">
      <span class="error-code">
        {{ error.statusCode }}
      </span>
      <span class="heading-divider">—</span>
      <span class="heading">{{ heading }}</span>
    </h1>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <img
      src="/images/error.png"
      srcset="/images/error@2x.png 2x"
      alt="Sille græder"
      class="error-illustration"
    />
  </article>
</template>

<script>
export default {
  props: {
    error: { type: Object, required: true },
  },
  data() {
    if (this.error.statusCode === 404) {
      return {
        heading: 'Siden blev ikke fundet',
        errorMessage: '',
      }
    } else {
      return {
        heading: 'Der skete desværre en fejl',
        errorMessage: this.error.message || '',
      }
    }
  },
  head() {
    return {
      title: `${this.error.statusCode} — ${this.heading}`,
    }
  },
}
</script>

<style lang="scss" scoped>
.error-page {
  padding: 2em;
  text-align: center;
}

.page-heading {
  font-size: 1.5em;
}

.error-code {
  display: block;
  font-size: 2em;
}

.heading-divider {
  display: block;
  overflow: hidden;
  background: currentColor;
  height: 0.1em;
  width: 7em;
  margin: 1em auto 0.75em;
}

.heading {
}

.error-illustration {
  display: block;
  width: 18em;
  max-width: unquote('min(80%, 40vh)');
  margin: 3em auto 0;
  aspect-ratio: 600/708;
  //height: 118%; // Forces the height to match the correct aspect ratio to prevent layout reflow when the image is loaded
}
</style>
