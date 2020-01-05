<template>
  <table>
    <thead>
      <tr>
        <th>Event</th>
        <th>Sted</th>
        <th>Start</th>
        <th>Slut</th>
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
        <td>{{formatCalendarDateObject(event.start)}}</td>
        <td>{{formatCalendarDateObject(event.end)}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import CalendarLabel from "./CalendarLabel"
  import googleCalendar from "../apis/google-calendar"

  export default {
    name: 'BigCalendar',
    components: { CalendarLabel },
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
      return { events: [] }
    },
    computed: {
      sortedEvents() {
        return this.events.sort((a, b) => {
          return a.jsStartDate.getTime() - b.jsStartDate.getTime()
        })
      }
    },
    mounted() {
      this.calendars.forEach(calendar => this.addEventsFromCalendar(calendar))
    },
    methods: {
      addEventsFromCalendar(calendar) {
        googleCalendar.getEvents(
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
      formatCalendarDateObject(dateObject) {
        if (dateObject.date) {
          return this.formatDateString(dateObject.date)
        } else if (dateObject.dateTime) {
          return this.formatDateString(dateObject.dateTime, true)
        }
      },
      formatDateString(dateString, includeTime) {
        const date = new Date(dateString)
        const formattedDate = date.toLocaleDateString(
          'da',
          {
            dateStyle: 'long',
          }
        )

        if (includeTime) {
          return formattedDate + ' kl. ' + date.toLocaleDateString(
            'da',
            {
              timeStyle: 'short'
            }
          )
        }

        return formattedDate
      }
    }
  }
</script>

<style
  lang="less"
  scoped
>
  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }

  tbody tr:nth-child(odd) {
    background: @backgroundColorSlightContrast;
  }

  th, td {
    padding: .5em;
  }

  .calendar-label {
    float: right;
  }
</style>
