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
    padding: .5em .55em 1.75em;
    border-radius: .3rem;
    background: rgba(255, 255, 255, .5);
    box-shadow: 0 .25em .5em rgba(0, 0, 0, .1);

    &.faelles h3 {
      background: @nightBlue;
    }

    &.tumlinge h3 {
      background: @tumlingeColor;
    }

    &.pilte h3 {
      background: @pilteColor;
    }

    &.vaebnere h3 {
      background: @vaebnereColor;
    }

    &.seniorvaebnere h3 {
      background: @seniorvaebnereColor;
    }

    &.seniorer h3 {
      background: @seniorerColor;
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
    background: @duskBlue;
    border-bottom-left-radius: .3rem;
    border-bottom-right-radius: .3rem;
  }

  p {
    font-size: .75em;
    margin: .5em 0;
  }
</style>
