<template>
  <ContentList :items="events">
    <template #default="{ item: event }">
      <h2>
        <nuxt-link :to="'/calendar/events/' + event._id">
          {{ event.title }}
        </nuxt-link>
      </h2>
      <div v-html="event.description"></div>
      <p>
        <FancyButton :to="'/calendar/events/' + event._id">
          Læs mere om <span class="hide-on-mobile">om {{ event.title }}</span>
          <ChevronRightIcon />
        </FancyButton>
      </p>
    </template>
  </ContentList>
</template>

<script>
import { ChevronRightIcon } from 'vue-feather-icons'
import ContentList from '../../../components/ContentList'
import FancyButton from '../../../components/FancyButton'

export default {
  components: { ChevronRightIcon, ContentList, FancyButton },
  async fetch({ store }) {
    store.dispatch('clearError')
    await store.dispatch('events/fetchAll')
  },
  computed: {
    events() {
      return this.$store.getters['events/getAll']()
    },
  },
}
</script>
