<template>
  <LoadingAnimation v-if="isLoading" size="large" />
  <ol v-else class="calendar-list">
    <li
      v-for="event in sortedEvents"
      :key="event.id"
      class="calendar-list-item"
      itemscope
      itemtype="http://data-vocabulary.org/Event"
    >
      <h4 class="event-name">
        <span itemprop="name">{{ event.summary }}</span>
        <CalendarLabel :calendar="event.calendar" />
      </h4>
      <p class="event-date-span">
        <DateSpan
          :start-date="event.parsedDates.startDate"
          :end-date="event.parsedDates.endDate"
          :include-time="event.parsedDates.displayTimeOfDay"
        />
      </p>
      <p v-if="event.location" class="event-location">
        Sted:
        <span itemprop="location"
          ><a
            :title="`Find ${event.location} på Google Maps`"
            :href="`http://maps.google.com/maps?hl=da&q=${event.location}`"
            >{{ event.location }}</a
          ></span
        >
      </p>
      <p
        v-if="event.description"
        class="event-description"
        itemprop="description"
      >
        {{ event.description }}
      </p>
    </li>
  </ol>
</template>

<script>
import CalendarLabel from './CalendarLabel'
import LoadingAnimation from './LoadingAnimation'

import { formatDateSpan } from '../utils/format'
import DateSpan from './DateSpan'

export default {
  name: 'BigCalendar',
  components: { DateSpan, CalendarLabel, LoadingAnimation },
  props: {
    calendars: {
      type: Array,
      required: true,
      validator(arr) {
        return !arr.some((val) => !val.id)
      },
    },
    startDate: {
      type: Date,
      required: false,
      default: undefined,
    },
    endDate: {
      type: Date,
      required: false,
      default: undefined,
    },
  },
  data() {
    return { events: [], isLoading: true }
  },
  computed: {
    sortedEvents() {
      return this.$store.getters['calendars/getAllEvents']()
    },
  },
  mounted() {
    this.$store.dispatch('age-groups/fetchAllOnce')
    this.$store
      .dispatch('calendars/fetchAll', {
        startDate: this.startDate,
        endDate: this.endDate,
      })
      .finally(() => (this.isLoading = false))
  },
  methods: {
    formatDateSpan,
  },
}
</script>

<style lang="scss" scoped>
.calendar-list {
  display: grid;
  list-style: none;
  padding: 0;
}

.calendar-list-item {
  margin: 0;
  padding: 0.25em 1em;
}

@media (min-width: 40.001rem) {
  .calendar-list {
    grid-template-columns: repeat(2, 1fr);
  }
  .calendar-list-item {
    &:nth-child(4n-3),
    &:nth-child(4n) {
      background-color: $backgroundColorSlightContrast;
    }
  }
}
@media (max-width: 40rem) {
  .calendar-list-item {
    margin: 0.25em 0;
    &:nth-child(odd) {
      background-color: $backgroundColorSlightContrast;
    }
  }
}

.calendar-label {
  float: right;
}
</style>
