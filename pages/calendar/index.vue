<template>
  <div>
    <h1>Kalender</h1>
    <BigCalendar
      :calendars="calendars"
      :start-date="startDate"
      :end-date="endDate"
    />
  </div>
</template>

<script>
import BigCalendar from "../../components/BigCalendar";
import siteConfig from "../../site.config";

export default {
  components: { BigCalendar },
  data() {
    const startDate = new Date();
    const endDate = new Date();

    // TODO Clean up debug data
    startDate.setDate(startDate.getDate() - 1);

    endDate.setFullYear(endDate.getFullYear() + 1);

    return {
      calendars: siteConfig.googleCalendars,
      startDate,
      endDate,
    };
  },
};
</script>
