<template>
  <aside class="next-calendar-events">
    <ul class="next-calendar-events-list">
      <NextCalendarEvent
        v-for="calendar in calendars"
        :calendar="calendar"
        :key="calendar.id"
      />
    </ul>
  </aside>
</template>
<script>
  import NextCalendarEvent from "./NextCalendarEvent"
  import {calendars} from '../google-calendar-config'

  export default {
    name: 'NextCalendarEvents',
    components: { NextCalendarEvent },
    data() {
      return { calendars }
    },
  }
</script>

<style lang="less" scoped>
.next-calendar-events-list {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(3, minmax(5em, 1fr));
  list-style: none;
  padding: 0;
}
</style>
