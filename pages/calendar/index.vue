<template>
  <div>
    <h1>Kalender</h1>
    <div class="filter">
      <p
        class="filter-buttons"
        :class="{
          'filter-applied': filteredCalendars.length !== calendars.length,
        }"
      >
        <span class="filter-heading">Filter:</span>
        <CalendarLabel
          tag-name="button"
          class="filter-button"
          :class="{ active: filteredCalendars.length === calendars.length }"
          :calendar="{ id: 'all', name: 'Alt' }"
          @click="selectCalendar('all')"
        />
        <CalendarLabel
          v-for="calendar in calendars"
          :key="calendar.id"
          :calendar="calendar"
          tag-name="button"
          class="filter-button"
          :class="{ active: filteredCalendars.includes(calendar) }"
          type="button"
          @click="selectCalendar(calendar.id)"
        />
      </p>
    </div>
    <BigCalendar
      :calendars="calendars"
      :filtered-calendars="filteredCalendars"
      :start-date="startDate"
      :end-date="endDate"
    />
  </div>
</template>

<script>
import BigCalendar from '../../components/BigCalendar'
import CalendarLabel from '../../components/CalendarLabel'
import siteConfig from '../../site.config'

export default {
  components: { BigCalendar, CalendarLabel },
  data() {
    const calendars = siteConfig.googleCalendars
    const startDate = new Date()
    const endDate = new Date()

    endDate.setFullYear(endDate.getFullYear() + 1)

    return {
      calendars,
      filteredCalendars: calendars,
      startDate,
      endDate,
    }
  },
  methods: {
    selectCalendar(id) {
      if (id === 'all') {
        this.filteredCalendars = this.calendars
      } else {
        this.filteredCalendars = [
          this.calendars[0],
          this.calendars.find((calendar) => calendar.id === id),
        ]
      }
    },
  },
}
</script>

<style lang="scss">
.filter {
  background: $backgroundColorSlightContrast;
  padding: 1em;
}

.filter-buttons {
  text-align: center;
  margin: 0;
  line-height: 1.5em !important;
}

.filter-buttons.filter-applied {
  .filter-button:not(.active) {
    filter: grayscale(70%);
    opacity: 0.5;

    @media (hover: hover) {
      &:hover {
        filter: grayscale(20%);
        opacity: 0.7;
      }
    }
  }

  .filter-button.active {
    box-shadow: 0 0.1em 0.5em -0.2em rgba(0, 0, 0, 0.5);
  }
}

.filter-button {
  transition: all 0.15s ease-out;

  &:not(:first-child) {
    margin-left: 0.3em;
  }
}
</style>
