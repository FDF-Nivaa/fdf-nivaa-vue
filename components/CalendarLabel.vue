<template>
  <span
    class="calendar-label"
    :class="calendar.className"
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
          return calendar.className && calendar.name
        }
      }
    }
  }
</script>

<style
  lang="less"
  scoped
>
  .calendar-label {
    background: @duskBlue;
    color: white;
    border-radius: .2rem;
    padding: .25em .5em;
    font-size: .75em;

    &.tumlinge {
      background: @tumlingeColor;
    }

    &.pilte {
      background: @pilteColor;
    }

    &.vaebnere {
      background: @vaebnereColor;
    }

    &.seniorvaebnere {
      background: @seniorvaebnereColor;
    }

    &.seniorer {
      background: @seniorerColor;
    }
  }
</style>
