<template>
  <li
    class="next-calendar-event"
    :class="calendar.className"
    :style="{'--calendar-color': ageGroup ? ageGroup.color : null}"
  >
    <h3 class="calendar-name">
      {{calendar.name}}
      <br>
      <template v-if="isLoading && !ageGroup">
        -
      </template>
      <template v-else>
        {{ageGroup ? ageGroup.age : 'Alle aldre'}}
      </template>
    </h3>
    <LoadingAnimation v-if="isLoading" />
    <template v-else>
      <h4 class="event-name">{{event.summary}}</h4>
      <p class="event-date">{{formatDateSpan(event.parsedDates.startDate, event.parsedDates.endDate,
        event.parsedDates.displayTimeOfDay)}}</p>
    </template>
  </li>
</template>

<script>
  import {formatDate, formatDateSpan} from "../utils/format"
  import LoadingAnimation from "./LoadingAnimation"

  export default {
    name: 'NextCalendarEvent',
    components: { LoadingAnimation },
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
        return this.$store.getters['calendars/getNextEvent'](this.calendar.id)
      },
      isLoading() {
        return this.$store.getters['calendars/isCalendarLoading'](this.calendar.id) || !this.event
      },
      ageGroup() {
        if (this.calendar.ageGroupId) {
          return this.$store.getters['age-groups/getById'](this.calendar.ageGroupId)
        }

        return null
      }
    },
    methods: { formatDateSpan },
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

<style
  lang="scss"
  scoped
>
  .next-calendar-event {
    --calendar-color: #{$nightBlue};

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    padding: .75em .8em 0;
    border-radius: $defaultBorderRadius;
    background: $navigationBackgroundColor;
    box-shadow: $defaultBoxShadow;
    text-align: center;

    .loading-animation {
      height: 1.8em;
      margin: 0 auto !important;
    }
  }

  .calendar-name,
  .event-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .calendar-name {
    order: 1;
    margin: .75em -1.1em 0;
    padding: .5em;
    font-size: .75em;
    color: white;
    background: var(--calendar-color, $nightBlue) linear-gradient(-45deg, $duskBlue -150%, transparent);
    border-bottom-left-radius: $defaultBorderRadius;
    border-bottom-right-radius: $defaultBorderRadius;
    transition: background-color 1s ease-out;
  }

  p {
    font-size: .75em;
    margin: .5em 0;
  }
</style>
