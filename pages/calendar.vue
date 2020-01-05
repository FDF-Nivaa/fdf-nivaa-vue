<template>
  <article>
    <h1>Kalender</h1>
    <BigCalendar
      :calendars="calendars"
      :start-date="startDate"
      :end-date="endDate"
    />
  </article>
</template>

<script>
  import {calendars} from '../google-calendar-config'
  import BigCalendar from "../components/BigCalendar"

  export default {
    components: { BigCalendar },
    data() {
      const startDate = new Date()
      const endDate = new Date()

      endDate.setFullYear(endDate.getFullYear() + 1)
      //endDate.setMonth(endDate.getMonth() + 2)

      return { calendars, events: [], startDate, endDate }
    },
  }
</script>

