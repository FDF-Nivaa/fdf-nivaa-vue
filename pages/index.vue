<template>
  <PageContent content-id="front-page">
    <aside>
      <h1>Det skal vi næste gang</h1>
      <NextCalendarEvents />
      <p><FancyButton link-to="/calendar"><CalendarIcon/> Se mere i kalenderen</FancyButton></p>
    </aside>
  </PageContent>
</template>

<script>
  import FancyButton from "../components/FancyButton"
  import NextCalendarEvents from "../components/NextCalendarEvents"
  import PageContent from "../components/PageContent"
  import {CalendarIcon,} from 'vue-feather-icons'

  export default {
    name: 'index',
    components: { CalendarIcon, FancyButton, NextCalendarEvents,PageContent },
    async fetch({store}) {
      store.dispatch('clearError')
      await store.dispatch('pages/fetchByCustomId', this.contentId)
    }
  }
</script>

<style scoped>
  aside {
    margin-top: 3em;
  }
</style>
