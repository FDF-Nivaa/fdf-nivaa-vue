<template>
  <div>
    <h1>Kalender</h1>
    <BigCalendar
      :calendars="calendars"
      :start-date="startDate"
      :end-date="endDate"
    />
  </div>
</template>

<script>
  import BigCalendar from "../../components/BigCalendar"
  import {calendars} from "../../google-calendar-config"

  export default {
    components: { BigCalendar },
    data() {
      const startDate = new Date()
      const endDate = new Date()

      endDate.setFullYear(endDate.getFullYear() + 1)
      
      return {
        calendars,
        startDate,
        endDate,
      }
    }
  }
</script>
