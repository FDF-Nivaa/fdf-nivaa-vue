<template>
  <li
    class="next-calendar-event"
    :class="calendar.className"
  >
    <h3>{{calendar.name}}</h3>
    <LoadingAnimation v-if="isLoading" />
    <template v-else>
      <h4>{{event.summary}}</h4>
      <p>{{formatDate(event.parsedDates.startDate, event.parsedDates.displayTimeOfDay)}} -
        <br>{{formatDate(event.parsedDates.endDate, event.parsedDates.displayTimeOfDay)}}</p>
    </template>
  </li>
</template>

<script>
  import {formatDate} from "../utils/format"
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
      }
    },
    methods: { formatDate },
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
    }
  }
</script>

<style
  lang="less"
  scoped
>
  .next-calendar-event {
    position: relative;
    margin: 0;
    padding: .75em .8em 2.25em;
    border-radius: @defaultBorderRadius;
    background: white;
    box-shadow: @defaultBoxShadow;
    text-align: center;

    &.faelles h3 {
      background-color: @nightBlue;
    }

    &.tumlinge h3 {
      background-color: @tumlingeColor;
    }

    &.pilte h3 {
      background-color: @pilteColor;
    }

    &.vaebnere h3 {
      background-color: @vaebnereColor;
    }

    &.seniorvaebnere h3 {
      background-color: @seniorvaebnereColor;
    }

    &.seniorer h3 {
      background-color: @seniorerColor;
    }

    .loading-animation {
      margin: .687em auto;
    }
  }

  h3, h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  h3 {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: .5em;
    font-size: .75em;
    color: white;
    background: @duskBlue linear-gradient(-45deg, @duskBlue -150%, transparent);
    border-bottom-left-radius: @defaultBorderRadius;
    border-bottom-right-radius: @defaultBorderRadius;
  }

  p {
    font-size: .75em;
    margin: .5em 0;
  }
</style>
