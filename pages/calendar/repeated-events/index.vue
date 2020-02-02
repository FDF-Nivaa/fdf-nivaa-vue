<template>
  <article>
    <ContentList :items="repeatedEvents">
      <template #default="{item}">
        <h2>
          <nuxt-link :to="'/calendar/repeated-events/' + item._id">
            {{item.title}}
          </nuxt-link>
        </h2>
        <div v-html="item.description"></div>
        <p>
          <FancyButton :to="'/calendar/repeated-events/' + item._id">
            Læs mere om {{item.title}}
            <ChevronRightIcon />
          </FancyButton>

        </p>
      </template>
    </ContentList>
  </article>
</template>

<script>
  import {ChevronRightIcon} from 'vue-feather-icons'
  import ContentList from '../../../components/ContentList'
  import FancyButton from "../../../components/FancyButton"

  export default {
    components: { ChevronRightIcon, ContentList, FancyButton },
    computed: {
      repeatedEvents() {
        return this.$store.state['repeated-events'].list
      }
    },
    async fetch({ store }) {
      store.dispatch('clearError')
      await store.dispatch('repeated-events/fetchAll')
    },
  }
</script>

<style
  lang="scss"
  scoped
>

</style>
