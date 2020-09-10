<template>
  <CalendarEvent :calendar="calendar" :event="event" :is-loading="isLoading" />
</template>

<script>
  import CalendarEvent from "./CalendarEvent"

  export default {
    name: 'NextCalendarEvent',
    components: { CalendarEvent },
    props: {
      calendar: {
        type: Object,
        required: true
      }
    },
    data() {
      const startDate = new Date()
      const endDate = new Date()

      endDate.setFullYear(endDate.getFullYear() + 1)

      return {
        startDate,
        endDate
      }
    },
    computed: {
      event() {
        return this.$store.getters['calendars/getNextEventForCalendar'](this.calendar.id)
      },
      isLoading() {
        return this.$store.getters['calendars/isCalendarLoading'](this.calendar.id) || !this.event
      },
    },
    mounted() {
      this.$store.dispatch(
        'calendars/fetchEvents',
        {
          calendarId: this.calendar.id,
          startDate: this.startDate,
          endDate: this.endDate,
          limit: 1
        }
      )
      this.$store.dispatch('age-groups/fetchAllOnce')
    }
  }
</script>

