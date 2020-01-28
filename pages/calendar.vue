<template>
  <article>
    <SubNavigation :menu-items="menuItems" />
    <nuxt-child  />
  </article>
</template>

<script>
  import BigCalendar from "../components/BigCalendar"
  import SubNavigation from "../components/SubNavigation"
  import {CalendarIcon, CompassIcon, RepeatIcon} from "vue-feather-icons"

  export default {
    components: { BigCalendar, SubNavigation },
    data() {
      const startDate = new Date()
      const endDate = new Date()

      endDate.setFullYear(endDate.getFullYear() + 1)

      return {
        events: [],
        menuItems: [
          {
            title: 'Kalender',
            url: '/calendar',
            icon: CalendarIcon
          },
          {
            title: 'Aktuelle lejre & arrangementer',
            url: '/calendar/events',
            icon: CompassIcon
          },
          {
            title: 'Gentagne lejre & arrangementer',
            url: '/calendar/repeated-events',
            icon: RepeatIcon
          },
        ],
        startDate,
        endDate,
      }
    },
  }
</script>

