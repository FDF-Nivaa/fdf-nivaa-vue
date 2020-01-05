<template>
  <article>
    <h1>Kalender</h1>

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
          v-for="event in events"
          :key="event.id"
        >
          <td>{{event.summary}}</td>
          <td>{{event.location}}</td>
          <td>{{formatCalendarDateObject(event.start)}}</td>
          <td>{{formatCalendarDateObject(event.end)}}</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import queryString from 'query-string'

  const apiKey = 'AIzaSyDRKB9cLhDuS1A_-grlpoP5CM8z-Nb-lTw'
  const calendarId = 'coufvnfppmc4kptde0q3fc8550@group.calendar.google.com'

  export default {
    data() {
      return { events: [] }
    },
    mounted() {
      this.$axios
        .get(this.buildUrl(calendarId))
        .then(response => {
          console.log(response)
          this.events = response.data.items
        })
    },
    methods: {
      buildUrl(calendarId, options) {
        const startDate = new Date()
        const endDate = new Date()

        endDate.setFullYear(endDate.getFullYear() + 1)
        //endDate.setMonth(endDate.getMonth() + 1)

        const parameters = queryString.stringify({
          ...options,
          key: apiKey,
          orderBy: 'startTime',
          singleEvents: true,
          timeMin: startDate.toISOString(),
          timeMax: endDate.toISOString()
        })

        return (
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${parameters}`
        )
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
            dateStyle: 'medium',
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
</style>
