<template>
  <span
    class="calendar-label"
    :class="calendar.className"
    :style="{'--calendar-color': ageGroup ? ageGroup.color : null}"
  >{{calendar.name}}</span>
</template>

<script>
  export default {
    name: 'CalendarLabel',
    props: {
      calendar: {
        type: Object,
        required: true,
        validator(calendar) {
          return calendar.name
        }
      }
    },
    computed: {
      ageGroup() {
        if (this.calendar.ageGroupId) {
          return this.$store.getters['age-groups/getById'](this.calendar.ageGroupId)
        }

        return null
      }
    }
  }
</script>

<style
  lang="less"
  scoped
>
  .calendar-label {
    --calendar-color: @nightBlue;

    background: var(--calendar-color, @nightBlue);
    color: white;
    border-radius: .2rem;
    padding: .25em .5em;
    font-size: .75em;
  }
</style>
