<template>
  <component
    :is="tagName"
    class="calendar-label"
    :class="calendar.className"
    :style="{ '--calendar-color': ageGroup ? ageGroup.color : null }"
    @click="$emit('click', $event)"
    >{{ calendar.name }}</component
  >
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
      },
    },
    tagName: {
      type: String,
      default: 'span',
    },
  },
  computed: {
    ageGroup() {
      if (this.calendar.ageGroupId) {
        return this.$store.getters['age-groups/getById'](
          this.calendar.ageGroupId
        )
      }

      return null
    },
  },
}
</script>

<style lang="scss" scoped>
.calendar-label {
  --calendar-color: #{$nightBlue};

  background: var(--calendar-color, $nightBlue);
  color: white;
  border-radius: 0.2rem;
  padding: 0.25em 0.5em;
  font-size: 0.75em;
}
</style>
