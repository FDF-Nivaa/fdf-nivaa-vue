<template>
  <ul class="next-calendar-events">
    <NextCalendarEvent
      v-for="calendar in calendars"
      :calendar="calendar"
      :key="calendar.id"
    />
  </ul>
</template>
<script>
  import NextCalendarEvent from "./NextCalendarEvent"
  import siteConfig from '../site.config'

  export default {
    name: 'NextCalendarEvents',
    components: { NextCalendarEvent },
    data() {
      return { calendars: siteConfig.googleCalendars }
    },
  }
</script>

<style
  lang="scss"
  scoped
>
  .next-calendar-events {
    display: grid;
    margin: auto;
    max-width: 60em;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
    list-style: none;
    padding: 0;
  }
</style>
