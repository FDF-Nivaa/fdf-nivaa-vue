<template>
  <LoadingAnimation
    v-if="isLoading"
    size="large"
  />
  <table v-else>
    <thead>
      <tr>
        <th>Event</th>
        <th>Sted</th>
        <th>Tidspunkt</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="event in sortedEvents"
        :key="event.id"
      >
        <td>{{event.summary}}
          <CalendarLabel :calendar="event.calendar" />
        </td>
        <td>{{event.location}}</td>
        <td>{{formatCalendarDateObjects(event.start, event.end)}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import CalendarLabel from "./CalendarLabel"
  import LoadingAnimation from "./LoadingAnimation"

  import {getEvents} from "../apis/google-calendar"

  import {formatDateSpan} from "../utils/format"

  export default {
    name: 'BigCalendar',
    components: { CalendarLabel, LoadingAnimation },
    props: {
      calendars: {
        type: Array,
        required: true,
        validator(arr) {
          return !arr.some(val => !val.id)
        }
      },
      startDate: {
        type: Date,
        required: false,
        default: undefined
      },
      endDate: {
        type: Date,
        required: false,
        default: undefined
      }
    },
    data() {
      return { events: [], isLoading: true }
    },
    computed: {
      sortedEvents() {
        return this.events.sort((a, b) => {
          return a.jsStartDate.getTime() - b.jsStartDate.getTime()
        })
      }
    },
    mounted() {
      this.$store.dispatch('age-groups/fetchAllOnce')

      Promise.allSettled(
        this.calendars.map(calendar => {
          return this.addEventsFromCalendar(calendar)
        }))
        .then(() => {
          this.isLoading = false
        })
    },
    methods: {
      addEventsFromCalendar(calendar) {
        return getEvents(
          calendar.id,
          this.startDate,
          this.endDate
        ).then(events => {
          this.addEvents(
            events.map(event => {
              return {
                ...event,
                calendar: calendar,
                jsStartDate: new Date(event.start.date || event.start.dateTime)
              }
            })
          )
        })
      },
      addEvents(events) {
        this.events = [...this.events, ...events]
      },
      formatCalendarDateObjects(dateObject1, dateObject2) {
        if (dateObject1.date) {
          return formatDateSpan(
            new Date(dateObject1.date),
            new Date(dateObject2.date)
          )
        } else if (dateObject1.dateTime) {
          return formatDateSpan(
            new Date(dateObject1.dateTime),
            new Date(dateObject2.dateTime),
            true
          )
        }
      },
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }

  tbody tr:nth-child(odd) {
    background: $backgroundColorSlightContrast;
  }

  th, td {
    padding: .5em;
  }

  .calendar-label {
    float: right;
  }
</style>
