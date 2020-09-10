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
        <td>{{ event.summary }}
          <CalendarLabel :calendar="event.calendar" />
        </td>
        <td>{{ event.location }}</td>
        <td>{{
            formatDateSpan(event.parsedDates.startDate, event.parsedDates.endDate, event.parsedDates.displayTimeOfDay)
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CalendarLabel from "./CalendarLabel"
import LoadingAnimation from "./LoadingAnimation"

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
      return this.$store.getters['calendars/getAllEvents']()
    }
  },
  mounted() {
    this.$store.dispatch('age-groups/fetchAllOnce')
    this.$store.dispatch('calendars/fetchAll', {
      startDate: this.startDate,
      endDate: this.endDate
    }).finally(() => this.isLoading = false)
  },
  methods: {
    formatDateSpan,
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
